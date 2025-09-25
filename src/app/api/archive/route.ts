import { NextRequest } from 'next/server'

const PER_PAGE = 25
const ROUTE = `https://science.nasa.gov/wp-json/wp/v2/exoplanet?per_page=${PER_PAGE}&orderby=modified&order=desc`

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') ?? '1'

  if (isNaN(parseInt(page))) {
    return new Response('Page must be a number', {
      status: 400
    })
  }

  const res = await fetch(`${ROUTE}&page=${page}`)
  const data = await res.json()
  const parsedData = parseExoplanet(data)

  return new Response(JSON.stringify(parsedData))
}

function parseExoplanet (data: Exoplanet[]) {
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
