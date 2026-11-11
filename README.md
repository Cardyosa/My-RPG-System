# My RPG System — Anime Character Creator Upgrade

## What's included
- `index.html`, `style.css`, `game.js`
- `assets/hunter-form-1.webp` through `assets/hunter-form-3.webp`

## Install on GitHub Pages
1. Extract this ZIP.
2. In the repository root, replace `index.html`, `style.css`, and `game.js`.
3. Upload the entire `assets` folder (with all three WebP files) to the repository root.
4. Commit directly to `main`.
5. Wait for GitHub Pages to deploy, then hard-refresh the site (Ctrl+F5).

## Progress preservation
The updated `game.js` keeps the existing `levelingUpSave` localStorage key and merges new appearance fields into the existing save. It does not reset level, XP, coins, quests, streaks, or attributes.

## Notes
The new character preview uses generated anime hunter artwork. Hairstyle selection swaps among three artwork variants; outfit choices apply visual styling; transformation choices change the aura effect. Some fine-grained options (such as exact facial anatomy or weapon geometry) are visual presets rather than fully separated 3D equipment layers.
