import HeaderButton from '@/components/header/header-button'

export default function Header () {
  return (
    <div
      className='flex gap-4 mt-4'
    >
      <HeaderButton
        text='HOME'
        href='/'
      />
      <HeaderButton
        text='ARCHIVE'
        href='/archive'
      />
    </div>
  )
}
