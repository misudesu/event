import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../button'
import NavItem from './NavItem'
import MobileNav from './MobileNav'

function Header() {
  return (
    <header className='w-full border-b'>
        <div className='wrapper flex items-center justify-between '>
<Link href='/' className='h-38'>
<Image src='/assets/images/logo.svg' alt='Evently logo' width={128} height={38}/>

</Link>
<SignedIn>
    
        <nav className='md:flex-between hidden w-full max-w-xs'>

      <NavItem/>
        </nav>
    </SignedIn>
<div className='flex w-32 justify-end gap-3'>
    <SignedIn>
        <UserButton afterSwitchSessionUrl='/'/>
   <MobileNav/>
     
    </SignedIn>
<SignedOut>
    <Button asChild className='rounded-full'  size='lg'>
      <Link href='/sign-in'>Login</Link>
    </Button>
</SignedOut>
</div>
        </div>
  
    </header>
  )
}

export default Header
