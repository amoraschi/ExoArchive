import { LoaderCircle } from 'lucide-react'
import { ChangeEvent, FormEvent } from 'react'

interface SearchProps {
  query: string
  loading: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function Search ({
  query,
  loading,
  onChange,
  onSubmit
}: SearchProps) {
  return (
    <form
      onSubmit={onSubmit}
    >
      <div
        className='relative'
      >
        <input
          type='text'
          placeholder='Search for an exoplanet...'
          className='w-full rounded-md p-2 outline-none transition duration-100 focus:ring-2 focus:ring-white'
          value={query}
          onChange={onChange}
        />
        {
          loading && (
            <div
              className='absolute top-1/2 right-3 -translate-y-1/2'
            >
              <LoaderCircle
                className='w-4 h-4 animate-spin text-gray-300'
              />
            </div>
          )
        }
      </div>
    </form>
  )
}
