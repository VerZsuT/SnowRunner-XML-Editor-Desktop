const { execSync } = require('child_process')
const { renameSync, unlinkSync } = require('fs')
const { join } = require('path')

const paths = {
    out: join(__dirname, 'out'),
    x86: join(__dirname, 'out', 'SnowRunner XML Editor-win32-ia32'),
    x86_renamed: join(__dirname, 'out', 'SnowRunnerXMLEditor_x86'),
    x64: join(__dirname, 'out', 'SnowRunner XML Editor-win32-x64'),
    x64_renamed: join(__dirname, 'out', 'SnowRunnerXMLEditor_x64'),
    winrar: join(__dirname, 'src', 'scripts', 'winrar'),
    docs: join(__dirname, 'docs')
}

console.log('[POST_BUILD][LOG]: Processing post build...')

console.log('[POST_BUILD][STAGE_1]: Renaming builds...')
renameSync(paths.x86, paths.x86_renamed)
console.log('[POST_BUILD][STAGE_1]: x86 renamed.')
renameSync(paths.x64, paths.x64_renamed)
console.log('[POST_BUILD][STAGE_1]: x64 renamed.')
console.log('[POST_BUILD][STAGE_1]: Builds renamed.')

console.log('[POST_BUILD][STAGE_2]: Archiving builds...')
console.log('[POST_BUILD][STAGE_2]: Archiving x86...')
execSync(`WinRAR a -ibck -ep1 -m5 "${join(paths.out, 'SnowRunnerXMLEditor_x86.rar')}" "${paths.x86_renamed}"`, {
    cwd: paths.winrar
})
console.log('[POST_BUILD][STAGE_2]: x86 archived.')

console.log('[POST_BUILD][STAGE_3]: Archiving x64...')
execSync(`WinRAR a -ibck -ep1 -m5 "${join(paths.out, 'SnowRunnerXMLEditor_x64.rar')}" "${paths.x64_renamed}"`, {
    cwd: paths.winrar
})
console.log('[POST_BUILD][STAGE_3]: x64 archived.')
console.log('[POST_BUILD][STAGE_2]: Builds archived.')

console.log('[POST_BUILD][STAGE_4]: Archiving files to auto update...')
unlinkSync(join(paths.docs, 'update.zip'))
execSync(`WinRAR a -ibck -ep1 -m5 "${join(paths.docs, 'update.zip')}" "${join(paths.x64_renamed, 'resources', 'app')}"`, {
    cwd: paths.winrar
})
console.log('[POST_BUILD][STAGE_4]: Files to auto update archived.')

console.log('[POST_BUILD][LOG]: Success.')
