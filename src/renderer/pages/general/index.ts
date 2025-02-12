import { createPinia } from 'pinia'
import { createApp } from 'vue'
import General from './general'

createApp(General)
  .use(createPinia())
  .mount('#main')
