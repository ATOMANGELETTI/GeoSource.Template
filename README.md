# GeoSource Tauri Template

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/package.json)
[![Tauri](https://img.shields.io/badge/Tauri-v2.11-orange.svg?logo=tauri)](https://tauri.app)
[![Next.js](https://img.shields.io/badge/Next.js-v16.3-black.svg?logo=nextdotjs)](https://nextjs.org)
[![Rust](https://img.shields.io/badge/Rust-1.80%2B-red.svg?logo=rust)](https://www.rust-lang.org)
[![License](https://img.shields.io/badge/license-GPLv3-blue.svg)](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/other/documents/licenses/GeoSource/LICENSE)

GeoSource Tauri Template is a modern, production-ready desktop application boilerplate engineered with Tauri v2, Next.js 16 (React 19), Tailwind CSS, Nord Dark theme system, and a robust Rust system backend.

---

## Features Overview

- 🚀 **Tauri v2 Desktop Architecture**: Lightweight cross-platform native execution using Rust and web technology.
- 🎨 **Nord Visual Design System**: Modern theme palette supporting `polar-night` (Nord Dark), `snow-storm` (Nord Light), `frost`, `aurora`, and `system` modes.
- ⚙️ **Hot-Reloadable YAML Configuration**: User settings (`settings.yaml`), keybindings (`bindings.yaml`), and release metadata (`appinfo.yaml`) managed via `other/configs/`.
- 🔌 **Typed Tauri IPC Integration**: Secure Rust IPC commands with strongly-typed TypeScript invoke wrappers and Zustand state integration.
- 🧪 **Centralized Testing Suite**: Frontend unit & integration testing via Vitest and Rust backend integration testing under `tests/`.
- 🛡️ **Security & Capability Hardened**: Strict Content Security Policy (CSP), Tauri capability isolation, and automated validation scripts.

---

## Prerequisites & Installation

Before running or building the project, ensure your environment meets the following requirements:

### System Requirements

- **Node.js**: `20.x` or higher
- **Package Manager**: `npm` (v10+) or `pnpm`
- **Rust Toolchain**: `1.80` or higher with `cargo`
- **Native OS Dependencies**:
  - **Windows**: Visual Studio C++ Build Tools or Windows SDK
  - **macOS**: Xcode Command Line Tools (`xcode-select --install`)
  - **Linux**: `webkit2gtk`, `libssl-dev`, `build-essential`

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/ATOMANGELETTI/GeoSource.Template.git
   cd GeoSource.Template
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

---

## Development Setup

### Available Scripts

| Script                    | Command                           | Purpose                                                    |
| ------------------------- | --------------------------------- | ---------------------------------------------------------- |
| **Dev (Tauri + Next.js)** | `npm run tauri:dev`               | Launches Next.js dev server alongside Tauri desktop window |
| **Frontend Dev Only**     | `npm run dev`                     | Runs Next.js dev server on port `3000`                     |
| **Build Desktop App**     | `npm run tauri:build`             | Compiles production Tauri desktop binary                   |
| **Build Frontend**        | `npm run build`                   | Builds static/SSR Next.js bundle                           |
| **Run Frontend Tests**    | `npm run test`                    | Executes Vitest test suite                                 |
| **Test Coverage**         | `npm run test:coverage`           | Runs Vitest with coverage reporting                        |
| **Run Rust Tests**        | `cargo test`                      | Executes Rust backend tests                                |
| **Type Check**            | `npm run type-check`              | Performs TypeScript compiler validation                    |
| **Lint & Format**         | `npm run lint` / `npm run format` | Runs ESLint and Prettier code formatting                   |

---

## Configuration Reference

Application settings and keybindings are stored in human-readable YAML format in [`other/configs/`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/other/configs/README.md):

- **`other/configs/settings.yaml`**: UI theme, language, window sizing, and toggleable log level levels (`trace`, `debug`, `info`, `warn`, `error`).
- **`other/configs/bindings.yaml`**: Keybindings and action accelerator shortcuts.
- **`other/configs/appinfo.yaml`**: Read-only application version and codename metadata.

For detailed configuration field documentation, refer to the [Config Documentation](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/other/configs/README.md).

---

## Contributing & Project Structure

We follow strict code quality, security, and agent governance standards defined in the project:

- **[Project Documentation](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/other/documents/README.md)**: Architecture notes, ADRs, and change logs.
- **[API Reference](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/other/documents/api-reference.md)**: Tauri IPC command schemas and payloads.
- **[Development Standards](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/AGENTS.md)**: Code standards, token efficiency, testing thresholds, and git commit discipline.

To contribute, create a feature branch, adhere to Conventional Commits (`feat:`, `fix:`, `docs:`), and ensure all tests pass (`npm run test` and `cargo test`).

---

## License

This project is licensed under the [GNU General Public License v3 (GPLv3)](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/other/documents/licenses/GeoSource/LICENSE).
