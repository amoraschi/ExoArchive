import { useState } from 'react'
import { ChevronDown, LoaderCircle } from 'lucide-react'
import Highlight from '@/components/text/highlight'
import Description from '@/components/data/description'
import Link from 'next/link'

interface ExoplanetProps {
  name: string
  query: string
}

interface ExoplanetData {
  name: string
  distance: string
  description: string
}

export default function Exoplanet ({
  name,
  query
}: ExoplanetProps) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Exoplanet | null>(null)

  const handleExpand = async () => {
    if (!expanded && data == null) {
      setLoading(true)

      fetch(`/api/exoplanet?name=${encodeURIComponent(name)}`)
        .then(res => res.json())
        .then(fetchedData => setData(fetchedData))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }

    setExpanded(!expanded)
  }
  
  return (
    <li
      className='border-b border-gray-300/25 last:border-0'
    >
      <div
        className='flex items-center justify-between cursor-pointer py-2'
        onClick={handleExpand}
      >
        <Highlight
          text={name}
          highlight={query}
        />
        {
          loading ? (
            <LoaderCircle
              className='w-4 h-4 animate-spin text-gray-300'
            />
          ) : (
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''} text-gray-300`}
            />
          )
        }
      </div>
      {
        expanded && data != null && (
          <div
            className='px-1'
          >
            <Description
              description={data.acf.derived_description}
              distance={data.acf.st_dist}
            />
            <Link
              className='inline-block text-sm font-semibold my-2 px-4 py-1 bg-blue-600 rounded hover:cursor-pointer hover:bg-blue-700 transition'
              href={`/system?host=${encodeURIComponent(data.acf.pl_hostname)}`}
            >
              VIEW
            </Link>
          </div>
        )
      }
    </li>
  )
}