# silhouette

A React Native mobile app that removes the background from a photo, then lets you fine-tune the cutout
on a Skia canvas — paint the mask with a brush, undo/redo, adjust stroke width, and share the result.

## Features

- **One-tap background removal** on a picked photo (PhotoRoom segmentation API).
- **Mask editor on a Skia canvas** — brush-paint the cutout, undo/redo, adjustable stroke width.
- **Share** the finished cutout; on-device file handling.

## How it works

- **Home screen:** pick an image (`expo-image-picker`) → send to PhotoRoom's `/v1/segment` API → get the
  cut-out image.
- **Editor screen:** load the result onto a `@shopify/react-native-skia` canvas; gesture-driven brush
  paints/erases the mask (reanimated + gesture-handler), with an undo/redo stack and a stroke-width
  slider; export and share.

## Tech stack

Expo 51 · React Native 0.73 · `@shopify/react-native-skia` · react-native-reanimated + gesture-handler ·
`@gluestack-ui` · expo-image-picker / file-system / sharing. Segmentation via the PhotoRoom API.

## Getting started

```bash
npm install
# set your PhotoRoom key:
export EXPO_PUBLIC_API_KEY=...        # or in .env
npx expo start
```

## Project structure

```
silhouette/
├── App.tsx
├── pages/      # Home (pick + remove bg) and Editor (Skia mask editor)
├── helpers/    # segmentation call + canvas/mask logic
├── types/
└── assets/
```

## Roadmap

- Reduce dependence on the paid PhotoRoom API (evaluate an on-device segmentation model).
- Batch processing, export presets, and optional accounts/history.
