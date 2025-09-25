'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/header/header'
import ExoplanetArchive from '@/components/data/exoplanet-archive'
import { LoaderCircle } from 'lucide-react'

export default function Archive () {
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<Exoplanet[]>([])

  useEffect(() => {
    fetch(`/api/archive?page=${page}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err))
  }, [page])

  return (
    <main
      className='min-h-screen flex flex-col items-center justify-center gap-4 p-4 lg:p-0'
    >
      <Header />
      {
        results.length > 0 ? (
          <ul
            className='w-full grid grid-cols-2 p-4 rounded-lg bg-gray-400/25 overflow-y-auto max-h-96 lg:w-1/2 lg:grid-cols-3'
          >
            {
              results.map((exoplanet, index) => (
                <ExoplanetArchive
                  key={index}
                  exoplanet={exoplanet}
                />
              ))
            }
          </ul>
        ) : (
          <LoaderCircle
            className='animate-spin text-gray-300'
          />
        )
      }
    </main>
  )
}
