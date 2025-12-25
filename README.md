<p align="center">
  <img src="./assets/Project-NeuroCalm.png" alt="NeuroCalm Banner" width="100%"/>
</p>

<h1 align="center">🧠 NeuroCalm</h1>

<p align="center">
  <strong>A stateless, privacy-first AI tool powered by Gemini that transforms complex text, images, and video into calm, structured clarity.</strong>
</p>

<p align="center">
  <a href="https://github.com/VIKAS9793/NeuroCalm">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
  </a>
  <a href="./CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge" alt="Contributions"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21-DD0031?style=flat-square&logo=angular&logoColor=white" alt="Angular"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/RxJS-7.8-B7178C?style=flat-square&logo=reactivex&logoColor=white" alt="RxJS"/>
  <img src="https://img.shields.io/badge/Privacy-First-22C55E?style=flat-square&logo=shield&logoColor=white" alt="Privacy First"/>
</p>

<p align="center">
  <a href="https://ai.studio/apps/drive/1pbRdM1goB99kK05-jNHaSU-6i8YSIzFM?fullscreenApplet=true">🚀 Try the Live Demo</a>
</p>

---

## 📖 Product Overview

NeuroCalm is a **cognitive accessibility layer** designed to help people interact with complex information in calmer, clearer ways. It uses generative AI to transform potentially overwhelming text, images, or videos into structured, predictable, and easy-to-process formats.

The application prioritizes **user privacy and agency**, operating on a session-only basis without storing any user data.

---

## ❓ Problem Statement

In a world saturated with information, individuals frequently encounter content that is:

- **Dense and unstructured**
- **Presented in ways that create cognitive friction**
- **Complex emails, confusing forms, or instructional videos**

This can lead to feelings of being overwhelmed, difficulty in identifying key actions, and challenges in processing essential information.

---

## 💡 Solution

NeuroCalm acts as an intermediary, taking user-provided content and reframing it for clarity. It leverages the **Google Gemini model's** advanced reasoning and multimodal understanding capabilities to analyze the input and generate a structured, schema-enforced output.

<p align="center">
  <img src="./assets/NeuroCalm-Product vision.png" alt="Product Vision: Transforming Information Overload into Structured Clarity" width="90%"/>
</p>
<p align="center"><em>NeuroCalm's core value proposition</em></p>

---

## 🎯 Core Principles

| Principle | Description |
|-----------|-------------|
| **🔮 Predictability** | The UI and AI outputs are deterministic and structured, eliminating layout variance and surprises |
| **👤 User Agency** | The user maintains full control over their inputs, desired support style, and output detail level |
| **🔒 Privacy** | All processing is session-only. No user input is ever stored, saved, or used for training |
| **⚕️ Non-Diagnostic** | NeuroCalm is a support tool, not a medical or diagnostic one. It does not label or classify users |

---

## ⚙️ How it Works: Core Logic Flow

The application follows a simple, privacy-preserving flow for every user interaction. It includes a **critical safety guardrail** to detect crisis language before any content is sent for AI processing.

<p align="center">
  <img src="./assets/NeuroCalm-Logicflow.png" alt="Core Logic Flow Diagram" width="90%"/>
</p>
<p align="center"><em>NeuroCalm's user input and processing flow</em></p>

---

## ✨ Key Capabilities

### V1 + V2 Features

- **🖼️ Multimodal Input:** Processes text, images (screenshots, forms), and short videos
- **📋 Structured Output:** Generates schema-driven content including titles, key points, steps, and requirements
- **❓ Uncertainty-Aware Responses:** Explicitly flags when source material is ambiguous or unclear
- **🧩 Adjustable Reasoning Depth:** Choose between direct summary, reasoning steps, or explanations
- **🛡️ Crisis Detection Guardrail:** Identifies language indicating severe distress and provides supportive redirection

---

## 🏗️ Architecture at a Glance

NeuroCalm is a **fully client-side application** with no backend or database. This stateless design is a core part of its privacy-first commitment, ensuring no user data is ever stored.

<p align="center">
  <img src="./assets/NeuroCalm-Architecture.png" alt="Stateless Client-Side Architecture Diagram" width="90%"/>
</p>
<p align="center"><em>NeuroCalm's stateless, browser-only architecture</em></p>

---

## 🤖 Why Gemini?

NeuroCalm is built on the **Gemini family of models** to leverage its core strengths:

| Capability | Benefit |
|------------|---------|
| **Advanced Reasoning** | Understands context, follows complex instructions, decomposes information logically |
| **Native Multimodality** | Seamlessly processes combinations of text, images, and video in a single prompt |
| **Schema-Driven Outputs** | Reliably generates valid JSON conforming to strict schema for predictable UI rendering |

---

## ⚖️ Ethical Positioning

### NeuroCalm IS:

✅ A cognitive accessibility layer  
✅ A tool for reducing cognitive load  
✅ A privacy-first, session-only utility

### NeuroCalm is NOT:

❌ A medical device or diagnostic tool  
❌ A mental health application  
❌ A replacement for professional advice  
❌ A tool that tracks, profiles, or stores user data

---

## 📁 Repository Structure

```
NeuroCalm/
├── src/                    # Application source code
│   ├── components/         # Angular components
│   ├── services/           # Gemini API service
│   └── models/             # TypeScript interfaces
├── docs/                   # Technical documentation
│   ├── architecture.md     # System architecture
│   ├── setup.md            # Setup instructions
│   ├── ai-governance.md    # AI safety policies
│   ├── privacy-security.md # Privacy documentation
│   ├── roadmap-v2.md       # Future development plans
│   └── evaluation.md       # Evaluation criteria
├── assets/                 # Images and diagrams
├── LICENSE                 # MIT License
└── CONTRIBUTING.md         # Contribution guidelines
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Setup Guide](./docs/setup.md) | Local development setup instructions |
| [Architecture](./docs/architecture.md) | Technical architecture overview |
| [AI Governance](./docs/ai-governance.md) | AI safety and governance policies |
| [Privacy & Security](./docs/privacy-security.md) | Privacy documentation |
| [V2 Roadmap](./docs/roadmap-v2.md) | Future development plans |
| [Evaluation](./docs/evaluation.md) | Evaluation criteria |

---

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VIKAS9793/NeuroCalm.git
   cd NeuroCalm
   ```

2. **Configure API key** (see [Setup Guide](./docs/setup.md))

3. **Serve locally:**
   ```bash
   npm install -g http-server
   http-server
   ```

4. **Open** `http://127.0.0.1:8080` in your browser

---

## 📊 Status

> **⚠️ Prototype**  
> This application is a functional prototype developed to demonstrate research-driven principles in AI-powered cognitive support. It is not intended for production use without further hardening and review.

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting a pull request.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

<table>
  <tr>
    <td align="center">
      <strong>Vikas Sahani</strong><br/>
      <a href="mailto:Vikassahani17@gmail.com">📧 Vikassahani17@gmail.com</a><br/>
      <a href="https://www.linkedin.com/in/vikas-sahani-727420358">🔗 LinkedIn</a><br/>
      <a href="https://github.com/VIKAS9793">🐙 GitHub</a>
    </td>
  </tr>
</table>

---

<p align="center">
  Made with 🧠 and ❤️ for cognitive accessibility
</p>