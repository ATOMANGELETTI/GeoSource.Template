# GeoSource Testing Architecture & Guidelines

## 1. Overview

Testing in GeoSource is organized across two principal domains:
- **Rust Backend**: Cargo unit & integration tests (`src-tauri/src/`)
- **TypeScript Frontend**: Vitest & React Testing Library (`src/`)

## 2. Rust Testing Standards

### 2.1 Unit Tests (`#[cfg(test)]`)
- Place unit test modules directly in the file being tested or inside `src-tauri/src/tests/`.
- Use `tokio::test` for async handlers and IPC commands.
- Custom state structs should be initialized using mock default values without requiring full OS window initialization.

### 2.2 IPC Command Testing Pattern
```rust
#[tauri::command]
pub async fn calculate_area(width: f64, height: f64) -> Result<f64, String> {
    if width <= 0.0 || height <= 0.0 {
        return Err("Dimensions must be positive".into());
    }
    Ok(width * height)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_calculate_area_valid() {
        let result = calculate_area(10.0, 5.0).await;
        assert_eq!(result, Ok(50.0));
    }
}
```

## 3. Frontend Vitest Standards

### 3.1 Mocking `@tauri-apps/api/core`
Always mock the Tauri API package when testing TypeScript invoke wrappers to isolate frontend tests from the native runtime:

```typescript
import { vi } from 'vitest';

vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn(),
}));
```

### 3.2 Code Coverage Target
All pull requests and test suites must maintain **80%+ code coverage** across statements, lines, and functions. Enforced via `verify_coverage.ps1`.
