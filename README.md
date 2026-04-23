## Aplicación de ejemplo para una migración de una app vuejs 2 a vuejs 3 utilizando el composition API

## Arranque inicial
```bash
npm install
npm run serve
```
Acceder a http://localhost:8080/ para ver la aplicación en funcionamiento.

## Paso de migración: Vuex 3 -> Vuex 4

El store se ha preparado para convivir durante la transición:

- Si el proyecto usa **Vuex 3**, se inicializa con `new Vuex.Store(...)` y `Vue.use(Vuex)`.
- Si el proyecto pasa a **Vuex 4**, detecta `Vuex.createStore(...)` y usa automáticamente esa API.

Esto permite mantener el código del dominio del store (`state`, `mutations`, `actions`) sin cambios mientras se migra el resto de la app a Vue 3 + `@vue/compat`.
