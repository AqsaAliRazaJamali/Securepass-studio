# SecurePass Studio 🛡️

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Web Crypto API](https://img.shields.io/badge/Web%20Crypto%20API-Secure-success?style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

An enterprise-grade password generation and credential reinforcement platform built with **React** and **Vite**.

SecurePass Studio combines cryptographically secure password generation with intelligent password hardening techniques to help users create and strengthen credentials entirely within the browser. Every operation is executed client-side, ensuring complete privacy, zero data transmission, and maximum control over sensitive information.

---

## 🚀 Technical Core & Security Architecture

The application operates through two independent security pipelines:

### 🔐 Password Generation Engine

Generates high-entropy passwords using the browser's native cryptographic subsystem:

```javascript
window.crypto.getRandomValues()
```

Unlike traditional pseudo-random generators, the Web Crypto API provides cryptographically secure randomness suitable for password generation and security-sensitive applications.

### ⚡ Credential Reinforcement Engine

Transforms weak or predictable user-provided passwords into stronger credentials through:

- Character substitutions
- Leet Speak conversion
- Entropy amplification
- Randomized padding
- Structural diversification

This process increases password complexity while preserving memorability.

---

## ✨ Feature Matrix

| Feature | Implementation Strategy | Security Benefit |
|----------|-------------------------|------------------|
| Cryptographic Password Generation | Web Crypto API | Eliminates predictable randomization patterns |
| Password Hardening | Dynamic string transformation engine | Strengthens weak user passwords |
| Ambiguity Filter | Character exclusion mapping | Prevents visual confusion between similar characters |
| Entropy Analysis | Mathematical entropy estimation | Real-time password quality assessment |
| Session History | In-memory browser storage | Tracks generated credentials during active session |
| Copy-to-Clipboard | Native Clipboard API | Fast credential management |
| Dark Mode Interface | Responsive component architecture | Enhanced usability and accessibility |

---

## 📊 Entropy Evaluation Model

Password strength is estimated using the classical entropy equation:

```math
E = \log_2(P^L)
```

Where:

- **E** = Estimated entropy (bits)
- **P** = Character pool size
- **L** = Password length

### Strength Classification

| Entropy | Classification |
|----------|----------------|
| < 40 bits | Weak |
| 40–59 bits | Moderate |
| 60–79 bits | Strong |
| 80–95 bits | Very Strong |
| ≥ 96 bits | Vault Grade |

---

## 🛠️ Technology Stack

### Frontend Runtime

- React
- Vite
- JavaScript (ES6+)

### Security Layer

- Web Crypto API
- Browser Clipboard API

### Styling System

- CSS3
- Responsive Layout Architecture
- Dark Theme Interface

---

## 📂 Repository Structure

```plaintext
securepass-studio/
├── .gitignore               # Multi-environment build tracking bypass
├── index.html               # Single Page Application root viewport canvas
├── package.json             # Operational dependencies and project specifications
├── postcss.config.js        # PostCSS build definitions
├── tailwind.config.js       # Core responsive matrix layout utility mapping
├── vite.config.js           # Vite server execution configuration bindings
├── public/                  
│   ├── favicon.svg          # Client browser branding element
│   └── icons.svg            # Media asset matrix
└── src/                     
    ├── App.css              # Font face mappings and platform overrides
    ├── App.jsx              # Central State Machine, Algorithmic Engines & Dark UI Core
    ├── index.css            # Scoped global environment rules
    ├── main.jsx             # React Virtual DOM bridge mount initialization
    └── assets/              
        ├── hero.png         # Interface display items
        ├── react.svg        
        └── vite.svg
```

---

## ⚙️ Local Development Setup

### Option 1: Clone Using Git

```bash
git clone https://github.com/aqsaalirazajamali/securepass-studio.git
cd securepass-studio
npm install
npm run dev
```

### Option 2: Download ZIP

1. Click the green **Code** button at the top of this GitHub page.
2. Select **Download ZIP**.
3. Extract the ZIP file on your computer.
4. Open a terminal or command prompt inside the extracted project folder.

Install dependencies:

```bash
npm install
```

Launch the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🔒 Security Guarantees

### Local-Only Execution

All operations occur directly within the browser environment.

No passwords are:

- Stored
- Logged
- Uploaded
- Transmitted
- Shared with third-party services

### Cryptographically Secure Randomness

SecurePass Studio utilizes browser-native cryptographic APIs rather than traditional pseudo-random algorithms, significantly improving resistance against:

- Dictionary attacks
- Credential stuffing attacks
- Brute-force attacks
- Pattern-based guessing techniques

---

## 📈 Skills Demonstrated

This project showcases:

- React Hooks (`useState`, `useEffect`, `useCallback`)
- State Management
- Cryptographic APIs
- Password Security Principles
- Entropy Analysis
- Browser APIs
- Responsive Design
- Modern Frontend Architecture

---

## 🔮 Future Enhancements

- Password Breach Detection
- Passphrase Generation Mode
- Password Export Functionality
- Multi-language Support
- Progressive Web App (PWA)
- Advanced Security Analytics Dashboard

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Aqsa Jamali**

Built with React, Vite, and modern browser cryptography.

---
