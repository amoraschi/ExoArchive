interface HighlightProps {
  text: string
  highlight: string
}

export default function Highlight ({
  text,
  highlight
}: HighlightProps) {
  const regex = new RegExp(`(${highlight})`, 'gi')
  const parts = text.split(regex)

  return (
    <span
      className='font-semibold'
    >
      {
        highlight.trim() === '' ? (
          text
        ) : (
          <>
            {
              parts.map((part, index) => (
                regex.test(part) ? (
                  <span
                    key={index}
                    className='text-red-500'
                  >
                    {part}
                  </span>
                ) : (
                  <span
                    key={index}
                  >
                    {part}
                  </span>
                )
              ))
            }
          </>
        )

      }
    </span>
  )
}
