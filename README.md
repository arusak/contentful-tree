# Contentful Instructions App

A Vite TypeScript React application that fetches and displays hierarchical content from Contentful CMS with role-based filtering.

## Features

- Fetches hierarchical content from Contentful CMS
- Displays instructions with their hierarchical paths
- Filters instructions by employee role
- Applies role colors to instruction backgrounds
- Responsive design with Chakra UI and Tailwind CSS

## Tech Stack

- **Framework**: Vite + TypeScript + React
- **CMS**: Contentful SDK
- **Styling**: Chakra UI + Tailwind CSS
- **Environment**: .env file for configuration

## Contentful Content Model

### Content Types:
1. **Folder**
   - Fields: `Title` (Text), `Children` (References to other Folders and Instructions)

2. **Instruction** 
   - Fields: `Title` (Text), `Description` (Text), `roles` (Reference to EmployeeRole)

3. **EmployeeRole**
   - Fields: `Title` (Text), `Color` (Text - hex color code)

## Project Structure

```
src/
├── components/
│   ├── RoleSelector.tsx
│   ├── InstructionsList.tsx
│   ├── InstructionItem.tsx
│   └── LoadingSpinner.tsx
├── hooks/
│   └── useContentful.ts
├── types/
│   └── contentful.ts
├── App.tsx
└── main.tsx
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Contentful credentials:
   ```
   VITE_CONTENTFUL_SPACE_ID=your_space_id
   VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
   VITE_CONTENTFUL_ENVIRONMENT=master
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Implementation Details

### Data Fetching
- Uses Contentful SDK to fetch content
- Implements custom React hook for data management
- Builds hierarchical paths for instructions

### UI Components
- **RoleSelector**: Dropdown for filtering by role
- **InstructionsList**: Displays filtered instructions
- **InstructionItem**: Shows instruction with path and role color
- **LoadingSpinner**: Indicates loading state

### Styling
- Primary styling with Chakra UI components
- Enhanced with Tailwind CSS utilities
- Responsive design for all screen sizes

### Error Handling
- Graceful handling of API errors
- User-friendly error messages
- Console logging for debugging
