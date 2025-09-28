import { NextRequest } from 'next/server'
import { getExoplanetsURL } from '@/utils/url'

const exoplanets = getExoplanetsURL()

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')

  if (name == null) {
    return new Response('Name is required', {
      status: 400
    })
  }

  const res = await fetch(`${exoplanets}&display_name=${encodeURIComponent(name)}`)
  const json = await res.json()
  if (json.length === 0) {
    return new Response('Exoplanet not found', {
      status: 404
    })
  }

  const data = json[0]

  return new Response(JSON.stringify(data))
}
