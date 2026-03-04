# Website Stones - Component Library Setup

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the library:**
   ```bash
   npm run build
   ```

   Or for development with watch mode:
   ```bash
   npm run dev
   ```

3. **Type check:**
   ```bash
   npm run type-check
   ```

## Package Structure

```
website-stones/
├── src/
│   ├── components/          # Component implementations
│   │   └── ExampleCard/     # Example component
│   ├── lib/                 # Utilities
│   │   └── utils.ts        # cn() helper
│   ├── styles.css          # Tailwind CSS
│   └── index.ts            # Public API exports
├── dist/                    # Built output (gitignored)
├── package.json
├── tsconfig.json
└── tsup.config.ts          # Build configuration
```

## Adding Components

1. Create component folder: `src/components/YourComponent/`
2. Create `YourComponent.tsx`
3. Create `index.ts` to export the component
4. Export from `src/index.ts`:
   ```ts
   export { YourComponent } from './components/YourComponent';
   ```
5. Build: `npm run build`

## Usage in Frontend

```tsx
import { ExampleCard } from '@website/stones';
import '@website/stones/styles';
```

## Build Output

The build generates:
- `dist/index.js` - ES module bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/styles.css` - Compiled CSS

## Development Workflow

1. Make changes in `src/`
2. Run `npm run dev` to watch and rebuild
3. Frontend will pick up changes automatically (via file dependency link)

