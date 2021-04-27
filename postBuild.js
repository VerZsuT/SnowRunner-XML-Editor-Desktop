const { execSync } = require('child_process')
const { createHash } = require('crypto')
const { renameSync, unlinkSync, readdirSync, statSync, readFileSync, writeFileSync, rmdirSync, copyFile } = require('fs')
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

console.log('[POST_BUILD][STAGE_1]: Renaming x86...')
renameSync(paths.x86, paths.x86_renamed)
console.log('[POST_BUILD][STAGE_1]: Success.')
console.log('[POST_BUILD][STAGE_1]: Renaming x64...')
renameSync(paths.x64, paths.x64_renamed)
console.log('[POST_BUILD][STAGE_1]: Success.')

console.log('[POST_BUILD][LOG]................')

console.log('[POST_BUILD][STAGE_2]: Archiving x86...')
execSync(`WinRAR a -ibck -ep1 -m5 "${join(paths.out, 'SnowRunnerXMLEditor_x86.rar')}" "${paths.x86_renamed}"`, {
    cwd: paths.winrar
})
console.log('[POST_BUILD][STAGE_2]: Success.')
console.log('[POST_BUILD][STAGE_2]: Archiving x64...')
execSync(`WinRAR a -ibck -ep1 -m5 "${join(paths.out, 'SnowRunnerXMLEditor_x64.rar')}" "${paths.x64_renamed}"`, {
    cwd: paths.winrar
})
console.log('[POST_BUILD][STAGE_2]: Success.')

console.log('[POST_BUILD][LOG]................')

console.log('[POST_BUILD][STAGE_3]: Adding files for auto update...')
rmdirSync(join(paths.docs, 'update'), {recursive: true})
renameSync(join(paths.x86_renamed, 'resources', 'app'), join(paths.docs, 'update'))
console.log('[POST_BUILD][STAGE_3]: Success.')
console.log('[POST_BUILD][STAGE_3]: Generating files map for auto update...')
writeFileSync(join(paths.docs, 'updateMap.json'), JSON.stringify(generateMap(join(paths.x64_renamed, 'resources', 'app'))))
console.log('[POST_BUILD][STAGE_3]: Success.')

console.log('[POST_BUILD][LOG]: Success.')

function generateMap(rootPath) {
    let map = {}
    const items = readdirSync(rootPath)
    for (const item of items) {
        const path = join(rootPath, item)
        const stats = statSync(path)

        if (!stats.isFile()) {
            map = Object.assign(map, generateMap(path))
        } else {
            const shaHash = createHash('sha1')
            shaHash.update(readFileSync(path).toString())
            map[path.replace(join(paths.x64_renamed, 'resources', 'app', '/'), '')] = shaHash.digest('hex').toString()
        }
    }
    return map
}