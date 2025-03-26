/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../routes/index'
import { MaskInput } from 'vue-3-mask'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(router)
  app.component('MaskInput', MaskInput)
  app.use(vuetify)
}
