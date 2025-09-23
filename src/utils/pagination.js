const { readdirSync, readFileSync, writeFileSync } = require('fs')

function readExoplanetData () {
  const files = readdirSync('./src/data/exoplanets')

  const data = files.map((file) => {
    const fileData = readFileSync(`./src/data/exoplanets/${file}`, 'utf-8')
    const jsonData = JSON.parse(fileData)
    return [file, jsonData.acf.st_dist, jsonData.acf.derived_description]
  })

  return data
}

function createListFile (data) {
  const pagination = data.map(([file, distance, description]) => ({
    file,
    distance,
    description
  }))

  const list = pagination.map((item) => `${item.file}\n${item.distance}\n${item.description}`).join('\n\n\n')
  writeFileSync('./src/data/exoplanet-list.txt', list)
}

function createNamesFile (data) {
  const names = data.map(([file]) => {
    const namePart = file.split('-').slice(1).join('-').replace('.json', '')
    return namePart.replace(/_/g, ' ')
  })

  const namesList = names.join('\n')
  writeFileSync('./src/data/exoplanet-names.txt', namesList)
}

;(async () => {
  const data = readExoplanetData()
  createListFile(data)
  createNamesFile(data)
})()
