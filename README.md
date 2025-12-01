# Spice Conference Website

This is the repository for the Spice Conference website, built with React and Vite.

## 🚀 Installation & Deployment

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Setup

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run local development server:**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Deployment

This project is configured to deploy to GitHub Pages.

1.  **Build and Deploy:**
    ```bash
    npm run deploy
    ```
    This command builds the project to the `dist` folder and pushes it to the `gh-pages` branch.

## 📂 Project Structure & Modification

The source code is located in the `src` directory.

- **`src/App.jsx`**: The main component containing the routing and layout logic.
- **`src/main.jsx`**: The entry point of the application.
- **`src/components/`**: Reusable UI components (e.g., Header, Footer, SpeakerCard).
- **`src/data/`**: Static data files (e.g., speakers list, schedule).
- **`src/assets/`**: Images and other static assets.

### How to Modify

- **Content**: To update text or images, check the relevant component in `src/components` or data file in `src/data`.
- **Styles**: Tailwind CSS is used for styling. You can modify classes directly in the JSX files or update `src/index.css` for global styles.

## 🎨 Format & Refactor

We use ESLint for code quality and formatting.

- **Linting**:

  ```bash
  npm run lint
  ```

  Run this command to check for code issues.

- **Formatting**:
  Ensure your editor is configured to use the project's ESLint and Prettier settings (if applicable) to maintain consistent code style.

## 📝 Commit Messages

Please follow this format for commit messages to keep the history clean:

`[Category] Description of the change`

**Categories:**

- `[Feature]`: Adding a new feature (e.g., new page, new component).
- `[Fix]`: Fixing a bug or issue.
- `[Style]`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
- `[Refactor]`: A code change that neither fixes a bug nor adds a feature.
- `[Docs]`: Documentation only changes.
- `[Chore]`: Changes to the build process or auxiliary tools.

**Examples:**

- `[Feature] Add speaker profile page`
- `[Fix] Correct navigation link on mobile`
- `[Docs] Update README with deployment instructions`

## 👁️ Preview

To preview the production build locally before deploying:

1.  **Build the project:**

    ```bash
    npm run build
    ```

2.  **Preview the build:**
    ```bash
    npm run preview
    ```
    This will serve the built application from the `dist` folder, allowing you to verify exactly what will be deployed.
