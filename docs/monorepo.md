### Monorepo Setup Overview

This project uses a **npm workspaces-based monorepo** setup to manage multiple packages within a single repository. This approach simplifies dependency management, ensures consistency, and facilitates code sharing across packages.

### Project Structure

```
contentful-web/
├── packages/
│   ├── core/            (@contentful-web/core - shared library)
│   ├── customer-ui/     (@contentful-web/customer-ui - React web application for customers)
│   └── support-ui/      (@contentful-web/support-ui - React web application for support staff)
├── biome.json (shared biome configuration)
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
- **Purpose**: Provides shared logic, utilities, and services for interacting with Contentful.
- **Build Output**: Compiled TypeScript library with type definitions.
- **Usage**: Consumed as a dependency by the `customer-ui` and `support-ui` packages.

#### **Web Packages (`@contentful-web/customer-ui`, `@contentful-web/support-ui`)**
- **Purpose**: React web applications built with Vite.
- **Dependencies**: Consume `@contentful-web/core` for shared functionality.

### Build System & Scripts

The monorepo uses a **dependency-aware build system** to ensure proper sequencing of builds:

#### Development Scripts
- **Run `support-ui` in development mode**:
  ```bash
  npm run dev --workspace=support-ui
  ```
- **Run `customer-ui` in development mode**:
  ```bash
  npm run dev --workspace=customer-ui
  ```

#### Build Scripts
- **Build all packages**:
  ```bash
  npm run build
  ```
- **Build the `core` package**:
  ```bash
  npm run build --workspace=core
  ```
- **Build a specific web package**:
  ```bash
  npm run build --workspace=support-ui
  ```

#### Testing Scripts
- **Run tests for all packages**:
  ```bash
  npm test
  ```
- **Run tests for a specific package**:
  ```bash
  npm test --workspace=core
  ```

### Adding Dependencies

To add a dependency to a specific package:
```bash
npm install <dependency-name> --workspace=<package-name>
```

To add a dependency to all packages:
```bash
npm install <dependency-name>
```

### Making Changes

- **Core Package**: Update shared logic or utilities in `packages/core`.
- **Web Packages**: Modify React components or scenes in `packages/customer-ui` or `packages/support-ui`.

### Key Benefits of Monorepo
- **Centralized Dependency Management**: Dependencies are hoisted to the root, reducing duplication.
- **Code Sharing**: Shared logic in `core` ensures consistency across applications.
- **Simplified Builds**: Dependency-aware scripts streamline the build process.
