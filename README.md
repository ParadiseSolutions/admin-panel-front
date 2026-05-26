# Admin Panel Front

Panel de administración web para **Adventure Station** (Paradise Solutions). Desde aquí se gestionan tours, proveedores, operadores, catálogo, usuarios, permisos y configuración comercial.

Este documento está pensado para que un desarrollador nuevo pueda entender el proyecto, levantarlo en local y saber dónde tocar el código.

---

## Tabla de contenidos

- [Requisitos](#requisitos)
- [Inicio rápido](#inicio-rápido)
- [Qué hace esta aplicación](#qué-hace-esta-aplicación)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo funciona por dentro](#cómo-funciona-por-dentro)
- [Módulos principales](#módulos-principales)
- [Guía para desarrollar](#guía-para-desarrollar)
- [API y autenticación](#api-y-autenticación)
- [Estilos y UI](#estilos-y-ui)
- [Problemas frecuentes](#problemas-frecuentes)
- [Comandos útiles](#comandos-útiles)

---

## Requisitos

| Herramienta | Versión recomendada |
|-------------|-------------------|
| Node.js     | 16.x o 18.x (LTS) |
| npm         | 8+                |

El proyecto usa **Create React App** (`react-scripts` 5) con **React 17**.

---

## Inicio rápido

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd admin-panel-front

# 2. Instalar dependencias
npm install

# 3. Arrancar en modo desarrollo
npm start
```

La app se abre en [http://localhost:3000](http://localhost:3000).

Por defecto las peticiones van al API de producción (`api.paradisesolutions.com`). Necesitarás credenciales válidas para iniciar sesión. Si tu equipo usa un backend local, revisa la sección [API y autenticación](#api-y-autenticación).

---

## Qué hace esta aplicación

Es un **CRM / backoffice de turismo** con estas áreas de negocio:

- **Tours** — catálogo, precios, temporadas, horarios, addons, publicación web (módulo más grande).
- **Providers** — proveedores, contactos, métodos de pago, políticas operativas.
- **Operators** — operadores turísticos.
- **Catálogo** — categorías, tipos de tour, ubicaciones, websites.
- **Comercial** — carritos de compra, tipos de pago.
- **Administración** — usuarios, roles, departamentos y permisos por módulo.

El menú lateral solo muestra las secciones a las que el usuario tiene acceso según sus **módulos** asignados.

---

## Estructura del proyecto

```
admin-panel-front/
├── public/                 # HTML estático, favicon, manifest
├── src/
│   ├── index.js            # Entrada: Redux, Router, estilos globales
│   ├── App.js              # Monta el árbol de rutas principal
│   │
│   ├── Components/
│   │   ├── Layout/         # Header, Sidebar, Layout (shell autenticado)
│   │   ├── Common/         # Modales, tablas, componentes reutilizables
│   │   └── Assets/         # SCSS, imágenes, fuentes
│   │
│   ├── Pages/              # Pantallas por dominio (Tours, Providers, Users…)
│   │
│   └── Utils/
│       ├── API/            # Llamadas HTTP (Axios) por recurso
│       ├── Redux/          # Store, actions, reducers, types
│       ├── Routes/         # Definición de rutas públicas y privadas
│       └── CommonFunctions/
│
├── package.json
└── README.md
```

### Convención de carpetas por módulo

Cada dominio de negocio suele seguir este patrón:

| Ubicación | Rol |
|-----------|-----|
| `Pages/<Modulo>/index.js` | Listado principal |
| `Pages/<Modulo>/new*.js` | Crear registro |
| `Pages/<Modulo>/edit*.js` o `/:id` | Editar registro |
| `Pages/<Modulo>/*Cols.js` | Columnas de tablas |
| `Utils/Routes/<Modulo>Routes/` | Rutas del módulo |
| `Utils/API/<Modulo>/` | Endpoints Axios |
| `Utils/Redux/Actions|Reducers/<Modulo>/` | Estado global (si aplica) |

---

## Cómo funciona por dentro

### Flujo general

```
index.js
  └── Redux Provider
        └── BrowserRouter
              └── App.js → AppRoutes
                    ├── Rutas públicas  → /login, /forgot-password, /reset-password
                    └── Rutas privadas  → Layout + ContentRoutes (módulos)
```

### Autenticación

1. El login llama a `POST /login` y guarda la respuesta en **`localStorage`** bajo la clave `token`.
2. Ese objeto incluye el JWT y la lista de **`modules`** (permisos del usuario).
3. `PrivateRoutes` comprueba si existe `token`; si no, redirige a `/login`.
4. Tras un login correcto, la app lleva al usuario a **`/tours`** (pantalla principal de trabajo).

Archivos clave:

- `src/Pages/Auth/Login/index.js`
- `src/Utils/Routes/PrivateRoutes.js`
- `src/Utils/Routes/PublicRoutes.js`

### Rutas

| Archivo | Responsabilidad |
|---------|-----------------|
| `Utils/Routes/AppRoutes.js` | Divide público vs privado |
| `Utils/Routes/ContentRoutes.js` | Rutas autenticadas dentro del `Layout` |
| `Utils/Routes/<Modulo>Routes/` | Rutas de cada módulo (listado, new, edit) |

Ejemplo de rutas de Tours:

```
/tours       → listado
/tours/new   → crear tour
/tours/:id   → editar tour (pestañas internas)
```

### Estado global (Redux)

El store combina reducers por dominio:

`login`, `tours`, `providers`, `operators`, `users`, `roles`, `departments`, `categories`, `websites`, `tourTypes`, `carts`, `paymentTypes`, `locations`, `serviceArea`, `modules`.

- **Actions con thunk** — suelen cargar listados (ej. `toursData`, `providersData`).
- **Pantallas de edición** — muchas veces llaman a la API directamente sin pasar por Redux.

Store: `src/Utils/Redux/Store/index.js`

### Permisos en el menú

El sidebar (`Components/Layout/Sidebar.js`) filtra ítems según `userInfo.modules` y el `module_id`:

| ID | Módulo |
|----|--------|
| 1 | Users |
| 2 | Departments |
| 3 | Roles |
| 4 | Websites |
| 5 | Tour Types |
| 6 | Categories |
| 7 | Locations |
| 8 | Operators |
| 12 | Shopping Carts |
| 13 | Payment Types |
| 14 | Providers |
| 15 | Tours |

Si no ves una sección en el menú, el usuario no tiene ese módulo asignado (no es un bug del front).

---

## Módulos principales

| Ruta | Descripción | Complejidad |
|------|-------------|-------------|
| `/tours` | Gestión de tours (precios, schedules, addons, publish…) | Alta |
| `/providers` | Proveedores, pagos, operaciones | Alta |
| `/operators` | Operadores | Media |
| `/users` | Usuarios del panel | Media |
| `/roles` | Roles y permisos | Media |
| `/departments` | Departamentos y módulos | Media |
| `/categories` | Categorías | Baja |
| `/locations` | Ubicaciones | Baja |
| `/websites` | Sitios web | Baja |
| `/tour-types` | Tipos de tour | Baja |
| `/shopping-carts` | Carritos de compra | Media |
| `/payment-types` | Tipos de pago | Baja |
| `/dashboard` | Dashboard (existe ruta; el flujo principal usa `/tours`) | Baja |

Los módulos **Tours** y **Providers** concentran la mayor parte de la lógica y los modales.

---

## Guía para desarrollar

### Patrón típico de una pantalla de listado

1. Dispatch de una action Redux (thunk) en `useEffect`.
2. Leer datos con `useSelector`.
3. Renderizar tabla (`TableContainer`, `react-bootstrap-table-next`, etc.).
4. Abrir modales en `Components/Common/Modals/` para crear/editar/eliminar.
5. Confirmaciones y errores con **SweetAlert2** (`Swal`).

### Patrón típico de una pantalla de edición

1. Obtener `id` con `useParams()`.
2. Cargar datos con funciones de `Utils/API/<Modulo>/`.
3. Organizar el contenido en **tabs** (Reactstrap `Nav` + `TabContent`).
4. Guardar con `PUT`/`POST` al API según el formulario.

### Añadir un endpoint nuevo

1. Crear o extender funciones en `src/Utils/API/<Recurso>/index.js`.
2. Usar `API_URL` y `options` importados desde `src/Utils/API/index.js`.
3. Si el listado debe estar en Redux, añadir action + reducer + type.

### Añadir una ruta nueva

1. Crear la página en `src/Pages/`.
2. Crear `src/Utils/Routes/<Modulo>Routes/index.js` (o extender el existente).
3. Registrar la ruta en `ContentRoutes.js`.
4. Si aplica, añadir entrada en `Sidebar.js` con el `module_id` correcto.

### Modales

La mayoría viven en `src/Components/Common/Modals/`. Antes de crear uno nuevo, busca si ya existe algo similar (pricing, schedules, payments, bulk edit, etc.).

---

## API y autenticación

Configuración central: **`src/Utils/API/index.js`**

```javascript
export var API_URL = `https://api.paradisesolutions.com/api`;
```

El token Bearer se arma al cargar la app desde `localStorage.token` y se envía en el header `Authorization` de `options`.

### Usar backend local (opcional)

En `src/Utils/API/index.js` hay código comentado para apuntar a localhost:

```javascript
// if (window.location.href.includes("localhost")) {
//   API_URL = "http://localhost/Admin-Panel-API/api";
// }
```

Descomenta y adapta la URL según indique tu equipo. También puedes usar variables de entorno de CRA (`.env.local`) si el proyecto las adopta en el futuro:

```
REACT_APP_API_URL=http://localhost:8000/api
```

> **Nota:** Hoy la URL no usa `process.env`; cualquier cambio de entorno requiere editar `Utils/API/index.js` o implementar soporte explícito.

### “Cookies” y preferencias de UI

Las funciones `getCookie` / `setCookie` en `Utils/API/index.js` en realidad usan **`sessionStorage`** (decisión previa por límite de tamaño de cookies). Se usan para filtros y preferencias de pantalla (ej. tours activos/inactivos).

---

## Estilos y UI

- Estilos globales: `src/Components/Assets/scss/theme.scss`
- Layout basado en plantilla admin (Bootstrap 5 + Reactstrap).
- Color de marca del sidebar: `#3DC7F4`.
- Hay soporte SCSS para tema oscuro y RTL en `Components/Assets/scss/`.

**Librerías UI en uso** (conviven en el mismo proyecto):

- Reactstrap / Bootstrap 5 — layout y formularios principales
- Ant Design (`antd`) — componentes puntuales
- Material-UI v4 — componentes puntuales

Al añadir UI nueva, **reutiliza el estilo del módulo donde trabajes** para mantener coherencia visual.

---

## Problemas frecuentes

| Síntoma | Posible causa |
|---------|----------------|
| Redirige siempre a `/login` | No hay `token` en `localStorage` o está corrupto. Borra `localStorage` y vuelve a iniciar sesión. |
| No aparece un ítem del menú | El usuario no tiene el `module_id` en `token.modules`. |
| Error 401 en todas las peticiones | Token expirado o inválido. Cierra sesión y entra de nuevo. |
| Cambios en API no se reflejan | Revisa que `options` tenga el Bearer actualizado tras login (`createStorageSync`). |
| `npm start` falla por memoria | Prueba `set NODE_OPTIONS=--max-old-space-size=4096` (Windows) antes de `npm start`. |
| Puerto 3000 ocupado | CRA preguntará por otro puerto o cierra el proceso que lo use. |

---

## Comandos útiles

```bash
npm start          # Desarrollo (hot reload)
npm run build      # Build de producción → carpeta build/
npm test           # Tests (Jest + Testing Library)
```

---

## Stack de referencia

| Área | Tecnología |
|------|------------|
| UI | React 17 |
| Build | Create React App 5 |
| Routing | react-router-dom v5 |
| Estado | Redux + redux-thunk |
| HTTP | Axios |
| Formularios | Formik + Yup |
| Tablas | react-bootstrap-table-next, react-table |
| Alertas | SweetAlert2 |
| Fechas | moment |
| Estilos | SCSS + Bootstrap 5 |

---

## Próximos pasos recomendados

1. Levantar el proyecto con `npm start` e iniciar sesión con una cuenta de prueba.
2. Recorrer **`/tours`** y abrir un tour en edición para ver las pestañas.
3. Revisar **`/providers/:id`** para entender el segundo módulo más complejo.
4. Leer `Utils/Routes/ContentRoutes.js` y `Components/Layout/Sidebar.js` para ver cómo se conectan rutas y permisos.
5. Pedir al equipo acceso al repositorio del **API backend** (`Admin-Panel-API`) para entender contratos de endpoints.

---

## Contacto y convenciones

- Mensajes de error al usuario: preferir **SweetAlert2** en flujos críticos.
- Validación de formularios de auth: **Formik + Yup** (ver Login).
- Antes de un PR: probar login, navegación del módulo tocado y guardado/edición básica.

Si algo no está documentado aquí, el código fuente y los comentarios en `Utils/API` suelen ser la fuente de verdad más actualizada.
