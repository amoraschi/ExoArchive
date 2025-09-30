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
  if (!description) {
    return (
      <>
        No description available.
      </>
    )
  }

  if (type != null) {
    const typeRegex = new RegExp(`(${type}-type)`)
    const parts = description.split(typeRegex)

    return (
      <>
        {
          parts.map((part, index) =>
            part === `${type}-type` ? (
              <span
                key={index}
              >
                {coloredType}
              </span>
            ) : (
              part
            )
          )
        }
      </>
    )
  }

  return (
    <>
      {description}
    </>
  )
}
