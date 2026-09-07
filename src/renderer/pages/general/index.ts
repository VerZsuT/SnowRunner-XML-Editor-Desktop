import { createPinia } from 'pinia'
import { createApp } from 'vue'

await prepareApp()
await runApp()

async function runApp() {
	const General = (await import('./general/general.vue')).default

	createApp(General)
		.use(createPinia())
  	.mount('#main')
}

async function prepareApp() {
	const { registerDI } = await import('@utilities/di/renderer/registration')
	const { Template } = await import('@renderer/template-script')

	await registerDI()
	new Template().init()
}
