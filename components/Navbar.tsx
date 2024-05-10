import Link from 'next/link'
import { ModeToggle } from './ToggleBtn'

const Navbar = () => {
  return (
    <div className='w-full relative flex items-center justify-between max-w-2xl mx-auto px-5 py-4'>
        <Link href='/' className='text-3xl font-bold' >
            Syng<span className='text-primary'>Portfolio</span>
            <span className='ml-3 text-primary text-sm italic '>by Next.js + Sanity</span>
        </Link>
        <Link href='/'><ModeToggle /></Link>
    </div>
  )
}

export default Navbar