const { writeFileSync, readFileSync } = require('fs')
const { join } = require('path')
const { argv } = require('process')


const configPath = join(__dirname, '../src/app/config.json')
const config = JSON.parse(readFileSync(configPath))
config.arch = argv[2]

writeFileSync(configPath, JSON.stringify(config, null, '\t'))
