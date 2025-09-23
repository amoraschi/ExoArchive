import { readdirSync, readFileSync, rename, renameSync, writeFileSync } from 'fs'

function readExoplanetData (): [string, number, string][] {
  const files = readdirSync('./data/exoplanets')

  const data: [string, number, string][] = files.map((file) => {
    const fileData = readFileSync(`./data/exoplanets/${file}`, 'utf-8')
    const jsonData = JSON.parse(fileData)
    return [file, jsonData.acf.st_dist, jsonData.acf.derived_description]
  })

  return data
}

function createListFile (data: [string, number, string][]): void {
  const pagination = data.map(([file, distance, description]) => ({
    file,
    distance,
    description
  }))

  const list = pagination.map((item) => `${item.file}\n${item.distance}\n${item.description}`).join('\n\n')
  writeFileSync('./data/exoplanet-list.txt', list)
}

function createNamesFile (data: [string, number, string][]): void {
  const names = data.map(([file]) => {
    const namePart = file.split('-').slice(1).join('-').replace('.json', '')
    return namePart.replace(/_/g, ' ')
  })

  const namesList = names.join('\n')
  writeFileSync('./data/exoplanet-names.txt', namesList)
}

const data = readExoplanetData()
createListFile(data)
createNamesFile(data)
