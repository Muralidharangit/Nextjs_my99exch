import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Plain <img> keeps the designed sizes, object-fit crops and lazy loading exactly;
      // flags come from flagcdn.com. See README "Images".
      '@next/next/no-img-element': 'off'
    }
  },
  globalIgnores(['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**'])
]);
