import { di } from '@utilities/di/container'
import { FS_TOKEN } from '@utilities/di/renderer/tokens'
import { afterEach, beforeEach } from 'vitest'
import { NodeFs } from './node-fs'

// Тесты без DOM: jsdom не нужен, поэтому окружение не поднимается вовсе.
beforeEach(() => {
	di.register(FS_TOKEN, new NodeFs())
})

afterEach(() => {
	di.clear()
})
