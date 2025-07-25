### Monorepo Setup Overview

This project uses a **npm workspaces-based monorepo** setup with the following structure:

### Project Structure

```
contentful-web/
├── packages/
│   ├── core/            (@contentful-web/core - shared library)
│   ├── customer-ui/     (@contentful-web/customer-ui - react web application)
│   └── support-ui/      (@contentful-web/support-ui - react web application)
├── biome.jsonc (shared biome configuration)
├── package.json (root workspace configuration)
└── node_modules/ (hoisted dependencies)
```

### Workspace Configuration

The monorepo is configured using **npm workspaces** in the root `package.json`:

```json
{
  "name": "contentful-web",
  "workspaces": [
    "packages/*"
  ]
}
```

### Package Architecture

#### **Core Package (`@contentful-web/core`)**
- **Purpose**: Shared library containing common utilities, services, and types
- **Build Output**: Compiled TypeScript library with type definitions

#### **Web Packages (`@contentful-web/customer-ui`, `@contentful-web/support-ui`)**
- **Purpose**: React web applications built with Vite
- **Dependencies**: Consume `@kcast-fe/core` as a dependency

### ### Build System & Scripts

The monorepo uses a **dependency-aware build system**:

```json
{
  "dev:support": "npm run build:deps && npm run dev -w packages/support-ui",
  "dev:customer": "npm run build:deps && npm run dev -w packages/customer-ui",
  "build": "npm run build:deps && cd packages/support-ui && npm run build && cd packages/customer-ui && npm run build",
  "build:deps": "npm run build -w packages/core"
}
```

**Build Flow**:
1. First builds the `core` package (TypeScript compilation)
2. Then builds/runs the dependent packages (which depends on the built core)
