import { defineAsyncComponent } from 'vue'

export const Settings = defineAsyncComponent(() => import('./index.vue'))
