import { writeFileSync } from 'fs'
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

  const entries = list.split('\r\n\r\n')
  const matchedEntry = entries.find(entry => {
    const extracted = entry.trim().split('\r\n')[0]?.trim() ?? ''
    const entryName = extracted.split('-').slice(1).join('-').replace('.json', '').replace(/_/g, ' ')
    return entryName.toLowerCase() === name.toLowerCase()
  })

  if (matchedEntry == null) {
    return new Response(JSON.stringify({
      name: null,
      distance: null,
      description: null
    }))
  }

  const lines = matchedEntry.trim().split('\r\n')
  const data = {
    name: lines[0]?.split('-').slice(1).join('-').replace('.json', '').replace(/_/g, ' ') ?? null,
    distance: lines[1]?.trim() ?? null,
    description: lines[2]?.trim() ?? null
  }

  return new Response(JSON.stringify(data))
}
