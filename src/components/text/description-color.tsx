import { ReactNode } from 'react'

interface DescriptionColorProps {
  description: string | null
  coloredType: ReactNode
  type: string | null
}

export default function DescriptionColor ({
  description,
  coloredType,
  type
}: Readonly<DescriptionColorProps>) {
  return (
    <>
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
    </>
  )
}
