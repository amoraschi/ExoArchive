'use client'

import DescriptionColor from '@/components/text/description-color'
import { getColoredElement } from '@/utils/colors'
import { parsecsToLightYears } from '@/utils/math'

interface DescriptionProps {
  description: string | null
  distance: number | null
}

export default function Description ({
  description,
  distance
}: Readonly<DescriptionProps>) {
  const { type, element } = getColoredElement(description)

  return (
    <div>
      <p
        className='text-sm text-gray-300 italic'
      >
        <DescriptionColor
          description={description}
          coloredType={element}
          type={type}
        />
      </p>
      <p
        className='text-xs font-semibold text-blue-400 font-semibold mt-1'
      >
        {
          distance != null ? (
            `${parsecsToLightYears(distance.toString())} light years away`
          ) : (
            'Distance unknown'
          )
        }
      </p>
    </div>
  )
}
