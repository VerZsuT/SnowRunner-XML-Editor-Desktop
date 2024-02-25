import { createPinia } from 'pinia'
import { createApp } from 'vue'

import Main from './main'

createApp(Main)
  .use(createPinia())
  .mount('#main')
