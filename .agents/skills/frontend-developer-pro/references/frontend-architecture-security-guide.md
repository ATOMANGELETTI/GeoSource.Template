# Frontend Architecture, State, & Security Guide

## Overview
This guide defines the engineering standard for React, Next.js, and TypeScript frontend development within the GeoSource Tauri desktop workspace.

## TypeScript Standards
- **Strict Mode**: `noImplicitAny`, `strictNullChecks`, `noUnusedLocals` enforced.
- **Explicit Return Types**: All custom hooks and utility functions must define explicit return types.
- **Discriminated Unions**: Model state handling (Loading, Success, Error) with tagged union types.

## Security Practices
- **Environment Secrets**: Never expose API keys or secrets in public client builds. Use `.env` variables filtered through `NEXT_PUBLIC_` or Tauri `env` configs.
- **XSS Prevention**: Always sanitize user-generated dynamic HTML inputs. Avoid `dangerouslySetInnerHTML`.
- **Tauri IPC Isolation**: Only invoke explicitly whitelisted Tauri commands defined in Rust permissions capabilities.

## Code Quality & Formatting
- **ESLint**: Zero warning threshold.
- **Prettier**: Trailing commas, single quotes, 2-space tab width, 100 max line length.
