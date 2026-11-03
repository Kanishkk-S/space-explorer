/*
 * ============================================================
 * SPACE EXPLORER — ESP32 Controller Firmware (Cosmos 3D Experience)
 * ============================================================
 * 
 * Target Hardware: ESP32 Development Board (ESP32 Dev Module)
 * Display: 1.8" SPI TFT Display (ST7735, 128x160 Landscape)
 * RFID: RC522 SPI Module (Shared SPI Bus with Dedicated CS)
 * IMU: MPU6050 6-Axis Gyroscope / Accelerometer (I2C)
 * Joystick: KY-023 Dual-Axis Analog Joystick + Click Switch
 * Controls: 4 Digital Pushbuttons (SELECT, BACK, ACTION, PAUSE)
 * Indicators: 2 Status LEDs (Green, Red)
 * Audio: Piezo Buzzer (Direct Hardware / Software PWM)
 * 
 * Communication: Web Serial USB at 115200 Baud (Newline-delimited JSON)
 * 
 * Verified Hardware Pinout:
 *   TFT Display:   CS=GPIO 5,  DC=GPIO 27, RST=GPIO 4, SCK=GPIO 18, MOSI=GPIO 23
 *   RC522 RFID:    SS=GPIO 16, RST=GPIO 17, SCK=GPIO 18, MOSI=GPIO 23, MISO=GPIO 19
 *   MPU6050 IMU:   SDA=GPIO 21, SCL=GPIO 22, AD0=GND (I2C Address: 0x68)
 *   KY-023 Stick:  VRx=GPIO 34 (ADC1), VRy=GPIO 35 (ADC1), SW=GPIO 33 (Pullup)
 *   Pushbuttons:   SELECT=GPIO 25, BACK=GPIO 26, ACTION=GPIO 14, PAUSE=GPIO 32 (Active LOW)
 *   Status LEDs:   GREEN=GPIO 13, RED=GPIO 15
 *   Piezo Buzzer:  GPIO 2
 * ============================================================
 */

#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7735.h>
#include <MFRC522.h>
#include <ArduinoJson.h>

// ============================================
// HARDWARE PIN DEFINITIONS
// ============================================

// ST7735 1.8" TFT Display (SPI)
#define TFT_CS      5
#define TFT_DC      27
#define TFT_RST     4
// SCK = 18, MOSI = 23 (Hardware VSPI)

// RC522 RFID Reader (Shared SPI with dedicated CS)
#define RFID_SS     16
#define RFID_RST    17
// SCK = 18, MOSI = 23, MISO = 19 (Shared VSPI)

// MPU6050 6-Axis IMU (I2C)
#define MPU_SDA     21
#define MPU_SCL     22
#define MPU_ADDR    0x68

// KY-023 Joystick (Sideways mounted)
#define JOY_X_PIN   34
#define JOY_Y_PIN   35
#define JOY_SW      33

// Digital Pushbuttons (Active LOW with internal pullups)
#define BTN_SELECT  25
#define BTN_BACK    26
#define BTN_ACTION  14
#define BTN_PAUSE   32

// Status LEDs
#define LED_GREEN   13
#define LED_RED     15

// Audio Output
#define BUZZER_PIN  2

// ============================================
// CONFIGURATION CONSTANTS
// ============================================

#define SERIAL_BAUD         115200
#define JOYSTICK_DEADZONE   320
#define JOYSTICK_CENTER     2048
#define JOYSTICK_SEND_MS    40
#define BUTTON_DEBOUNCE     45
#define RFID_CHECK_MS       80
#define DISPLAY_UPDATE_MS   650
#define SERIAL_TIMEOUT_MS   4000

// Gyroscope Motion Thresholds
#define TILT_ENABLED        true
#define TILT_DEADZONE_DEG   8.0f
#define TILT_MAX_DEG        30.0f

// ============================================
// 16-BIT RGB565 COLOR PALETTE (COSMOS HUD)
// ============================================
#define COLOR_SPACE_BG      0x0002 // Pitch Black Deep Space
#define COLOR_PANEL_BG      0x08A4 // Deep Midnight Slate
#define COLOR_HEADER_BG     0x1113 // Cosmic Blue Header
#define COLOR_BLUE_GLOW     0x345F // Celestial Electric Blue
#define COLOR_CYAN          0x07FF // Starlight Cyan
#define COLOR_VIOLET        0x8ACF // Cosmic Violet
#define COLOR_GOLD          0xFE60 // Solar Flare Gold
#define COLOR_GREEN         0x07E0 // Orbit Stable Green
#define COLOR_RED           0xF800 // Warning Flare Red
#define COLOR_WHITE         0xFFFF // Pure Starlight White
#define COLOR_MUTED         0x9CD3 // Slate Gray Muted Text
#define COLOR_BORDER        0x2126 // Subtle Border

// ============================================
// HARDWARE PERIPHERAL OBJECTS
// ============================================

Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC, TFT_RST);
MFRC522 rfid(RFID_SS, RFID_RST);

// ============================================
// SPI BUS ARBITRATION GUARDS
// ============================================

inline void selectTFT() {
  digitalWrite(RFID_SS, HIGH); // Disable RFID SPI listener
  digitalWrite(TFT_CS, LOW);   // Enable TFT SPI listener
}

inline void deselectTFT() {
  digitalWrite(TFT_CS, HIGH);
}

inline void selectRFID() {
  digitalWrite(TFT_CS, HIGH);  // Disable TFT SPI listener
  digitalWrite(RFID_SS, LOW);  // Enable RFID SPI listener
}

inline void deselectRFID() {
  digitalWrite(RFID_SS, HIGH);
}

// ============================================
// AUDIO ENGINE (UNIVERSAL PASSIVE/ACTIVE DRIVER)
// ============================================

void playTone(int frequency, int duration) {
  if (duration <= 0) return;
  if (frequency <= 0) frequency = 1000;

  // Universal Direct GPIO Microsecond Toggle:
  // - On Passive Piezo buzzers: Generates an exact square-wave pitch at the given Hz.
  // - On Active Piezo buzzers: Toggles the driver transistor, producing clear acoustic clicks/buzzes.
  // - 100% immune to ESP32 Arduino Core version discrepancies (v1.x, v2.x, v3.x LEDC API changes).
  long periodUs = 1000000L / frequency;
  if (periodUs <= 0) periodUs = 1000;
  long halfPeriodUs = periodUs / 2;
  long cycles = ((long)duration * 1000L) / periodUs;
  if (cycles <= 0) cycles = 1;

  pinMode(BUZZER_PIN, OUTPUT);
  for (long i = 0; i < cycles; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delayMicroseconds(halfPeriodUs);
    digitalWrite(BUZZER_PIN, LOW);
    delayMicroseconds(halfPeriodUs);
  }
  digitalWrite(BUZZER_PIN, LOW);
}

void soundStartup() {
  playTone(1046, 70); // C6
  delay(30);
  playTone(1318, 70); // E6
  delay(30);
  playTone(1568, 90); // G6
}

void soundAuthSuccess() {
  digitalWrite(LED_GREEN, HIGH);
  digitalWrite(LED_RED, LOW);
  playTone(523, 70);  // C5
  delay(30);
  playTone(659, 70);  // E5
  delay(30);
  playTone(784, 80);  // G5
  delay(30);
  playTone(1046, 120); // C6
}

void soundAuthFailed() {
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_GREEN, LOW);
  playTone(260, 160);
  delay(40);
  playTone(190, 240);
  digitalWrite(LED_RED, LOW);
}

void soundCardScanned() {
  playTone(1600, 45);
  delay(25);
  playTone(2400, 65);
}

void soundButtonClick() {
  playTone(1900, 20);
}

// ============================================
// SYSTEM STATE
// ============================================

struct ButtonInput {
  uint8_t pin;
  const char* name;
  const char* canonical;
  bool lastState;
  bool currentState;
  unsigned long lastDebounce;
};

ButtonInput buttons[] = {
  { BTN_SELECT, "SELECT",  "select", HIGH, HIGH, 0 },
  { BTN_BACK,   "BACK",    "back",   HIGH, HIGH, 0 },
  { BTN_ACTION, "ACTION",  "action", HIGH, HIGH, 0 },
  { BTN_PAUSE,  "PAUSE",   "pause",  HIGH, HIGH, 0 },
  { JOY_SW,     "JOY_BTN", "select", HIGH, HIGH, 0 },
};
const int NUM_BUTTONS = sizeof(buttons) / sizeof(buttons[0]);

// Joystick state
int joyX = JOYSTICK_CENTER;
int joyY = JOYSTICK_CENTER;
int centerRawX = JOYSTICK_CENTER;
int centerRawY = JOYSTICK_CENTER;
float filteredRawX = (float)JOYSTICK_CENTER;
float filteredRawY = (float)JOYSTICK_CENTER;
bool joystickAtCenter = true;
unsigned long lastJoystickSend = 0;

// MPU6050 state
bool mpuPresent = false;
float pitchAngle = 0.0f;
float rollAngle = 0.0f;
float neutralPitch = 0.0f;
float neutralRoll = 0.0f;
float gyroBiasX = 0.0f;
float gyroBiasY = 0.0f;
unsigned long lastMotionTime = 0;
bool tiltAtCenter = true;

// RFID state
unsigned long lastRfidCheck = 0;
String lastRfidUid = "";
unsigned long lastRfidTime = 0;
byte rfidVersion = 0;

// Display & Telemetry state
unsigned long lastDisplayUpdate = 0;
bool browserConnected = false;
unsigned long lastSerialReceive = 0;

String statusSector = "SOLAR SYSTEM";
String statusCadet = "Awaiting RFID Tap";
String statusTarget = "Sun / Earth";
String statusPrompt = "Tap RFID to Authenticate";

bool greenLedState = false;
bool redLedState = false;

// Forward declarations
void calibrateJoystick();
void initMPU6050();
void calibrateMPU();
void showStartupDiagnostics(const char* rfidMsg, const char* mpuMsg, const char* joyMsg);
void updateDisplay(unsigned long now);
void readButtons(unsigned long now);
void readJoystick(unsigned long now);
void readMotionControl(unsigned long now);
void checkRFID();
void sendButtonEvent(const char* name, const char* canonical);
void sendJoystickEvent(int x, int y, bool btn);
void sendRfidEvent(String uid);
void readSerialCommands();

// ============================================
// SETUP
// ============================================

void setup() {
  Serial.begin(SERIAL_BAUD);

  // 1. Digital I/O initialization
  for (int i = 0; i < NUM_BUTTONS; i++) {
    pinMode(buttons[i].pin, INPUT_PULLUP);
  }
  
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  // 2. Configure SPI CS and Reset pins as inactive HIGH
  pinMode(TFT_CS, OUTPUT);
  digitalWrite(TFT_CS, HIGH);
  
  pinMode(RFID_SS, OUTPUT);
  digitalWrite(RFID_SS, HIGH);
  
  pinMode(TFT_DC, OUTPUT);
  digitalWrite(TFT_DC, HIGH);
  
  pinMode(TFT_RST, OUTPUT);
  digitalWrite(TFT_RST, HIGH);
  
  pinMode(RFID_RST, OUTPUT);
  digitalWrite(RFID_RST, HIGH);

  // 3. Hardware reset both SPI peripherals
  digitalWrite(TFT_RST, LOW);
  digitalWrite(RFID_RST, LOW);
  delay(25);
  digitalWrite(TFT_RST, HIGH);
  digitalWrite(RFID_RST, HIGH);
  delay(80);

  // 4. Initialize I2C Bus for MPU6050
  Wire.begin(MPU_SDA, MPU_SCL);
  Wire.setClock(100000);

  // 5. Initialize Hardware VSPI
  SPI.begin(18, 19, 23); // SCK=18, MISO=19, MOSI=23

  // 6. Initialize ST7735 TFT
  deselectRFID();
  selectTFT();
  tft.initR(INITR_BLACKTAB);
  tft.setRotation(1); // Landscape 160x128
  tft.fillScreen(COLOR_SPACE_BG);
  deselectTFT();

  // 7. Auto-calibrate neutral joystick readings
  calibrateJoystick();

  // 8. Initialize MPU6050
  initMPU6050();
  if (mpuPresent) {
    calibrateMPU();
  }

  // 9. Initialize RC522 RFID
  deselectTFT();
  selectRFID();
  rfid.PCD_Init();
  delay(30);
  rfid.PCD_SetAntennaGain(rfid.RxGain_max);
  rfid.PCD_AntennaOn();
  rfidVersion = rfid.PCD_ReadRegister(rfid.VersionReg);
  deselectRFID();

  // Send boot telemetry packet
  Serial.println(F("{\"type\":\"diagnostic\",\"system\":\"COSMOS_ESP32_CONTROLLER_READY\"}"));

  // 10. Show Startup Hardware Diagnostics Screen
  char rfidBuf[24];
  if (rfidVersion == 0x92 || rfidVersion == 0x91 || rfidVersion == 0x88 || rfidVersion == 0x12) {
    snprintf(rfidBuf, sizeof(rfidBuf), "ACTIVE (v0x%02X)", rfidVersion);
  } else {
    snprintf(rfidBuf, sizeof(rfidBuf), "READY (0x%02X)", rfidVersion);
  }

  const char* mpuBuf = mpuPresent ? "ACTIVE (0x68)" : "SIMULATED";
  char joyBuf[24];
  snprintf(joyBuf, sizeof(joyBuf), "ZERO (%d,%d)", centerRawX, centerRawY);

  showStartupDiagnostics(rfidBuf, mpuBuf, joyBuf);

  // 11. Audible Boot Welcome Sequence
  digitalWrite(LED_GREEN, HIGH);
  soundStartup();
  delay(1200);
  digitalWrite(LED_GREEN, LOW);

  // Clean transition to Space Explorer companion HUD
  selectTFT();
  tft.fillScreen(COLOR_SPACE_BG);
  deselectTFT();
  updateDisplay(millis());
}

// ============================================
// MAIN LOOP
// ============================================

void loop() {
  unsigned long now = millis();

  // 1. Process physical button presses
  readButtons(now);

  // 2. Process joystick analog input
  readJoystick(now);

  // 3. Process MPU6050 gyroscope tilt controls
  if (mpuPresent && TILT_ENABLED) {
    readMotionControl(now);
  }

  // 4. Process RC522 RFID scans
  if (now - lastRfidCheck >= RFID_CHECK_MS) {
    lastRfidCheck = now;
    checkRFID();
  }

  // 5. Read incoming serial commands from web application
  readSerialCommands();

  // 6. Monitor Web Serial connection timeout
  if (lastSerialReceive > 0 && now - lastSerialReceive > SERIAL_TIMEOUT_MS) {
    if (browserConnected) {
      browserConnected = false;
      updateDisplay(now);
    }
  }

  // 7. Refresh companion HUD display periodically
  if (now - lastDisplayUpdate >= DISPLAY_UPDATE_MS) {
    lastDisplayUpdate = now;
    updateDisplay(now);
  }

  delay(2);
}

// ============================================
// CALIBRATION & HARDWARE PROBING
// ============================================

void calibrateJoystick() {
  long sumX = 0;
  long sumY = 0;
  const int CAL_SAMPLES = 40;
  for (int i = 0; i < CAL_SAMPLES; i++) {
    sumX += analogRead(JOY_X_PIN);
    sumY += analogRead(JOY_Y_PIN);
    delay(4);
  }
  centerRawX = sumX / CAL_SAMPLES;
  centerRawY = sumY / CAL_SAMPLES;

  if (centerRawX < 350 || centerRawX > 3750) centerRawX = JOYSTICK_CENTER;
  if (centerRawY < 350 || centerRawY > 3750) centerRawY = JOYSTICK_CENTER;

  filteredRawX = (float)centerRawX;
  filteredRawY = (float)centerRawY;
}

void initMPU6050() {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B); // Power Management
  Wire.write(0x00); // Wake up
  if (Wire.endTransmission(true) != 0) {
    mpuPresent = false;
    return;
  }

  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x1B); // Gyro Config
  Wire.write(0x08); // ±500 deg/s
  Wire.endTransmission(true);

  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x1C); // Accel Config
  Wire.write(0x08); // ±4g
  mpuPresent = (Wire.endTransmission(true) == 0);
}

void calibrateMPU() {
  long sumAx = 0, sumAy = 0, sumAz = 0;
  long sumGx = 0, sumGy = 0;
  const int SAMPLES = 32;

  for (int i = 0; i < SAMPLES; i++) {
    Wire.beginTransmission(MPU_ADDR);
    Wire.write(0x3B);
    Wire.endTransmission(false);
    Wire.requestFrom((uint8_t)MPU_ADDR, (uint8_t)14, (uint8_t)true);

    if (Wire.available() >= 14) {
      int16_t ax = (Wire.read() << 8) | Wire.read();
      int16_t ay = (Wire.read() << 8) | Wire.read();
      int16_t az = (Wire.read() << 8) | Wire.read();
      Wire.read(); Wire.read();
      int16_t gx = (Wire.read() << 8) | Wire.read();
      int16_t gy = (Wire.read() << 8) | Wire.read();
      Wire.read(); Wire.read();

      sumAx += ax; sumAy += ay; sumAz += az;
      sumGx += gx; sumGy += gy;
    }
    delay(4);
  }

  float avgAx = (float)sumAx / SAMPLES;
  float avgAy = (float)sumAy / SAMPLES;
  float avgAz = (float)sumAz / SAMPLES;

  gyroBiasX = (float)sumGx / SAMPLES;
  gyroBiasY = (float)sumGy / SAMPLES;

  neutralPitch = atan2(avgAy, sqrt(avgAx * avgAx + avgAz * avgAz)) * 180.0f / PI;
  neutralRoll  = atan2(avgAx, sqrt(avgAy * avgAy + avgAz * avgAz)) * 180.0f / PI;

  pitchAngle = neutralPitch;
  rollAngle  = neutralRoll;
  lastMotionTime = millis();
}

// ============================================
// INPUT READING
// ============================================

void readButtons(unsigned long now) {
  for (int i = 0; i < NUM_BUTTONS; i++) {
    bool reading = digitalRead(buttons[i].pin);

    if (reading != buttons[i].lastState) {
      buttons[i].lastDebounce = now;
    }

    if (now - buttons[i].lastDebounce > BUTTON_DEBOUNCE) {
      if (reading != buttons[i].currentState) {
        buttons[i].currentState = reading;

        // Button Pressed (Active LOW transition)
        if (buttons[i].currentState == LOW) {
          sendButtonEvent(buttons[i].name, buttons[i].canonical);

          digitalWrite(LED_GREEN, HIGH);
          soundButtonClick();
          digitalWrite(LED_GREEN, greenLedState ? HIGH : LOW);
        }
      }
    }
    buttons[i].lastState = reading;
  }
}

void readJoystick(unsigned long now) {
  if (now - lastJoystickSend < JOYSTICK_SEND_MS) return;

  int rawX = analogRead(JOY_X_PIN);
  int rawY = analogRead(JOY_Y_PIN);

  filteredRawX = filteredRawX * 0.75f + (float)rawX * 0.25f;
  filteredRawY = filteredRawY * 0.75f + (float)rawY * 0.25f;

  float devV = filteredRawX - (float)centerRawX;
  float devH = filteredRawY - (float)centerRawY;

  bool inDeadzone = (abs(devV) < JOYSTICK_DEADZONE) && (abs(devH) < JOYSTICK_DEADZONE);

  if (!inDeadzone) {
    int outX = JOYSTICK_CENTER;
    int outY = JOYSTICK_CENTER;
    float maxRange = (float)(JOYSTICK_CENTER - JOYSTICK_DEADZONE);

    if (abs(devH) > JOYSTICK_DEADZONE) {
      float magH = abs(devH) - JOYSTICK_DEADZONE;
      float normH = (magH / maxRange) * JOYSTICK_CENTER;
      if (normH > JOYSTICK_CENTER) normH = JOYSTICK_CENTER;
      outX = (devH > 0) ? (JOYSTICK_CENTER + (int)normH) : (JOYSTICK_CENTER - (int)normH);
    }

    if (abs(devV) > JOYSTICK_DEADZONE) {
      float magV = abs(devV) - JOYSTICK_DEADZONE;
      float normV = (magV / maxRange) * JOYSTICK_CENTER;
      if (normV > JOYSTICK_CENTER) normV = JOYSTICK_CENTER;
      outY = (devV > 0) ? (JOYSTICK_CENTER - (int)normV) : (JOYSTICK_CENTER + (int)normV);
    }

    outX = constrain(outX, 0, 4095);
    outY = constrain(outY, 0, 4095);

    joyX = outX;
    joyY = outY;
    joystickAtCenter = false;
    sendJoystickEvent(joyX, joyY, digitalRead(JOY_SW) == LOW);
    lastJoystickSend = now;
  } else if (!joystickAtCenter) {
    joyX = JOYSTICK_CENTER;
    joyY = JOYSTICK_CENTER;
    joystickAtCenter = true;

    if (tiltAtCenter) {
      sendJoystickEvent(JOYSTICK_CENTER, JOYSTICK_CENTER, digitalRead(JOY_SW) == LOW);
    }
    lastJoystickSend = now;
  }
}

void readMotionControl(unsigned long now) {
  if (now - lastMotionTime < 30) return;
  float dt = (float)(now - lastMotionTime) / 1000.0f;
  if (dt <= 0.0f || dt > 0.1f) dt = 0.030f;
  lastMotionTime = now;

  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B);
  if (Wire.endTransmission(false) != 0) return;

  Wire.requestFrom((uint8_t)MPU_ADDR, (uint8_t)14, (uint8_t)true);
  if (Wire.available() < 14) return;

  int16_t rawAccX = (Wire.read() << 8) | Wire.read();
  int16_t rawAccY = (Wire.read() << 8) | Wire.read();
  int16_t rawAccZ = (Wire.read() << 8) | Wire.read();
  Wire.read(); Wire.read();
  int16_t rawGyroX = (Wire.read() << 8) | Wire.read();
  int16_t rawGyroY = (Wire.read() << 8) | Wire.read();
  Wire.read(); Wire.read();

  float pitchAcc = atan2((float)rawAccY, sqrt((float)rawAccX * rawAccX + (float)rawAccZ * rawAccZ)) * 180.0f / PI;
  float rollAcc  = atan2((float)rawAccX, sqrt((float)rawAccY * rawAccY + (float)rawAccZ * rawAccZ)) * 180.0f / PI;

  float gyroRateX = (float)(rawGyroX - gyroBiasX) / 65.5f;
  float gyroRateY = (float)(rawGyroY - gyroBiasY) / 65.5f;

  pitchAngle = 0.92f * (pitchAngle + gyroRateX * dt) + 0.08f * pitchAcc;
  rollAngle  = 0.92f * (rollAngle  + gyroRateY * dt) + 0.08f * rollAcc;

  float devPitch = pitchAngle - neutralPitch;
  float devRoll  = rollAngle - neutralRoll;

  bool inDeadzone = (abs(devPitch) < TILT_DEADZONE_DEG) && (abs(devRoll) < TILT_DEADZONE_DEG);

  if (!joystickAtCenter) {
    tiltAtCenter = inDeadzone;
    return;
  }

  if (!inDeadzone) {
    float normPitch = 0.0f;
    float normRoll  = 0.0f;

    if (abs(devPitch) > TILT_DEADZONE_DEG) {
      float magP = constrain(abs(devPitch) - TILT_DEADZONE_DEG, 0.0f, TILT_MAX_DEG - TILT_DEADZONE_DEG);
      normPitch = (magP / (TILT_MAX_DEG - TILT_DEADZONE_DEG)) * (float)JOYSTICK_CENTER;
      if (devPitch < 0) normPitch = -normPitch;
    }

    if (abs(devRoll) > TILT_DEADZONE_DEG) {
      float magR = constrain(abs(devRoll) - TILT_DEADZONE_DEG, 0.0f, TILT_MAX_DEG - TILT_DEADZONE_DEG);
      normRoll = (magR / (TILT_MAX_DEG - TILT_DEADZONE_DEG)) * (float)JOYSTICK_CENTER;
      if (devRoll < 0) normRoll = -normRoll;
    }

    int tiltX = constrain(JOYSTICK_CENTER + (int)normRoll, 0, 4095);
    int tiltY = constrain(JOYSTICK_CENTER + (int)normPitch, 0, 4095);

    if (now - lastJoystickSend >= JOYSTICK_SEND_MS) {
      tiltAtCenter = false;
      sendJoystickEvent(tiltX, tiltY, false);
      lastJoystickSend = now;
    }
  } else if (!tiltAtCenter) {
    tiltAtCenter = true;
    if (now - lastJoystickSend >= JOYSTICK_SEND_MS) {
      sendJoystickEvent(JOYSTICK_CENTER, JOYSTICK_CENTER, false);
      lastJoystickSend = now;
    }
  }
}

// ============================================
// RFID READING & DEDICATED ARBITRATION
// ============================================

void checkRFID() {
  selectRFID();

  if (!rfid.PICC_IsNewCardPresent()) {
    deselectRFID();
    return;
  }
  if (!rfid.PICC_ReadCardSerial()) {
    deselectRFID();
    return;
  }

  String uid = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (i > 0) uid += " ";
    if (rfid.uid.uidByte[i] < 0x10) uid += "0";
    uid += String(rfid.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();

  unsigned long now = millis();
  if (uid == lastRfidUid && (now - lastRfidTime) < 2000) {
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
    deselectRFID();
    return;
  }

  lastRfidUid = uid;
  lastRfidTime = now;

  // Send structured event to browser
  sendRfidEvent(uid);

  // Instant tactile audio & LED feedback
  digitalWrite(LED_GREEN, HIGH);
  soundCardScanned();
  digitalWrite(LED_GREEN, greenLedState ? HIGH : LOW);

  statusPrompt = "Card: " + uid;
  updateDisplay(now);

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  deselectRFID();
}

// ============================================
// PROTOCOL EMISSION
// ============================================

void sendButtonEvent(const char* name, const char* canonical) {
  StaticJsonDocument<160> doc;
  doc["type"] = "button_press";
  doc["name"] = name;
  JsonObject payload = doc.createNestedObject("payload");
  payload["button"] = canonical;
  serializeJson(doc, Serial);
  Serial.println();
}

void sendJoystickEvent(int x, int y, bool btn) {
  StaticJsonDocument<192> doc;
  doc["type"] = "joystick_input";
  doc["x"] = x;
  doc["y"] = y;
  JsonObject payload = doc.createNestedObject("payload");
  payload["x"] = x;
  payload["y"] = y;
  payload["button"] = btn;
  serializeJson(doc, Serial);
  Serial.println();
}

void sendRfidEvent(String uid) {
  StaticJsonDocument<192> doc;
  doc["type"] = "rfid_scan";
  doc["uid"] = uid;
  JsonObject payload = doc.createNestedObject("payload");
  payload["uid"] = uid;
  serializeJson(doc, Serial);
  Serial.println();
}

// ============================================
// RECEIVE COMMANDS FROM APPLICATION
// ============================================

void readSerialCommands() {
  while (Serial.available()) {
    String line = Serial.readStringUntil('\n');
    line.trim();
    if (line.length() == 0) continue;

    lastSerialReceive = millis();

    if (!browserConnected) {
      browserConnected = true;
      soundStartup();
    }

    StaticJsonDocument<256> doc;
    DeserializationError error = deserializeJson(doc, line);
    if (error) continue;

    const char* type = doc["type"];
    if (!type) continue;

    if (strcmp(type, "auth_success") == 0) {
      soundAuthSuccess();
      const char* name = doc["payload"]["name"] | doc["name"];
      if (name) statusCadet = String(name);
      statusPrompt = "Access Authorized";
      updateDisplay(millis());
    }
    else if (strcmp(type, "auth_failed") == 0) {
      soundAuthFailed();
      statusPrompt = "Unauthorized Badge";
      updateDisplay(millis());
    }
    else if (strcmp(type, "display_update") == 0) {
      JsonObject payload = doc["payload"];
      const char* sec = payload["section"] | doc["section"];
      const char* pla = payload["planet"] | doc["planet"];
      const char* stu = payload["student"] | doc["student"];
      if (sec) statusSector = String(sec);
      if (pla) statusTarget = String(pla);
      if (stu) statusCadet = String(stu);
      updateDisplay(millis());
    }
    else if (strcmp(type, "led") == 0) {
      const char* color = doc["color"];
      bool state = doc["state"];
      if (strcmp(color, "green") == 0) {
        greenLedState = state;
        digitalWrite(LED_GREEN, state ? HIGH : LOW);
      } else if (strcmp(color, "red") == 0) {
        redLedState = state;
        digitalWrite(LED_RED, state ? HIGH : LOW);
      }
    }
    else if (strcmp(type, "buzzer") == 0) {
      int duration = doc["duration"] | 100;
      int frequency = doc["frequency"] | 1200;
      playTone(frequency, duration);
    }
  }
}

// ============================================
// ST7735 128x160 COSMOS HUD RENDERING
// ============================================

void showStartupDiagnostics(const char* rfidMsg, const char* mpuMsg, const char* joyMsg) {
  selectTFT();
  tft.fillScreen(COLOR_SPACE_BG);

  // Top Title Bar
  tft.fillRect(0, 0, 160, 18, COLOR_HEADER_BG);
  tft.drawFastHLine(0, 18, 160, COLOR_BLUE_GLOW);
  tft.setTextSize(1);
  tft.setTextColor(COLOR_CYAN);
  tft.setCursor(14, 5);
  tft.print("SPACE EXPLORER - HUD");

  // Diagnostics Label
  tft.setCursor(6, 26);
  tft.setTextColor(COLOR_GOLD);
  tft.print("HARDWARE SELF-TEST:");

  // RFID Status
  tft.setCursor(6, 42);
  tft.setTextColor(COLOR_CYAN);
  tft.print("RC522 RFID: ");
  tft.setTextColor(COLOR_WHITE);
  tft.print(rfidMsg);

  // MPU6050 Status
  tft.setCursor(6, 58);
  tft.setTextColor(COLOR_VIOLET);
  tft.print("MPU6050 IMU: ");
  tft.setTextColor(COLOR_WHITE);
  tft.print(mpuMsg);

  // Joystick Status
  tft.setCursor(6, 74);
  tft.setTextColor(COLOR_GREEN);
  tft.print("KY-023 JOY:  ");
  tft.setTextColor(COLOR_WHITE);
  tft.print(joyMsg);

  // Motion Tilt Status
  tft.setCursor(6, 90);
  tft.setTextColor(COLOR_MUTED);
  tft.print("TILT FILTER: ACTIVE (30Hz)");

  // Footer
  tft.drawFastHLine(6, 108, 148, COLOR_BORDER);
  tft.setCursor(6, 114);
  tft.setTextColor(COLOR_CYAN);
  tft.print("CONNECT USB: 115200 BAUD");

  deselectTFT();
}

void updateDisplay(unsigned long now) {
  selectTFT();

  // 1. Top HUD Header Bar
  tft.fillRect(0, 0, 160, 15, COLOR_HEADER_BG);
  tft.drawFastHLine(0, 15, 160, COLOR_BLUE_GLOW);
  tft.setTextSize(1);
  tft.setTextColor(COLOR_CYAN);
  tft.setCursor(4, 4);
  tft.print("COSMOS HUD");

  // Connection Indicator
  tft.setCursor(95, 4);
  if (browserConnected) {
    tft.setTextColor(COLOR_GREEN);
    tft.print("[ONLINE]");
  } else {
    tft.setTextColor(COLOR_RED);
    tft.print("[STANDBY]");
  }

  // 2. Telemetry Section
  // Sector
  tft.fillRect(0, 17, 160, 11, COLOR_SPACE_BG);
  tft.setCursor(4, 18);
  tft.setTextColor(COLOR_BLUE_GLOW);
  tft.print("SEC: ");
  tft.setTextColor(COLOR_WHITE);
  tft.print(statusSector.substring(0, 18));

  // Cadet Identity
  tft.fillRect(0, 29, 160, 11, COLOR_SPACE_BG);
  tft.setCursor(4, 30);
  tft.setTextColor(COLOR_GOLD);
  tft.print("CADET: ");
  tft.setTextColor(COLOR_WHITE);
  tft.print(statusCadet.substring(0, 16));

  // Target Body
  tft.fillRect(0, 41, 160, 11, COLOR_SPACE_BG);
  tft.setCursor(4, 42);
  tft.setTextColor(COLOR_CYAN);
  tft.print("TARGET: ");
  tft.setTextColor(COLOR_WHITE);
  tft.print(statusTarget.substring(0, 15));

  // Dynamic Prompt
  tft.fillRect(0, 53, 160, 12, COLOR_PANEL_BG);
  tft.setCursor(4, 55);
  tft.setTextColor(COLOR_GREEN);
  tft.print(">> ");
  tft.setTextColor(COLOR_WHITE);
  tft.print(statusPrompt.substring(0, 21));

  // 3. Sensor Real-Time Readout
  tft.fillRect(0, 68, 160, 11, COLOR_SPACE_BG);
  tft.setCursor(4, 70);
  tft.setTextColor(COLOR_MUTED);
  tft.print("J:");
  tft.print(joyX / 100);
  tft.print(",");
  tft.print(joyY / 100);
  tft.print(" T:");
  tft.print((int)pitchAngle);
  tft.print((int)rollAngle >= 0 ? "+": "");
  tft.print((int)rollAngle);
  tft.print((char)247); // Degree symbol

  // Divider
  tft.drawFastHLine(4, 82, 152, COLOR_BORDER);

  // 4. Physical Controller Button Legend
  tft.fillRect(0, 85, 160, 42, COLOR_SPACE_BG);
  tft.setTextColor(COLOR_GOLD);
  tft.setCursor(4, 87);
  tft.print("SEL: Focus / Enter");
  
  tft.setTextColor(COLOR_CYAN);
  tft.setCursor(4, 98);
  tft.print("BCK: Return / Orbit");

  tft.setTextColor(COLOR_MUTED);
  tft.setCursor(4, 109);
  tft.print("ACT: Info  | PAU: Freeze");

  deselectTFT();
  lastDisplayUpdate = now;
}
