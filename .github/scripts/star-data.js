const { default: fetch } = require('node-fetch')
const { existsSync, readFileSync, writeFileSync } = require('fs')

const perPage = 100
const stars = `
  https://science.nasa.gov/wp-json/wp/v2/star?per_page=${perPage}&orderby=modified&order=desc&_fields=
  id,
  date,
  date_gmt,
  modified,
  modified_gmt,
  slug,
  type,
  link,
  featured_media,
  categories,
  acf.display_name,
  acf.custom_star_title,
  acf.aliases,
  acf.constellation,
  acf.custom_star_description,
  acf.tagline,
  acf.pop_culture,
  acf.detection_timeline,
  acf.rv_planets_prospects,
  acf.transit_planets_prospects,
  acf.imaging_planets_prospects,
  acf.planet_ids,
  acf.exo_id,
  acf.st_optmag,
  acf.st_vj,
  acf.st_dist,
  acf.st_j,
  acf.st_mass,
  acf.dec,
  acf.st_teff,
  acf.st_rad,
  acf.ra,
  acf.system_radius,
  acf.pl_hostname,
  acf.stellar_type,
  acf.tic_id,
  acf.magnitude,
  _links.self,
  _links.collection,
  _links.about,
  _links.acf:post,
  _links.wp:featuredmedia
`

const LAST_MODIFIED_STAR_FILE = './src/data/last-modified-star.txt'

async function fetchStarData (page) {
  const res = await fetch(`${stars}&page=${page}`)
  const data = await res.json()

  const pages = parseInt(res.headers.get('x-wp-totalpages') || '1')

  return {
    data,
    pages
  }
}

function getLastModified () {
  if (existsSync(LAST_MODIFIED_STAR_FILE)) {
    const dateString = readFileSync(LAST_MODIFIED_STAR_FILE, 'utf-8')
    return new Date(dateString)
  }

  return new Date(0)
}

function saveLastModified (date) {
  writeFileSync(LAST_MODIFIED_STAR_FILE, date.toISOString())
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
