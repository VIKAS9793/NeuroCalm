# Contributing to NeuroCalm

Thank you for your interest in contributing to NeuroCalm! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. We are committed to providing a welcoming experience for everyone.

### Our Standards

- Be respectful and considerate in all interactions
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Accept responsibility for mistakes and learn from them

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/NeuroCalm.git
   cd NeuroCalm
   ```
3. **Set up the upstream remote**:
   ```bash
   git remote add upstream https://github.com/VIKAS9793/NeuroCalm.git
   ```

---

## How to Contribute

### Types of Contributions We Welcome

- 🐛 **Bug fixes:** Found a bug? We'd love a fix!
- ✨ **New features:** Have an idea? Open an issue first to discuss
- 📖 **Documentation:** Improvements to docs are always welcome
- 🎨 **UI/UX improvements:** Enhancing accessibility and user experience
- 🧪 **Testing:** Adding or improving tests

### What We're NOT Looking For

Given NeuroCalm's mission as a **cognitive accessibility tool**, we will not accept contributions that:

- Add user tracking, profiling, or data storage
- Introduce diagnostic or medical features
- Use persuasive, urgent, or judgmental language
- Compromise the privacy-first principles

---

## Development Setup

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari)
- A valid Google Gemini API key
- A local web server (e.g., `http-server`)

### Local Development

1. Configure your API key (see [docs/setup.md](./docs/setup.md))
2. Serve the project:
   ```bash
   npm install -g http-server
   http-server
   ```
3. Open `http://127.0.0.1:8080` in your browser

---

## Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly

4. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add new support style for bullet points"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** against the `main` branch

### PR Requirements

- [ ] Clear description of changes
- [ ] All existing functionality still works
- [ ] Code follows project style guidelines
- [ ] Documentation updated if needed
- [ ] No sensitive data (API keys, etc.) included

---

## Coding Standards

### TypeScript/Angular

- Use Angular Signals for state management
- Follow standalone component patterns
- Use `ChangeDetectionStrategy.OnPush`
- Prefer composition over inheritance

### Styling

- Use Tailwind CSS utility classes
- Maintain consistent spacing and color schemes
- Ensure accessibility (ARIA labels, keyboard navigation)

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests

---

## Reporting Issues

### Bug Reports

When reporting a bug, please include:

1. **Description:** Clear summary of the issue
2. **Steps to reproduce:** How can we replicate the bug?
3. **Expected behavior:** What should happen?
4. **Actual behavior:** What actually happens?
5. **Environment:** Browser, OS, etc.
6. **Screenshots:** If applicable

### Feature Requests

For feature requests, please:

1. Check existing issues to avoid duplicates
2. Describe the use case and benefit
3. Explain how it aligns with NeuroCalm's mission

---

## Questions?

If you have questions about contributing, feel free to:

- Open a GitHub issue
- Contact the maintainer: [Vikassahani17@gmail.com](mailto:Vikassahani17@gmail.com)

---

Thank you for helping make NeuroCalm better! 🧠✨
