# Contentful Tree

Web application that displays hierarchical content from Contentful CMS with role-based filtering.

## Features

- Displays hierarchical content structure from Contentful
- Filters content by current user's role

## Setup & Running

1. **Install dependencies**
   ```bash
   npm install
   ```
   This will install dependencies for all packages in the monorepo.

2. **Configure Contentful**
   Create a `.env` file in the root directory with:
   ```
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   CONTENTFUL_ENVIRONMENT=master
   ```

3. **Run the applications**
   - To run any package (e.g., `customer-ui`):
     ```bash
     npm run dev --workspace=customer-ui
     ```
     Replace `customer-ui` with the desired package name.

4. **Build for production**
   - To build all packages:
     ```bash
     npm run build
     ```

5. **Testing**
   Run tests for all packages:
   ```bash
   npm test
   ```

## Documentation

For more details, refer to the following documentation files:

- [Guidelines](docs/guidelines.md)
- [Monorepo Setup](docs/monorepo.md)
- [Project Overview](docs/project.md)
