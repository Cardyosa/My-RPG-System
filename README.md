# My RPG System — Anime Creator Layout Update

This package restyles the full RPG website to match the supplied reference layout:
- compact top navigation with level / XP / currency HUD
- vertical E through SSS rank ladder
- large moonlit hunter portrait
- central appearance controls
- right-side hairstyle grid, hair-color swatches and transformation effects
- responsive layout for smaller screens

## Replace files in GitHub

Upload these files to the **repository root** and replace existing files:
- `index.html`
- `style.css`
- `game.js`
- `hunter-form-1.webp`
- `hunter-form-2.webp`
- `hunter-form-3.webp`

The three WebP artwork files belong beside `index.html` (not inside an `assets` folder). This matches the current repository's root-level image layout.

Commit directly to `main`. Wait for GitHub Pages to deploy, then open the site and press `Ctrl + F5`.

## Progress preservation

The existing `levelingUpSave` localStorage key is retained. The code merges appearance settings into the current save and does not intentionally reset level, XP, coins, completed quests, streaks, or attributes. The rank ladder now includes E, D, C, B, A, S, SS and SSS tiers.

## Important artwork note

The current hunter illustrations are reused as the character artwork and hairstyle preview tiles. The controls and visual treatments are interactive, but this update does not create individually layered 3D hair, clothing, facial features or weapons.
