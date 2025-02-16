import { defineAsyncComponent, h } from 'vue'
import { Spin } from '/rend/components'

export default defineAsyncComponent({
	loader: () => import('./index.vue'),
	loadingComponent: h(Spin, { center: true })
})
