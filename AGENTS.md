# SPACE EXPLORER — AGENT OPERATING GUIDELINES & SPECIFICATIONS

## 1. Project Vision: COSMOS 3D Experience

**SPACE EXPLORER** is a production-quality college exhibition digital planetarium and astronomy exploration platform.
The core philosophy is: **EXPLORE THE UNIVERSE. DISCOVER THE UNKNOWN.**

### Strict Exclusions
- No spaceship flight simulations or flying games.
- No lunar landing or Mars landing arcade games.
- No satellite deployment or spacecraft mission-planning dashboards.
- Focus exclusively on: **Astronomy, the Solar System, 3D celestial visualization, planetary science, deep-space phenomena, and interactive student learning.**

---

## 2. Dribbble-Inspired Design Direction

The UI is inspired by high-end astronomy dashboards, digital planetariums, and modern space interfaces (e.g. Dribbble references for Space Education Dashboard, COSMOS 3D, Stellaris).

### Palette Tokens
- **Canvas / Space Background:** `#050814`
- **Secondary / Card Background:** `#0A1020`
- **Surface / Panel Background:** `#101A2E`
- **Primary Celestial Blue:** `#3984FF`
- **Accent Cosmic Violet:** `#895DFF`
- **Starlight White (Text Primary):** `#F1F5FF`
- **Nebula Slate (Text Muted):** `#98A7C0`
- **Warning / Solar Flare:** `#F5A623`
- **Success / Orbit Stable:** `#10B981`

### Aesthetics
- Deep-space dark backgrounds with subtle star particles.
- Real 3D planetary rendering (Three.js / React Three Fiber) with lighting, axial tilts, and orbital paths.
- Clean typography (inter / modern sans-serif), glass-tinted borders, smooth transitions.
- Responsive design tailored for exhibition desktop screens, laptops, and tablets.

---

## 3. Hardware Architecture & GPIO Wiring (ESP32)

The physical controller uses an ESP32 Dev Module communicating over WebSockets / Serial with real-time bidirectional telemetry.

### Verified Hardware Pinout
| Component | Function / Pin | ESP32 GPIO | Notes |
| :--- | :--- | :--- | :--- |
| **ST7735 1.8" TFT** | SPI CS | `GPIO 5` | Hardware VSPI |
| | SPI DC | `GPIO 27` | Data / Command |
| | SPI RST | `GPIO 4` | Hardware Reset |
| | SPI SCK | `GPIO 18` | Shared VSPI Bus |
| | SPI MOSI | `GPIO 23` | Shared VSPI Bus |
| **RC522 RFID** | SPI SS / CS | `GPIO 16` | Dedicated CS for SPI Bus Arbitration |
| | SPI RST | `GPIO 17` | RFID Reset |
| | SPI MISO | `GPIO 19` | VSPI MISO |
| | SPI SCK | `GPIO 18` | Shared VSPI Bus |
| | SPI MOSI | `GPIO 23` | Shared VSPI Bus |
| **MPU6050 IMU** | I2C SDA | `GPIO 21` | Hardware I2C (Address: 0x68) |
| | I2C SCL | `GPIO 22` | Hardware I2C Clock |
| **KY-023 Joystick**| VRx (X-Axis) | `GPIO 34` | ADC1 Input |
| | VRy (Y-Axis) | `GPIO 35` | ADC1 Input |
| | SW (Click) | `GPIO 33` | Digital Input (Pullup) |
| **Pushbuttons (4)** | Button 1 (Select) | `GPIO 25` | Active LOW (Internal Pullup) |
| | Button 2 (Back) | `GPIO 26` | Active LOW (Internal Pullup) |
| | Button 3 (Action / Bookmark) | `GPIO 14` | Active LOW (Internal Pullup) |
| | Button 4 (Pause / Resume) | `GPIO 32` | Active LOW (Internal Pullup) |
| **Status LEDs** | Green LED (Success / Active) | `GPIO 13` | Digital Output |
| | Red LED (Denied / Error) | `GPIO 15` | Digital Output |
| **Piezo Buzzer** | Audio Feedback | `GPIO 2` | PWM / Tone Output |

*Safety Rule: Never invent new pin configurations or overwrite existing GPIO assignments without verifying the physical prototype.*

---

## 4. Communication Protocol

Bidirectional communication via WebSockets (or Web Serial USB fallback) using structured JSON messages.

### Controller to Laptop Events
- `rfid_scan`: `{ "type": "rfid_scan", "payload": { "uid": "STRING" } }`
- `joystick_input`: `{ "type": "joystick_input", "payload": { "x": number, "y": number, "button": boolean } }`
- `button_press`: `{ "type": "button_press", "payload": { "button": "select" | "back" | "action" | "pause" } }`
- `imu_data`: `{ "type": "imu_data", "payload": { "pitch": number, "roll": number, "yaw": number } }`
- `heartbeat`: `{ "type": "heartbeat", "payload": { "uptime": number } }`

### Laptop to Controller Events
- `auth_success`: Triggers green LED pulse and welcome tune on buzzer.
- `auth_failed`: Triggers red LED blink and error tone.
- `display_update`: Updates ST7735 screen (e.g. current planet name, section title, student name).
- `buzzer_feedback`: Plays specific acoustic cue for selections or alerts.

---

## 5. Authentication, Student Profiles & Demo Mode

### RFID-First Authentication Screen
- Normal access starts on a dedicated, full-screen cinematic RFID scanning page.
- No dashboard or educational content is accessible before authentication.
- Scanned UID is sent to the backend for verification against registered student profiles.

### Isolated Student Profiles
- Individual profiles store:
  - Student Name, Role, Registration Date
  - Bookmarked celestial objects (Planets, Moons, Stars, Galaxies, Nebulae)
  - Explored objects history
  - Space Academy lessons completed
  - Multiple-choice quiz history, scores, and accuracy percentages
  - Earned achievements & milestones
- Progress across different students is strictly isolated.

### Demo Mode
- A clearly labeled **DEMO MODE** allows exhibition visitors to test the platform when ESP32 hardware is offline.
- Features simulated RFID login, keyboard/mouse controls, and virtual controller indicators.
- Hardware status badges must accurately distinguish real hardware from simulated Demo Mode.

---

## 6. Technology Stack

- **Frontend Framework:** React 18 with TypeScript and Vite
- **3D Graphics Engine:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation & Transitions:** Framer Motion
- **Icons & Styling:** Lucide React, Tailwind CSS
- **Hardware Firmware:** ESP32 Arduino C++ with Adafruit GFX, Adafruit ST7735, MFRC522, ArduinoJson, Wire, SPI

---

## 7. Mandatory GitHub Workflow

After completing every single task or meaningful phase:
1. Review all modified and created files.
2. Run test suites, TypeScript compilation (`npm run build`), and verify zero errors.
3. Review `git diff` to ensure no sensitive credentials or unrelated modifications are staged.
4. Stage relevant files.
5. Commit using Conventional Commits (e.g., `feat(cosmos): ...`, `fix(auth): ...`).
6. Push to the designated remote repository (`origin` pointing to `https://github.com/Kanishkk-S/space-explorer.git`).
7. Verify that the push succeeded.

### Git Safety Rules
- Never force push (`--force`).
- Never delete git history.
- Never commit `.env`, credentials, private keys, or personal student identification.
- If pushing fails, preserve the commit and report the exact diagnosis.
