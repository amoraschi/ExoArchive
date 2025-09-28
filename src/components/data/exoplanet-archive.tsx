'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getColoredElement } from '@/utils/colors'
import { parsecsToLightYears } from '@/utils/math'
import DescriptionColor from '@/components/text/description-color'
import ExoplanetData from '@/components/text/exoplanet-data'

interface ExoplanetArchiveProps {
  exoplanet: Exoplanet
}

const fields = {
  pl_facility: 'Discovery Facility',
  pl_discmethod: 'Discovery Method',
  planet_size_class: 'Planet Size Class'
}

export default function ExoplanetArchive ({
  exoplanet
}: ExoplanetArchiveProps) {
  const [error, setError] = useState<boolean>(false)

  const { type, element } = getColoredElement(exoplanet.acf.derived_description)

  const planetType = exoplanet.acf.planet_type.toLowerCase().replace(/-/g, '').replace(/ /g, '')
  const imageURL = `https://assets.science.nasa.gov/dynamicimage/assets/science/astro/exo-explore/assets/content/planets/${planetType}-7.jpg`

  return (
    <li
      className='p-2 border-b border-gray-300/25 last:border-0'
    >
      {
        !error && (
          <Image
            src={imageURL}
            alt={exoplanet.acf.display_name}
            width={400}
            height={300}
            className='w-full h-auto rounded-lg mb-2'
            onError={() => setError(true)}
          />
        )
      }
      <span
        className='font-semibold'
      >
        {exoplanet.acf.display_name}
      </span>
      <p
        className='text-sm text-gray-300 italic'
      >
        <DescriptionColor
          description={exoplanet.acf.derived_description}
          coloredType={element}
          type={type}
        />
      </p>
      {
        exoplanet.acf.pl_hostname && (
          <ExoplanetData
            field='Host'
            value={exoplanet.acf.pl_hostname.replace(/_/g, ' ')}
          />
        )
      }
      {
        Object.entries(fields).map(([key, label]) => (
          exoplanet.acf[key as keyof ExoplanetAcf] && (
            <ExoplanetData
              key={key}
              field={label}
              value={exoplanet.acf[key as keyof ExoplanetAcf] as string}
            />
          )
        ))
      }
      {
        exoplanet.acf.pl_rade && (
          <ExoplanetData
            field='Radius'
            value={`${exoplanet.acf.pl_radj.toFixed(2)} x Jupiter`}
          />
        )
      }
      {
        exoplanet.acf.st_dist && (
          <ExoplanetData
            field='Distance'
            value={`${parsecsToLightYears(exoplanet.acf.st_dist.toString())} light years away`}
          />
        )
      }
      {
        exoplanet.modified_gmt && (
          <ExoplanetData
            field='Last Modified'
            value={new Date(exoplanet.modified_gmt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          />
        )
      }
    </li>
  )
}
