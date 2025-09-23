'use client'

import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface DescriptionProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function Description ({
  open,
  setOpen
}: Readonly<DescriptionProps>) {
  return (
    <div
      // className='w-1/2 p-4 rounded-lg bg-gray-400/25'
    >
      <ChevronDown
        size={16}
        className={`ml-auto mt-2 cursor-pointer transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        onClick={() => setOpen(!open)}
      />
      {
        open && (
          <p
            className='mt-2 text-sm text-gray-300'
          >
            The ExoArchive is a comprehensive database of confirmed exoplanets, providing detailed information about their characteristics, discovery methods, and host stars. It serves as a valuable resource for researchers and enthusiasts interested in the study of planets beyond our solar system.
          </p>
        )
      }
    </div>
  )
}
