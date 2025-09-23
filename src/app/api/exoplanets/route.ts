import { readFile } from 'fs/promises'
import { NextRequest } from 'next/server'

const EXOPLANET_NAMES_FILE = './src/data/exoplanet-names.txt'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('search')

  if (query == null) {
    return new Response('Search parameter is required', {
      status: 400
    })
  }

  const list = await readFile(EXOPLANET_NAMES_FILE, 'utf-8')
  const exoplanetNames = list.toString().split('\n').map(name => name.trim())

  const matchedNames = exoplanetNames.filter(name => name.toLowerCase().includes(query.toLowerCase().trim()))

  return new Response(JSON.stringify(matchedNames))
}
