import { readFile } from 'fs/promises'
import { NextRequest } from 'next/server'

const EXOPLANET_NAMES_FILE = './src/data/exoplanet-list.txt'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')

  if (name == null) {
    return new Response('Name is required', {
      status: 400
    })
  }

  const list = await readFile(EXOPLANET_NAMES_FILE, 'utf-8')

  const matchedEntry = list.split('\n\n\n').find(entry => {
    const lines = entry.split('\n')
    const nameInFile = lines[0].split('-').slice(1).join('-').replace('.json', '').replace(/_/g, ' ')
    return nameInFile === name.trim()
  })

  if (matchedEntry == null) {
    return new Response(JSON.stringify({
      name: null,
      distance: null,
      description: null
    }))
  }

  const lines = matchedEntry.split('\n')
  const data = {
    name: lines[0]?.split('-').slice(1).join('-').replace('.json', '').replace(/_/g, ' ') ?? null,
    distance: lines[1]?.trim() ?? null,
    description: lines[2]?.trim() ?? null
  }

  return new Response(JSON.stringify(data))
}
