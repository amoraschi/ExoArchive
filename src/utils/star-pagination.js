const { readdirSync, readFileSync, writeFileSync } = require('fs')

function readStarData () {
  const files = readdirSync('./src/data/stars')

  const data = files.map((file) => {
    const fileData = readFileSync(`./src/data/stars/${file}`, 'utf-8')
    const jsonData = JSON.parse(fileData)
    return [file, jsonData.acf.st_dist, jsonData.acf.custom_star_description]
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
  writeFileSync('./src/data/star-list.txt', list)
}

function createNamesFile (data) {
  const names = data.map(([file]) => {
    const namePart = file.split('-').slice(1).join('-').replace('.json', '')
    return namePart.replace(/_/g, ' ')
  })

  const namesList = names.join('\n')
  writeFileSync('./src/data/star-names.txt', namesList)
}

; (async () => {
  const data = readStarData()
  createListFile(data)
  createNamesFile(data)
})()
