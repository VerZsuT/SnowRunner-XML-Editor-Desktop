import Spin from '@renderer/components/spin.vue'
import { defineAsyncComponent, h } from 'vue'

export const Editor = defineAsyncComponent({
	loader: () => import('./editor.vue'),
	loadingComponent: h(Spin, { center: true })
})
