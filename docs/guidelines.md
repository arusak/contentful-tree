### ContentfulTree Project Guidelines

This document outlines the coding guidelines for the ContentfulTree project. These guidelines are designed to ensure consistency and maintainability across the codebase.
Every developer should follow these conventions when contributing to the project.

#### File Structure and Naming Conventions

##### Directory Structure
- `/src/components/`: React components
- `/src/hooks/`: Custom React hooks
- `/src/types/`: TypeScript type definitions
- `/src/services/`: API and service-related code
- `/src/utils/`: Utility functions

##### File Naming
- **Component files**: Use PascalCase (e.g., `ContentTree.tsx`, `RoleSelector.tsx`)
- **Hook files**: Use camelCase with 'use' prefix (e.g., `useContentful.ts`)
- **Utility files**: Use PascalCase with descriptive names (e.g., `ContentfulDataUtils.ts`)
- **Type definition files**: Use PascalCase (e.g., `ContentfulTypes.ts`)
- **Service files**: Use PascalCase with 'Service' suffix (e.g., `ContentfulClientService.ts`)

#### TypeScript Guidelines

##### Type Definitions
- Define interfaces and types in dedicated files under the `/src/types/` directory
- Use PascalCase for interface names (e.g., `ContentfulFolder`, `InstructionWithPath`)
- Use descriptive names that clearly indicate the purpose of the type
- Export types that are used across multiple files

##### Type Usage
- Always define prop types for components using interfaces:
  ```typescript
  type Props = {
    roles: EmployeeRoleEntry[]
    selectedRoleId: string | null
    onRoleChange: (roleId: string | null) => void
    isLoading: boolean
  }
  ```
- Use TypeScript's type system to ensure type safety:
  ```typescript
  export type FolderEntry = Entry<ContentfulFolder>
  export type InstructionEntry = Entry<ContentfulInstruction>
  ```
- Add explicit return types to functions, especially for hooks:
- Use type assertions only when necessary and document why they're needed:

##### Component Definitions
- Use functional components with explicit type annotations:
  ```typescript
  export const RoleSelector: FC<Props> = ({ roles, selectedRoleId, onRoleChange, isLoading }) => {
    // Component implementation
  }
  ```
- Always use `FC` (Function Component) from React for component type definitions:
  ```typescript
  import { FC } from 'react'
  ```
- Avoid putting prop types directly in the component definition; instead, define them separately and reference them:
  ```typescript
  type Props = {
    // prop definitions
  }

  export const MyComponent: FC<Props> = (props) => {
    // Component implementation
  }
  ```

#### CSS and Styling Guidelines

##### Chakra UI Usage
- Avoid using standard HTML elements like `<div>`, `<span>`, etc. in favor of Chakra UI components:
  ```tsx
  <Box p={4} bg="gray.100">
    // ...
  </Box>
  ```
- Avoid using custom CSS files; prefer Chakra UI for styling
- Prefer Chakra UI component props for styling over custom CSS:
  ```tsx
  <Flex align="center" gap={3} m={'2rem 0'} fontSize={'150%'}>
    <Box flexShrink={0}>Select User Role:</Box>
    // ...
  </Flex>
  ```
- Use Chakra's responsive props for responsive design:
  ```tsx
  <Container fluid p="8" minH="100vh" bg="gray.50">
    // ...
  </Container>
  ```
    - Use Chakra's semantic components when available (e.g., `Alert`, `Spinner`, `Separator`, `Stack`, `Grid` etc.)

##### Style Props Conventions
- Use string values for simple properties:
  ```tsx
  <Box w={3} h={3} bg={item?.fields.color as string} rounded={'50%'} />
  ```
- Use object notation for complex responsive styles
- For colors, use Chakra's color tokens (e.g., `gray.200`, `green.600`)
- For spacing, use Chakra's spacing scale (e.g., `p={4}`, `gap={3}`)

##### When to Use Alternative Styling Methods
- Use the `style` prop only for dynamic styles that can't be expressed with Chakra props:
  ```tsx
  <Box style={{ background: dynamicColor }}>Content</Box>
  ```

#### Variable Naming Conventions

##### General Variables
- Use camelCase for variable names
- Use descriptive names that clearly indicate the purpose of the variable
- Prefix boolean variables with 'is', 'has', or similar (e.g., `isLoading`, `hasError`)

##### State Variables
- Use descriptive names for state variables:
  ```typescript
  const [selectedFolder, selectFolder] = useState<FolderEntry | null>(null)
  ```
- For state setter functions, use 'set' prefix or a verb that describes the action:
  ```typescript
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)
  ```

##### Event Handlers
- Prefix event handler props with 'on':
  ```typescript
  onRoleChange: (roleId: string | null) => void
  ```
- Prefix event handler functions with 'handle':
  ```typescript
  const handleRoleChange = (roleId: string | null) => {
    // Implementation
  }
  ```

#### Component Props

##### Props Naming
- Use descriptive names for props
- Use consistent naming across similar components
- For callback props, use 'on' prefix (e.g., `onShowInstruction`, `onRoleChange`)

##### Props Organization
- Define props using TypeScript type aliases
- Sort props alphabetically within the type definition
- Document complex props with comments

#### Import Conventions

##### Import Style
- Use named imports for specific exports:
  ```typescript
  import { Box, Grid, GridItem, Separator, Stack } from '@chakra-ui/react'
  ```
- Never use relative paths for imports; always use absolute paths from the `src` directory:
  ```typescript
  import { ContentfulClientService } from 'services/ContentfulClientService.ts'
  ```
- Use type-only imports for TypeScript types:
  ```typescript
  import type { ContentfulFolder, ContentfulInstruction } from 'types/contentful.ts'
  ```
- Never import React default export in new files, as it is not needed in React 17+:
  ```typescript
  // Do not use this
  import React from 'react'
  
  // Instead, use named imports if needed
  import { FC } from 'react'
  ```
- Avoid default exports

#### Hook Guidelines

##### Custom Hooks
- Prefix custom hooks with 'use' (e.g., `useContentful`)
- Return an object with named properties for better readability:
  ```typescript
  return {
    roles,
    loading,
    error
  }
  ```
- Document the purpose and return values of custom hooks

##### Hook Usage
- Follow React's rules of hooks (only call hooks at the top level, only call hooks from React functions)
- Use the appropriate hook for the task (useState for state, useEffect for side effects, etc.)
- When ignoring exhaustive dependencies in useEffect, add a comment explaining why:
  ```typescript
  // biome-ignore lint/correctness/useExhaustiveDependencies: used to fetch data on mount
  useEffect(() => {
    fetchContent()
  }, [])
  ```
