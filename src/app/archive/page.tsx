'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Header from '@/components/header/header'
import ExoplanetArchive from '@/components/data/exoplanet-archive'
import { ChevronDown, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, LoaderCircle } from 'lucide-react'

const selections: {
  [key: string]: string
} = {
  Date: 'date',
  'Last Modified': 'modified',
  Host: 'pl_hostname',
  Name: 'display_name',
  Description: 'derived_description',
  'Planet Type': 'planet_type',
  'Discovery Method': 'pl_discmethod',
  Facility: 'pl_facility',
  Distance: 'st_dist',
  Mass: 'planet_mass',
  'Discovery Date': 'pl_disc',
  'Radius (Jupiter)': 'pl_radj'
}

export default function Archive () {
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [results, setResults] = useState<Exoplanet[]>([])
  const [selected, setSelected] = useState<keyof typeof selections>('Last Modified')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    if (page < maxPage) {
      setPage(page + 1)
    }
  }

  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as keyof typeof selections
    setSelected(selected)
    setPage(1)
  }

  const handleAscDescChange = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
    setPage(1)
  }

  useEffect(() => {
    setResults([])
    const orderby = selections[selected]
    const abortController = new AbortController()
    fetch(`/api/archive?page=${page}&orderby=${orderby}&order=${order}`, {
      signal: abortController.signal
    })
      .then(res => {
        const max = res.headers.get('Max-Page') || '1'
        setMaxPage(parseInt(max))
        return res.json()
      })
      .then(data => setResults(data))
      .catch(err => console.error(err))

    return () => {
      abortController.abort('Operation cancelled by the user.')
    }
  }, [page, selected, order])

  return (
    <main
      className='min-h-screen flex flex-col items-center justify-center gap-4 p-4 lg:p-0'
    >
      <Header />
      {
        results.length > 0 ? (
          <div
            className='w-full rounded-lg bg-gray-400/25 p-4 mb-4 lg:w-1/2'
          >
            <div
              className='flex items-center justify-between mb-2'
            >
              <div
                className='flex items-center'
              >
                <ChevronFirst
                  onClick={() => setPage(1)}
                  className={page === 1 ? 'opacity-25' : 'cursor-pointer hover:text-gray-300'}
                />
                <ChevronLeft
                  onClick={handlePrev}
                  className={page === 1 ? 'opacity-25' : 'cursor-pointer hover:text-gray-300'}
                />
                <span
                  className='mx-2 font-semibold text-sm'
                >
                  {page} / {maxPage}
                </span>
                <ChevronRight
                  onClick={handleNext}
                  className={page === maxPage ? 'opacity-25' : 'cursor-pointer hover:text-gray-300'}
                />
                <ChevronLast
                  onClick={() => setPage(maxPage)}
                  className={page === maxPage ? 'opacity-25' : 'cursor-pointer hover:text-gray-300'}
                />
              </div>
              <select
                value={selected}
                onChange={handleOrderChange}
                className='text-sm font-semibold bg-black p-1 rounded'
              >
                {
                  Object.keys(selections).map((option, index) => (
                    <option
                      key={index}
                      value={option}
                      className='text-sm font-semibold'
                    >
                      {option.toUpperCase()}
                    </option>
                  ))
                }
              </select>
              <div
                className='flex items-center gap-1 cursor-pointer'
                onClick={handleAscDescChange}
              >
                {
                  order === 'asc' ? (
                    <ChevronUp
                      className='h-4 w-4'
                    />
                  ) : (
                    <ChevronDown
                      className='h-4 w-4'
                    />
                  )
                }
                <span
                  className='text-sm font-semibold'
                >
                  {order === 'asc' ? 'ASCENDING' : 'DESCENDING'}
                </span>
              </div>
            </div>
            <ul
              className='grid grid-cols-2 overflow-y-auto lg:grid-cols-3'
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
          </div>
        ) : (
          <LoaderCircle
            className='animate-spin text-gray-300'
          />
        )
      }
    </main>
  )
}
