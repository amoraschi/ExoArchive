'use client'

import Scene from '@/components/three/scene'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function System () {
  const params = useSearchParams()
  const [data, setData] = useState<Combined | null>(null)

  const host = params.get('host')

  useEffect(() => {
    const abortController = new AbortController()
    fetch(`/api/system?host=${encodeURIComponent(host || '')}`, {
      signal: abortController.signal
    })
      .then(res => res.json())
      .then(fetchedData => setData(fetchedData))
      .catch(err => console.error(err))

    return () => {
      abortController.abort('Operation cancelled by the user.')
    }
  }, [host])

  return (
    <main
      className='min-h-screen'
    >
      {
        data != null && (
          <Scene
            {...data}
          />
        )
      }
    </main>
  )
}
