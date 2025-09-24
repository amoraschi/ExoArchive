const { default: fetch } = require('node-fetch')
const { existsSync, readFileSync, writeFileSync } = require('fs')

const perPage = 100
const stars = `https://science.nasa.gov/wp-json/wp/v2/star?per_page=${perPage}&orderby=modified&order=desc`

const lastModified = './src/data/last-modified-star.txt'

async function fetchStarData (page) {
  const res = await fetch(`${stars}&page=${page}`)
  const json = await res.json()

  const pages = parseInt(res.headers.get('x-wp-totalpages') || '1')
  const data = stripStarData(json)

  return {
    data,
    pages
  }
}

function stripStarData (data) {
  return data.map((star) => ({
    id: star.id,
    date: star.date,
    date_gmt: star.date_gmt,
    modified: star.modified,
    modified_gmt: star.modified_gmt,
    slug: star.slug,
    type: star.type,
    link: star.link,
    featured_media: star.featured_media,
    categories: star.categories,
    acf: {
      display_name: star.acf.display_name,
      custom_star_title: star.acf.custom_star_title,
      aliases: star.acf.aliases,
      constellation: star.acf.constellation,
      custom_star_description: star.acf.custom_star_description,
      tagline: star.acf.tagline,
      pop_culture: star.acf.pop_culture,
      detection_timeline: star.acf.detection_timeline,
      rv_planets_prospects: star.acf.rv_planets_prospects,
      transit_planets_prospects: star.acf.transit_planets_prospects,
      imaging_planets_prospects: star.acf.imaging_planets_prospects,
      planet_ids: star.acf.planet_ids,
      exo_id: star.acf.exo_id,
      st_optmag: star.acf.st_optmag,
      st_vj: star.acf.st_vj,
      st_dist: star.acf.st_dist,
      st_j: star.acf.st_j,
      st_mass: star.acf.st_mass,
      dec: star.acf.dec,
      st_teff: star.acf.st_teff,
      st_rad: star.acf.st_rad,
      ra: star.acf.ra,
      system_radius: star.acf.system_radius,
      pl_hostname: star.acf.pl_hostname,
      stellar_type: star.acf.stellar_type,
      tic_id: star.acf.tic_id,
      magnitude: star.acf.magnitude
    },
    _links: {
      self: star._links.self,
      collection: star._links.collection,
      about: star._links.about,
      'acf:post': star._links['acf:post'],
      'wp:featuredmedia': star._links['wp:featuredmedia']
    }
  }))
}

function getLastModified () {
  if (existsSync(lastModified)) {
    const dateString = readFileSync(lastModified, 'utf-8')
    return new Date(dateString)
  }

  return new Date(0)
}

function saveLastModified (date) {
  writeFileSync(lastModified, date.toISOString())
}

async function writeStars () {
  let pages = 1
  let newestDate = null
  const lastModified = getLastModified()

  outerLoop:
  for (let page = 1; page <= pages; page++) {
    console.log(`\nFetching page ${page} of ${pages}\n`)

    const res = await fetchStarData(page)
    pages = res.pages

    for (const star of res.data) {
      const starDate = new Date(star.modified_gmt)

      if (newestDate == null) {
        newestDate = starDate
      }

      if (starDate <= lastModified) {
        console.log(`\nNo new or updated stars found. Stopping.\n`)
        break outerLoop
      }

      const filePath = `./src/data/stars/${star.id}-${star.acf.exo_id}.json`
      writeFileSync(filePath, JSON.stringify(star))
      console.log(`Wrote ${filePath}`)
    }

    console.log(`\nFinished fetching page ${page} of ${pages}\n`)
  }

  if (newestDate != null) {
    saveLastModified(newestDate)
    console.log(`\nSaved last modified date: ${newestDate.toISOString()}\n`)
  }
}

;(async () => {
  await writeStars()
})()
