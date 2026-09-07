import { publishMain } from '@utilities/bridge/main/publisher'
import { registerDI } from '@utilities/di/main/registration'

await registerDI()
await publishMain()
void runProgram()

/** Запустить программу. */
async function runProgram() {
	const { Program } = await import('./program')

	await new Program().init()
}
