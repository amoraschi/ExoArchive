interface Star {
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
  acf: StarAcf
  _links: Links
}

interface StarAcf {
  display_name: string
  custom_star_title: string
  aliases: string
  constellation: string
  custom_star_description: string
  tagline: string
  pop_culture: string
  detection_timeline: string
  rv_planets_prospects: string
  transit_planets_prospects: string
  imaging_planets_prospects: string
  planet_ids: number[] | {
    [key: string]: number
  }
  exo_id: string
  st_optmag: number
  st_vj: number
  st_dist: number
  st_j: number
  st_mass: number
  dec: number
  st_teff: number
  st_rad: number
  ra: number
  system_radius: number
  pl_hostname: string
  stellar_type: string
  tic_id: string
  magnitude: number
}
