# Mom's Birthday Site 🎉

A tiny one-page site, built with [Vite](https://vitejs.dev/) (plain HTML/CSS/JS, no framework needed).

## Setup (first time only)

1. Open this folder in VS Code.
2. Open a terminal in VS Code (Terminal → New Terminal) and run:
   ```
   npm install
   ```

## Working on it locally

```
npm run dev
```
This opens a local preview at `http://localhost:5173` that live-updates as you edit files.

## Adding your artwork

Drop any image files into `public/artwork/`. Reference them in `index.html` like:
```html
<img src="/artwork/your-file-name.png" alt="description" />
```
(No need to write `/public/` in the path — Vite serves that folder's contents directly from the site root.)

## Before deploying: two things to change

1. **`vite.config.js`** — replace `'/REPO-NAME/'` with your actual GitHub repo name (e.g. `'/moms-birthday/'`).
2. **`package.json`** — replace the `homepage` field's placeholder username/repo with your real GitHub username and repo name.

## Pushing to GitHub + deploying

1. Create a new repo on GitHub (don't initialize it with a README).
2. In this project folder's terminal:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
   git push -u origin main
   ```
3. Install the deploy dependency and push the built site to GitHub Pages:
   ```
   npm install
   npm run deploy
   ```
4. On GitHub, go to your repo's **Settings → Pages**, and under "Branch," select `gh-pages` (this branch gets created automatically the first time you run `npm run deploy`).
5. Your site will be live at the URL in your `package.json`'s `homepage` field within a minute or two.

## Making changes after it's live

Any time you want to update the site:
```
npm run deploy
```
That's it — it rebuilds and re-publishes automatically.
