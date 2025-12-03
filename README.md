## React Star Wars Explorer

This project is a small React single-page application that consumes the Star Wars API (`https://swapi.dev`) to display people, planets, films, species, vehicles, and starships with list and detail pages.

### Prerequisites

- **Node.js**: **v16.x** (recommended)
  - You can verify your version with:

```bash
node -v
```

If your version is higher than 16 and you run into issues, use a Node version manager (like `nvm`) to switch to Node 16.

### Install dependencies

From the project root (where `package.json` is located), run:

```bash
npm install
```

### Run the project in development

```bash
npm start
```

- The app will start on `http://localhost:3000/`.
- The main pages are available from the top navigation (People, Planets, Films, Species, Vehicles, Starships).

### Build for production

To create an optimized production build:

```bash
npm run build
```

This will generate a `build` folder that you can deploy to a static hosting service (e.g. Vercel, Netlify, GitHub Pages, etc.).

### Running a local preview of the build (optional)

If you want to serve the build locally for testing, you can use a simple static server, for example:

```bash
npm install -g serve
serve -s build
```

Then open the URL printed in the terminal (usually `http://localhost:3000` or `http://localhost:5000`).

# React Code Challenge

Requirements

- NodeJS
- VSCode
- Git



- run
    - `npm install`
    - `npm start`

