# Pedix Modular (Demo)

Aplicación web tipo "Pedix" para un negocio propio (inicia como óptica), diseñada para ser **modular y adaptable** según el tipo de negocio.

## Qué hace

- Cambia nombre del negocio y tipo (óptica, cafetería, farmacia, ropa u otro).
- Activa/desactiva módulos funcionales (inventario, citas, ventas, clientes, reportes, e-commerce).
- Actualiza el dashboard en tiempo real según los módulos elegidos.
- Guarda la configuración del usuario en `localStorage`.

## Ejecutar local

### Opción 1: servidor rápido con Python

```bash
python3 -m http.server 8080
```

Abre `http://localhost:8080`.

### Opción 2: Docker (listo para despliegue)

```bash
docker build -t pedix-modular .
docker run --rm -p 8080:80 pedix-modular
```

Abre `http://localhost:8080`.

## Despliegue

### Vercel

Este repo ya incluye `vercel.json`. Puedes desplegar con:

```bash
npm i -g vercel
vercel --prod
```

### Netlify

Este repo ya incluye `netlify.toml`. Puedes desplegar:

- arrastrando la carpeta al panel de Netlify, o
- conectando el repositorio en Netlify (sin comando de build, publish `.`).

## Estructura

- `index.html`: interfaz.
- `styles.css`: estilos.
- `app.js`: lógica modular y persistencia.
- `Dockerfile`: imagen nginx para despliegue.
- `vercel.json`: configuración para Vercel.
- `netlify.toml`: configuración para Netlify.


## Despliegue automático en Netlify (GitHub Actions)

Ya quedó agregado el workflow en `.github/workflows/netlify-deploy.yml`.

1. En Netlify, crea un sitio y copia su **Site ID**.
2. En GitHub > Settings > Secrets and variables > Actions, crea:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`
3. Haz push a la rama `work` (o ejecuta el workflow manualmente).

Con eso, Netlify se despliega automáticamente en cada push.
