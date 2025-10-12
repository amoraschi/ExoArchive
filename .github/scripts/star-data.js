const { default: fetch } = require('node-fetch')
const { existsSync, writeFileSync, mkdirSync, rmSync } = require('fs')

const perPage = 100
const stars = `
  https://science.nasa.gov/wp-json/wp/v2/star?per_page=${perPage}&_fields=
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

async function fetchStarData (page) {
  const res = await fetch(`${stars}&page=${page}`)
  const data = await res.json()

  const pages = parseInt(res.headers.get('x-wp-totalpages') || '1')

  return {
    data,
    pages
  }
}

async function writeStars () {
  rmSync('./src/data/stars', { recursive: true })

  if (!existsSync('./src/data/stars')) {
    mkdirSync('./src/data/stars', { recursive: true })
  }

  let pages = 1
  for (let page = 1; page <= pages; page++) {
    console.log(`\nFetching page ${page} of ${pages}\n`)

    const res = await fetchStarData(page)
    pages = res.pages

    for (const star of res.data) {
      const filePath = `./src/data/stars/${star.id}-${star.acf.exo_id}.json`
      writeFileSync(filePath, JSON.stringify(star, null, 2))
      console.log(`Wrote ${filePath}`)
    }

    console.log(`\nFinished fetching page ${page} of ${pages}\n`)
  }
}

;(async () => {
  await writeStars()
})()
