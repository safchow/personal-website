# Website Stones

Reusable component library for website applications.

## Overview

`@website/stones` is a component library built on top of Radix UI and Tailwind CSS. It provides reusable, accessible components that can be used across website applications.

**Contains:**
- shadcn/ui base components (`Button`, `Card`, etc.)
- All component utilities and styles

## Usage

```tsx
import { Button, ExampleCard } from '@website/stones';
import '@website/stones/styles';
```

## Development


### Adding shadcn/ui Components

```bash
# From website-stones directory
cd website-stones
npx shadcn@latest add [component-name]
```

Components will be added to `src/components/ui/` automatically.

**Note:** Make sure to export new components from `src/index.ts` after adding them.

### Adding Custom Components

1. Create component in `src/components/YourComponent/`
2. Export from `src/index.ts`
3. Build: `npm run build`

## Project Structure

```
website-stones/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Custom components
│   ├── lib/              # Utilities (cn, etc.)
│   ├── styles.css        # Tailwind CSS + CSS variables
│   └── index.ts          # Public API exports
├── components.json       # shadcn/ui configuration
└── package.json
```

## Build Output

The build generates:
- `dist/index.js` - ES module bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/styles.css` - Compiled CSS

## Development Workflow

1. Make changes in `src/`
2. Frontend automatically picks up changes (watches `dist/` folder)
3. No manual rebuilds needed during development

## Related Documentation

- [Main README](../../README.md) - Repo-wide setup and prerequisites
- [Frontend Package](../website-frontend/README.md) - Usage examples


