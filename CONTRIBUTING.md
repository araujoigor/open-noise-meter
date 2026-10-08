# Contributing to OpenNoiseMeter

Thank you for your interest in contributing to **OpenNoiseMeter**! We welcome contributions that help improve sound measurement accuracy, UI accessibility, and performance while upholding our core principles: **zero ads, zero tracking, and 100% privacy**.

---

## 🛠️ Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/araujoigor/open-noise-meter.git
   cd open-noise-meter
   ```

2. Install dependencies (we recommend [Bun](https://bun.sh/), but `npm` or `pnpm` also work):
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Run tests:
   ```bash
   bun test
   ```

5. Verify the production build:
   ```bash
   bun run build
   ```

---

## 📋 Guidelines for Pull Requests

* **Privacy is paramount:** Never add telemetry, cookies, or remote audio transmission.
* **Minimal dependencies:** Keep the app lightweight and fast to load on mobile connections.
* **Test coverage:** If adding or modifying acoustic formulas, add corresponding unit tests in `src/audio/__tests__/`.
* **AI Coding Assistants:** If you are an AI agent or using an agent to submit a PR, please review [`AGENTS.md`](./AGENTS.md) before submitting.

---

## 💬 Questions & Issues

Feel free to open an issue on GitHub for bug reports, questions, or feature requests!
