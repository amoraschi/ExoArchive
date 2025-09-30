const { default: fetch } = require('node-fetch')
const { existsSync, readFileSync, writeFileSync } = require('fs')

const perPage = 100
const exoplanets = `
  https://science.nasa.gov/wp-json/wp/v2/exoplanet?per_page=${perPage}&_fields=
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
  acf.pl_hostname,
  acf.pl_letter,
  acf.display_name,
  acf.planet_radius,
  acf.derived_description,
  acf.planet_type,
  acf.pl_discmethod,
  acf.pl_facility,
  acf.st_dist,
  acf.planet_mass,
  acf.st_optmag,
  acf.discovery_date,
  acf.pl_orbsmax,
  acf.period_display,
  acf.eccentricity,
  acf.star_id,
  acf.pl_orbper,
  acf.pl_kepflag,
  acf.pl_radj,
  acf.pl_disc,
  acf.pl_publ_date,
  acf.planet_orbit_period,
  acf.multiple_planet_system,
  acf.pl_rade,
  acf.exo_id,
  acf.planet_size_class,
  acf.pl_eccenlim,
  acf.pl_orbeccen,
  _links.self,
  _links.collection,
  _links.about,
  _links.acf:post,
  _links.wp:featuredmedia
`

async function fetchExoplanetData (page) {
  const res = await fetch(`${exoplanets}&page=${page}`)
  const data = await res.json()

  const pages = parseInt(res.headers.get('x-wp-totalpages') || '1')

  return {
    data,
    pages
  }
}

async function writeExoplanets () {
  let pages = 1
  for (let page = 1; page <= pages; page++) {
    console.log(`\nFetching page ${page} of ${pages}\n`)

    const res = await fetchExoplanetData(page)
    pages = res.pages

    for (const planet of res.data) {
      const filePath = `./src/data/exoplanets/${planet.id}-${planet.acf.exo_id}.json`
      writeFileSync(filePath, JSON.stringify(planet))
      console.log(`Wrote ${filePath}`)
    }

    console.log(`\nFinished fetching page ${page} of ${pages}\n`)
  }
}

;(async () => {
  await writeExoplanets()
})()
