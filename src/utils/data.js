const { default: fetch } = require('node-fetch')
const { existsSync, readFileSync, writeFileSync } = require('fs')

const perPage = 100
const exoplanets = `https://science.nasa.gov/wp-json/wp/v2/exoplanet?per_page=${perPage}&orderby=modified&order=desc`

const lastModified = './src/data/last-modified-exoplanet.txt'

async function fetchExoplanetData (page) {
  const res = await fetch(`${exoplanets}&page=${page}`)
  const json = await res.json()

  const pages = parseInt(res.headers.get('x-wp-totalpages') || '1')
  const data = stripExoplanetData(json)

  return {
    data,
    pages
  }
}

function stripExoplanetData (data) {
  return data.map((planet) => ({
    id: planet.id,
    date: planet.date,
    date_gmt: planet.date_gmt,
    modified: planet.modified,
    modified_gmt: planet.modified_gmt,
    slug: planet.slug,
    type: planet.type,
    link: planet.link,
    featured_media: planet.featured_media,
    categories: planet.categories,
    acf: {
      pl_hostname: planet.acf.pl_hostname,
      pl_letter: planet.acf.pl_letter,
      display_name: planet.acf.display_name,
      planet_radius: planet.acf.planet_radius,
      derived_description: planet.acf.derived_description,
      planet_type: planet.acf.planet_type,
      pl_discmethod: planet.acf.pl_discmethod,
      pl_facility: planet.acf.pl_facility,
      st_dist: planet.acf.st_dist,
      planet_mass: planet.acf.planet_mass,
      st_optmag: planet.acf.st_optmag,
      discovery_date: planet.acf.discovery_date,
      pl_orbsmax: planet.acf.pl_orbsmax,
      period_display: planet.acf.period_display,
      eccentricity: planet.acf.eccentricity,
      star_id: planet.acf.star_id,
      pl_orbper: planet.acf.pl_orbper,
      pl_kepflag: planet.acf.pl_kepflag,
      pl_radj: planet.acf.pl_radj,
      pl_disc: planet.acf.pl_disc,
      pl_publ_date: planet.acf.pl_publ_date,
      planet_orbit_period: planet.acf.planet_orbit_period,
      multiple_planet_system: planet.acf.multiple_planet_system,
      pl_rade: planet.acf.pl_rade,
      exo_id: planet.acf.exo_id,
      planet_size_class: planet.acf.planet_size_class,
      pl_eccenlim: planet.acf.pl_eccenlim,
      pl_orbeccen: planet.acf.pl_orbeccen
    },
    _links: {
      self: planet._links.self,
      collection: planet._links.collection,
      about: planet._links.about,
      'acf:post': planet._links['acf:post'],
      'wp:featuredmedia': planet._links['wp:featuredmedia']
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

async function writeExoplanets () {
  let pages = 1
  let newestDate = null
  const lastModified = getLastModified()

  outerLoop:
  for (let page = 1; page <= pages; page++) {
    console.log(`\nFetching page ${page} of ${pages}\n`)

    const res = await fetchExoplanetData(page)
    pages = res.pages

    for (const planet of res.data) {
      const planetDate = new Date(planet.modified_gmt)

      if (newestDate == null) {
        newestDate = planetDate
      }

      if (planetDate <= lastModified) {
        console.log(`\nNo new or updated exoplanets found. Stopping.\n`)
        break outerLoop
      }

      const filePath = `./data/exoplanets/${planet.id}-${planet.acf.exo_id}.json`
      writeFileSync(filePath, JSON.stringify(planet))
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
  await writeExoplanets()
})()
