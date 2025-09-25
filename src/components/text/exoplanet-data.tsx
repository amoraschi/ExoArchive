interface ExoplanetDataProps {
  field: string
  value: string
}

export default function ExoplanetData ({
  field,
  value
}: ExoplanetDataProps) {
  return (
    <p
      className='text-xs font-semibold text-blue-400 font-semibold mt-1'
    >
      {field}:
      <span
        className='text-gray-300 font-normal ml-1'
      >
        {value}
      </span>
    </p>
  )
}
