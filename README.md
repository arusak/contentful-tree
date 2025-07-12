# Contentful Tree

Web application that displays hierarchical content from Contentful CMS with role-based filtering.

## Features

- Displays hierarchical content structure from Contentful
- Filters content by current user's role

## Contentful Structure

The app works with three content types:
- **Folder**: Contains hierarchical structure
- **Instruction**: Content with role access permissions
- **EmployeeRole**: Defines user roles

## Setup & Running

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Contentful**
   Create a `.env` file with:
   ```
   VITE_CONTENTFUL_SPACE_ID=your_space_id
   VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
   VITE_CONTENTFUL_ENVIRONMENT=master
   ```

3. **Run the app**
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5173/

4. **Build for production**
   ```bash
   npm run build
   ```
