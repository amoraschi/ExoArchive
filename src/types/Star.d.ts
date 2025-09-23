interface Star {
  id: number
  date: Date
  date_gmt: Date
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
  constellation: string
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
