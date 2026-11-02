# SPACE EXPLORER — COSMOS 3D EXPERIENCE

**EXPLORE THE UNIVERSE. DISCOVER THE UNKNOWN.**

An immersive, futuristic digital planetarium and cosmos exploration platform designed for college exhibitions and interactive student learning. Built with **React 18**, **Three.js / React Three Fiber**, **Tailwind CSS**, and **ESP32 physical hardware controller telemetry**.

---

## 🌟 Key Application Modules

### 1. Cinematic RFID-First Authentication
- Full-screen animated deep-space starfield with pulsing radar waves.
- Physical student badge verification via RC522 RFID reader.
- Dedicated, clearly labeled **Demo Mode** for hardware-free exhibition testing.
- Protected Administrator & Instructor Portal to register cards and track student cohorts.

### 2. Interactive 3D Solar System (Centrepiece)
- Real-time 3D Three.js environment featuring the Sun and all 8 major planets (Mercury through Neptune).
- True axial rotation, orbital revolution around the Sun, and visible orbital paths.
- Saturn's rings with transparent shading, atmospheric coronal sunlight halos.
- Interactive OrbitControls (camera rotation, pan, zoom, click-to-focus fly-to camera transitions).
- Orbital velocity stepper controls (0.5x to 4x) and pause/resume.

### 3. Dedicated Planet Explorer & Moons
- Individual interactive 3D model inspector for every planet.
- Scientific tabs: Overview, Internal Structure, Atmosphere, Natural Moons, Exploration History, and Facts.
- Coverage of key natural satellites: Earth's Moon, Europa, Titan, Enceladus, Io, Phobos, Deimos, Callisto, Ganymede.
- Direct bookmarking to personalized student portfolio.

### 4. Deep Space Exploration
- High-fidelity profiles across Stars, Galaxies, Nebulae, and Extreme Phenomena.
- Highlights: Milky Way Galaxy, Andromeda Galaxy (M31), Orion Nebula (M42), Crab Supernova Remnant (M1), Sagittarius A* Supermassive Black Hole, and Betelgeuse.

### 5. Cosmic Knowledge Encyclopedia
- Core astrophysics foundations: The Big Bang & Primordial Expansion, Stellar Evolution & Lifecycles, Spacetime Curvature & General Relativity, and Dark Matter & Dark Energy.

### 6. Space Academy & Interactive Quizzes
- Structured astronomy curriculum with difficulty ratings, durations, and learning objectives.
- Interactive 4-option multiple-choice quizzes with instant correct/incorrect feedback, scientific explanations, accuracy scoring, and celebration confetti on 100% mastery.

### 7. My Discoveries (Isolated Student Portfolios)
- Personal discovery library per student: bookmarked objects with category filters and search, explored objects timeline, quiz score history, and unlockable achievement badges.

---

## 🛠️ Hardware Integration (ESP32 Dev Module)

The physical exhibition controller communicates with the browser over **Web Serial USB** (or WebSockets) at 115200 baud with real-time bidirectional JSON telemetry.

### Verified Hardware Pinout
| Component | Function / Pin | ESP32 GPIO | Description |
| :--- | :--- | :--- | :--- |
| **ST7735 1.8" TFT** | SPI CS | `GPIO 5` | Hardware VSPI Chip Select |
| | SPI DC | `GPIO 27` | Data / Command Select |
| | SPI RST | `GPIO 4` | Hardware Reset |
| | SPI SCK | `GPIO 18` | Shared VSPI Clock Bus |
| | SPI MOSI | `GPIO 23` | Shared VSPI MOSI Bus |
| **RC522 RFID** | SPI SS / CS | `GPIO 16` | Dedicated CS for Bus Arbitration |
| | SPI RST | `GPIO 17` | RFID Hardware Reset |
| | SPI MISO | `GPIO 19` | VSPI MISO Bus |
| | SPI SCK | `GPIO 18` | Shared VSPI Clock Bus |
| | SPI MOSI | `GPIO 23` | Shared VSPI MOSI Bus |
| **MPU6050 IMU** | I2C SDA | `GPIO 21` | Hardware I2C Data (0x68) |
| | I2C SCL | `GPIO 22` | Hardware I2C Clock |
| **KY-023 Joystick**| VRx (X-Axis) | `GPIO 34` | ADC1 Analog Input (Sideways Mapped) |
| | VRy (Y-Axis) | `GPIO 35` | ADC1 Analog Input |
| | SW (Click) | `GPIO 33` | Digital Input (Internal Pullup) |
| **Pushbuttons (4)** | Button 1 (Select) | `GPIO 25` | Active LOW (Internal Pullup) |
| | Button 2 (Back) | `GPIO 26` | Active LOW (Internal Pullup) |
| | Button 3 (Action) | `GPIO 14` | Active LOW (Internal Pullup) |
| | Button 4 (Pause) | `GPIO 32` | Active LOW (Internal Pullup) |
| **Status LEDs** | Green LED | `GPIO 13` | Digital Output (Auth Success / Live) |
| | Red LED | `GPIO 15` | Digital Output (Auth Denied / Warning) |
| **Piezo Buzzer** | Tone Audio | `GPIO 2` | PWM / LEDC Acoustic Feedback |

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser (Google Chrome or Edge recommended for Web Serial API support).

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🎮 Exhibition Controls

- **Mouse / Trackpad:** Click and drag to orbit 3D planets; scroll wheel to zoom in/out; click any planet or chip to select.
- **Physical ESP32 Controller:**
  - **RFID Reader:** Tap physical badge on RC522 to authenticate.
  - **Joystick:** Navigate celestial lists and focus target planets.
  - **Button 1 (Select):** Focus selected planet or confirm action.
  - **Button 2 (Back):** Return to Solar System view or home overview.
  - **MPU6050 Gyro:** Tilt physical controller to adjust 3D planetarium viewing angle.
- **Demo Mode:** Click "ENTER DEMO MODE (NO HARDWARE)" on the login screen to explore all features instantly without physical controller connected.

---

## 📜 Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **3D Graphics:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Styling & UI:** Tailwind CSS, Lucide React, Framer Motion
- **Controller Firmware:** ESP32 Arduino C++ with Adafruit GFX, Adafruit ST7735, MFRC522, ArduinoJson
