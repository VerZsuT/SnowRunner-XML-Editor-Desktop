import Spin from '@renderer/components/spin.vue'
import { defineAsyncComponent, h } from 'vue'

export const Lists = defineAsyncComponent({
	loader: () => import('./lists.vue'),
	loadingComponent: h(Spin, { center: true })
})
