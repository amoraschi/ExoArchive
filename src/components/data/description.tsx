'use client'

import { getStarColor } from '@/utils/colors'

interface DescriptionProps {
  description: string | null
  distance: string
}

export default function Description ({
  description,
  distance
}: Readonly<DescriptionProps>) {
  const parsecsToLightYears = (parsecs: string) => {
    return (parseFloat(parsecs) * 3.26156378).toFixed(2)
  }

  const typeMatch = description?.match(/([OBAFGKMLTY])-type/)
  const type = typeMatch != null ? typeMatch[1] : null
  const coloredType = type != null ? (
    <span
      className='text-black'
      style={{
        backgroundColor: getStarColor(type)
      }}
    >
      {type}-type
    </span>
  ) : 'Unknown-type'

  return (
    <div>
      <p
        className='text-sm text-gray-300 italic'
      >
        {
          description != null ? (
            type != null ? (
              <>
                {
                  description.slice(0, description.indexOf('-type') - 1).trim()
                } {
                  coloredType
                } {
                  description.slice(description.indexOf('-type') + 5).trim()
                }
              </>
            ) : (
              description
            )
          ) : (
            'No description available.'
          )
        }
      </p>
      <p
        className='text-xs font-semibold text-blue-400 font-semibold mt-1'
      >
        {
          distance !== '' ? (
            `${parsecsToLightYears(distance)} light years away`
          ) : (
            'Distance unknown'
          )
        }
      </p>
    </div>
  )
}
