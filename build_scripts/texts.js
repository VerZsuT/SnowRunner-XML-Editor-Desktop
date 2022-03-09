const { existsSync, writeFileSync, readFileSync, rmSync } = require('fs')
const { join } = require('path')
const translate = require('translate')

f()

function f() {
    const arg1 = process.argv[2]
    const arg2 = process.argv[3]
    const arg3 = process.argv[4]
    const arg4 = process.argv[5]

    const pathToTexts = join(__dirname, '../src/main/texts/')

    let RUFile = join(pathToTexts, 'RU', `${arg1}.json`)
    let ENFile = join(pathToTexts, 'EN', `${arg1}.json`)
    let DEFile = join(pathToTexts, 'DE', `${arg1}.json`)

    const pathToIndex = join(pathToTexts, 'index.ts')
    let indexData = readFileSync(pathToIndex).toString()

    if (arg1 === 'add') {
        const fileName = `${arg2}.json`

        RUFile = join(pathToTexts, 'RU', fileName)
        ENFile = join(pathToTexts, 'EN', fileName)
        DEFile = join(pathToTexts, 'DE', fileName)
        if (!existsSync(RUFile)) {
            writeFiles('{}')
            console.log(`File '${fileName}' successfilly added.`)
        }
        else {
            console.log(`File '${fileName}' is already exists.`)
        }
        return
    }
    else if (arg1 === 'remove') {
        const fileName = `${arg2}.json`

        RUFile = join(pathToTexts, 'RU', fileName)
        ENFile = join(pathToTexts, 'EN', fileName)
        DEFile = join(pathToTexts, 'DE', fileName)

        const data = JSON.parse(readFileSync(RUFile).toString())
        for (const key in data) {
            indexData = indexData.replace(`\t${key}: string\n`, '')
        }
        writeIndex()

        if (!existsSync(RUFile)) {
            console.log(`File '${fileName}' not found.`)
            return
        }

        rmSync(RUFile, { force: true })
        rmSync(ENFile, { force: true })
        rmSync(DEFile, { force: true })

        console.log(`File '${fileName}' successfilly removed.`)
        return
    }

    if (!existsSync(RUFile)) {
        console.log(`File '${arg1}.json' no found.`)
        return
    }

    const RUData = JSON.parse(readFileSync(RUFile).toString())
    const ENData = JSON.parse(readFileSync(ENFile).toString())
    const DEData = JSON.parse(readFileSync(DEFile).toString())

    function writeFiles(data = null) {
        writeFileSync(RUFile, data || JSON.stringify(RUData, null, '\t'))
        writeFileSync(ENFile, data || JSON.stringify(ENData, null, '\t'))
        writeFileSync(DEFile, data || JSON.stringify(DEData, null, '\t'))
    }

    function writeIndex() {
        writeFileSync(pathToIndex, indexData)
    }

    async function addToData(key, value) {
        RUData[key] = value
        ENData[key] = await translate(value, {
            from: 'ru',
            to: 'en'
        })
        DEData[key] = await translate(value, {
            from: 'ru',
            to: 'de'
        })
    }

    if (arg2 === 'add') {
        const key = arg3.toUpperCase().split(' ').join('_')
        const value = arg4
        const fileName = `${arg1}.json`

        addToData(key, value).then(() => {
            writeFiles()

            if (!indexData.includes(`${key}: string`)) {
                indexData = indexData.replace('export interface ITexts {\n', `export interface ITexts {\n\t${key}: string\n`)
                writeIndex()
            }
            console.log(`Property '${key}: "${value}"' successfully added to file '${fileName}'`)
        })
    }
    else if (arg2 === 'remove') {
        const key = arg3.toUpperCase().split(' ').join('_')
        const fileName = arg1

        delete RUData[key]
        delete ENData[key]
        delete DEData[key]
        writeFiles()

        indexData = indexData.replace(`\t${key}: string\n`, '')
        writeIndex()
        console.log(`Key '${key}' successfully removed from file '${fileName}'`)
    }
}
