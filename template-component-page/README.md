# Component Page Template (Apple Pro Edition)

Use this template folder to create premium, interactive individual component pages or duplicate the component page architecture into other projects.

## Included Files

- `page.tsx`: Route page setting up SEO metadata (`componentPageMetadata`), `JsonLd`, and rendering `demo.tsx`.
- `demo.tsx`: Client-side preview wrapper component with interactive state controls.
- `sample-component.tsx`: Apple Pro UI primitive featuring squircle glassmorphism, spring physics (`motion/react`), `cn()` prop merging, `data-slot="root"`, and `prefers-reduced-motion` compliance.
- `components-entry.ts`: Full metadata entry for `lib/components.ts`.
- `registry-entry.json`: Registry JSON schema definition for shadcn CLI installation.

## How to Duplicate in Next.js (App Router)

1. Copy this entire folder into your project under `app/components/(docs)/<your-component-name>`.
2. Move `sample-component.tsx` to `components/ui/<your-component-name>.tsx` and update implementation details.
3. Update `HREF` in `page.tsx` to match your target route path.
4. Add the component entry metadata from `components-entry.ts` into `lib/components.ts`.
5. Add the item to `registry.json` using `registry-entry.json`, then run `npm run registry:build`.
