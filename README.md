# Portafolio CQ (React + Vite + TS)

Sitio personal construido con React 18, TypeScript y Vite 5, estilado con Tailwind CSS.

## Scripts
- `npm run dev`: sirve en desarrollo
- `npm run build`: compila a `dist/`
- `npm run preview`: sirve el build local
- `npm run lint`: ESLint
- `npm run typecheck`: TypeScript sin emitir
- `npm test`: Vitest + Testing Library

## Requisitos
- Node 18.x (recomendado). El proyecto incluye:
  - `engines.node = 18.x` en `package.json`
  - `.nvmrc` con `18`
  - Netlify usa Node 18.20.1 vía `netlify.toml`

## Deploy en Netlify
1. Conecta el repo (GitHub) en Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Node: queda fijado a 18.20.1 por `netlify.toml`.
5. SPA redirect ya configurado en `netlify.toml`:
   ```toml
   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```

### Si el build falla por Rollup con Node 20
- Síntoma: Error al requerir `@rollup/rollup-linux-x64-gnu`.
- Causa: bug de npm 10 con optional-dependencies en Node 20.
- Solución: usar Node 18 (ya configurado). Si persiste:
  - Netlify → Site settings → Build & deploy → Clear cache and deploy site.
  - Verifica en logs del build la salida previa del `prebuild`:
    - `node -v` debe mostrar v18.x
    - `npm -v` debe mostrar 9.x

## Desarrollo local (Windows PowerShell)
```powershell
# Instalar dependencias
npm install

# Correr en dev
npm run dev

# Ejecutar suite de calidad
npm run -s lint
npm run -s typecheck
npm test --silent -- --watchAll=false
npm run -s build
```

## CI
Se ejecuta GitHub Actions (workflow `CI`) con Node 18: lint, typecheck, tests y build en cada push/PR a `main`.