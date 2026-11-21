import { ErrorBoundary } from '@renderer/components/error-boundary'
import { createRoot } from 'react-dom/client'

await prepareApp()
await runApp()

async function runApp() {
	const { General } = await import('./general/general')
	const container = document.getElementById('main')

	if (!container) {
		throw new Error('Container #main was not found')
	}

	createRoot(container).render(
		<ErrorBoundary>
			<General />
		</ErrorBoundary>
	)
}

async function prepareApp() {
	const { registerDI } = await import('@utilities/di/renderer/registration')
	const { Template } = await import('@renderer/template-script')

	await registerDI()
	new Template().init()
}
