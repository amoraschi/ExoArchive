import { NextRequest } from 'next/server'
import { getExoplanetURL, getStarURL } from '@/utils/url'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const host = searchParams.get('host')

  if (host == null) {
    return new Response('Host is required', {
      status: 400
    })
  }

  const dataURL = getStarURL()

  const res = await fetch(`${dataURL}&pl_hostname=${encodeURIComponent(host)}`)
  const json = await res.json()

  const star = json[0]

  const planets = []
  for (const key in star.acf.planet_ids) {
    const planetId = star.acf.planet_ids[key]
    const planetRes = await fetch(getExoplanetURL(planetId))
    const planetJson = await planetRes.json()
    planets.push(planetJson)
  }

  const data = {
    star,
    planets
  }

  return new Response(JSON.stringify(data))
}
