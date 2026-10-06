# Manager — menú del admin panel

Sección **MANAGER** del sidebar. Replica, en React, un subconjunto de las tools del Manager Blade del Admin-Panel-API. Contrato y reglas de campos: [Admin-Panel-API/readme_manager_front.md](../Admin-Panel-API/readme_manager_front.md).

El menú solo aparece si el departamento del usuario tiene el módulo llamado **Manager**. Los módulos viajan en el token del login: después de asignarlo en Departments hay que cerrar sesión y volver a entrar.

---

## Tabla de contenidos

- [Rutas](#rutas)
- [Qué puede hacer cada pantalla](#qué-puede-hacer-cada-pantalla)
- [Copiar meta tag en Page URLs](#copiar-meta-tag-en-page-urls)
- [Menú que recuerda si está abierto](#menú-que-recuerda-si-está-abierto)
- [Código](#código)

---

## Rutas

Definidas en `src/Utils/Routes/ManagerRoutes/index.js` y montadas en `ContentRoutes` con `path="/manager"`.

| Pantalla | Ruta |
|----------|------|
| Page URLs | `/manager/page-urls` |
| Pricing Option Details | `/manager/pricing-option-details` |
| Charter Types | `/manager/charter-types` |
| Charter Types Fishing | `/manager/charter-types-fishing` |
| Airport Transfers | `/manager/airport-transfers` |
| Formulario AT | `/manager/airport-transfers/:webCode/:type` |
| Related Tours | `/manager/related-tours` |

Cliente HTTP: `src/Utils/API/Manager/index.js` → `{API_URL}/manager/...` con el Bearer de Sanctum.

---

## Qué puede hacer cada pantalla

No hay eliminar en ninguna.

| Pantalla | Uso |
|----------|-----|
| Page URLs | Buscar por URL y copiar el data-id. El formulario de alta está siempre visible (website, page type, page name, page url). Al crear muestra el data-id nuevo. |
| Pricing Option Details | Solo crear. Tour type (activos e inactivos) y pricing option son selectores. Campos: Option Name, Singular Option Name, SKU code, Add-on type, Position. Add-on type por defecto es No Addon/No Upgrade (`null`); Addon `1`, Upgrade `2`, Available for Both `3`. Muestra el id nuevo. |
| Charter Types | Solo crear. Campo Name. `charter_types` no tiene nombre en español. Muestra el id nuevo. |
| Charter Types Fishing | Solo crear. Name y Name (Spanish). Muestra el id nuevo. |
| Airport Transfers | Lista de formularios (web code + Shared/Private). Dentro: tablas de hoteles y aerolíneas con alta y edición, y botón Clear cache. Zonas Cozumel solo cuando el formulario es de Cozumel. |
| Related Tours | Buscar el tour ancla, elegir relacionados, ver el preview y guardar. Guardar sincroniza el cluster completo: lo que se quite de la selección se desvincula y se encola la regeneración de HTML. |

---

## Copiar meta tag en Page URLs

Junto al data-id (en la búsqueda y en el alta) hay un icono `mdi-content-copy`. El tooltip dice **Copy Meta Tag**. Al portapapeles va, con salto de línea:

```html
<meta id="x_info" data-id="[page_urls.id]" data-type="[page_type_id]">
<meta name="page-type" content="[page_type en minúsculas]" id="x_info_pagetype">
```

El clic sobre el número del data-id sigue copiando solo el id.

---

## Menú que recuerda si está abierto

`Sidebar.js` guarda en `sessionStorage` la clave `sidebar-open-sections` los `data-menu-section` que estén abiertos (`manage`, `manager`). Al cambiar de página el sidebar se vuelve a montar y restaura esas secciones **antes** de iniciar MetisMenu.

Si no hay una sección elegida (clave ausente, valor inválido o ninguna de las dos abierta), abre MANAGE. Si el usuario dejó MANAGE o MANAGER abierto, se respeta esa elección.

---

## Código

| Pieza | Ubicación |
|-------|-----------|
| Menú | `src/Components/Layout/Sidebar.js` |
| Rutas | `src/Utils/Routes/ManagerRoutes/index.js` |
| Pantallas | `src/Pages/Manager/` |
| Chrome, copiar id, errores | `src/Pages/Manager/managerUi.js` |
| API | `src/Utils/API/Manager/index.js` |
