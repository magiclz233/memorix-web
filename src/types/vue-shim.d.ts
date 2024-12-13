declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vuetify/lib'
declare module 'vuetify/components'
declare module 'vuetify/directives'
declare module 'vuetify/iconsets/mdi'
declare module '@mdi/font/css/materialdesignicons.css'
declare module 'vuetify/styles' 