import { Spin } from '@renderer/components'
import { defineAsyncComponent, h } from 'vue'

export default defineAsyncComponent({
	loader: () => import('./index.vue'),
	loadingComponent: h(Spin, { center: true })
})
