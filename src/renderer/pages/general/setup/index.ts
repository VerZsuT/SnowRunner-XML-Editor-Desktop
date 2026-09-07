import Spin from '@renderer/components/spin.vue'
import { defineAsyncComponent, h } from 'vue'

export const Setup = defineAsyncComponent({
	loader: () => import('./setup.vue'),
	loadingComponent: h(Spin, { center: true })
})
