interface Links {
  self: Self[]
  collection: About[]
  about: About[]
  'acf:post': AcfPost[]
  'wp:featuredmedia': AcfPost[]
}

interface Self {
  href: string
  targetHints: TargetHints
}

interface TargetHints {
  allow: string[]
}

interface About {
  href: string
}

interface AcfPost {
  embeddable: boolean
  href: string
}