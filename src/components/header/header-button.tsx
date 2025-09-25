import Link from 'next/link'

interface HeaderButtonProps {
  text: string
  href: string
}

export default function HeaderButton ({
  text,
  href
}: HeaderButtonProps) {
  return (
    <Link
      href={href}
      className='font-semibold text-gray-300 transition hover:text-white hover:underline'
    >
      {text}
    </Link>
  )
}
