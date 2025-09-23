interface Exoplanet {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  type: string
  link: string
  featured_media: number
  categories: number[]
  acf: ExoplanetAcf
  _links: Links
}

interface ExoplanetAcf {
  pl_hostname: string
  pl_letter: string
  display_name: string
  planet_radius: string
  derived_description: string
  planet_type: string
  pl_discmethod: string
  pl_facility: string
  st_dist: number
  planet_mass: string
  st_optmag: number
  discovery_date: string
  pl_orbsmax: number
  period_display: string
  eccentricity: string
  star_id: number
  pl_orbper: number
  pl_kepflag: boolean
  pl_radj: number
  pl_disc: number
  pl_publ_date: string
  planet_orbit_period: string
  multiple_planet_system: boolean
  pl_rade: number
  exo_id: string
  planet_size_class: string
  pl_eccenlim: number
  pl_orbeccen: number
}
