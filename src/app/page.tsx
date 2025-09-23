'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Highlight from '@/components/text/highlight'
import Description from '@/components/data/description'

const API_URL = '/api/exoplanets?search='

export default function Home () {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (e.target == null) return

    fetch(`${API_URL}${query}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err))
  }

  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center gap-4'
    >
      <div
        className='w-1/2 p-4 rounded-lg bg-gray-400/25'
      >
        <form
          onSubmit={onSubmit}
        >
          <input
            type='text'
            placeholder='Search for an exoplanet...'
            className='w-full rounded-md p-2 outline-none transition duration-100 focus:ring-2 focus:ring-white'
            value={query}
            onChange={onChange}
          />
        </form>
        <span
          className='text-xs text-gray-300 font-semibold'
        >
          PRESS ENTER TO SEARCH
        </span>
      </div>
      {
        results.length > 0 && query.length > 0 && (
          <ul
            className='w-1/2 p-4 rounded-lg bg-gray-400/25 overflow-y-auto max-h-96'
          >
            {
              results.map((name, index) => (
                <li
                  key={index}
                  className='flex justify-between items-center p-2 border-b border-gray-300/25 last:border-none'
                >
                  <Highlight
                    text={name}
                    highlight={query}
                  />
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}
