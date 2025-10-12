'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Highlight from '@/components/text/highlight'
import Description from '@/components/data/description'
import Search from '@/components/text/search'
import Exoplanet from '@/components/data/exoplanet'
import Header from '@/components/header/header'

const API_URL = '/api/exoplanets?search='

export default function Home () {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target == null) return

    if (e.target.value === '') {
      setResults([])
    }

    setQuery(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Searching for:', query)
    if (e.target == null || query === '') return

    setResults([])
    setLoading(true)
    fetch(`${API_URL}${query}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  return (
    <main
      className='min-h-screen flex flex-col items-center justify-center gap-4 p-4 lg:p-0'
    >
      <Header />
      <div
        className='w-full p-4 rounded-lg bg-gray-400/25 lg:w-1/2'
      >
        <Search
          query={query}
          loading={loading}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        <span
          className='text-sm text-gray-300 font-semibold'
        >
          PRESS ENTER TO SEARCH
        </span>
      </div>
      {
        results.length > 0 && (
          <ul
            className='w-full p-4 rounded-lg bg-gray-400/25 overflow-y-auto max-h-96 lg:w-1/2'
          >
            {
              results.slice(0, 100).map((name: string, index: number) => (
                <Exoplanet
                  key={index}
                  name={name}
                  query={query}
                />
              ))
            }
            {
              results.length > 100 && (
                <li
                  className='text-sm text-gray-300 font-semibold mt-2'
                >
                  {results.length - 100} MORE RESULTS...
                </li>
              )
            }
          </ul>
        )
      }
    </main>
  )
}
