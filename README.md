# Atomize UI React

React component library styled with Tailwind.

## Installation

```bash
npm install atomize-ui-react
```

Peer deps (in your app):

```bash
npm install react react-dom
```

## Usage

```tsx
import 'atomize-ui-react/style.css';
import { Button, Input } from 'atomize-ui-react';

export function App() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Button variant="secondary" size="lg">
        Hello
      </Button>
      <Input placeholder="Type something" />
    </div>
  );
}
```

## Scripts

```bash
npm run dev     # development server
npm run build   # build the library
npm run preview # preview build output
npm run lint    # run linter
```

## Notes

- Ships ESM/CJS and TypeScript types.
- CSS available via subpath: `atomize-ui-react/style.css`.
