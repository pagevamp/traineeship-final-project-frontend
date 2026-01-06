import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

export const AboutUsComponent = () => {
  return (
  <div className="h-screen w-full place-content-center flex flex-col items-center justify-items-stretch text-undraw-secondary-100 px-8">
    <Link href={'/rides'} className='absolute top-5 left-5 bg-tertiary-100 p-2 rounded-full'><Icon icon='proicons:home' className='text-text-one-100/80' width={26} height={28}/></Link>
      <span className="font-extrabold text-5xl text-text-one-100/70 text-shadow-sm text-shadow-text-two-100">
        Welcome to{' '}
        <span className="whitespace-pre-wrap text-5xl text-text-two-100 font-extrabold text-shadow-sm text-shadow-card-bg-100">
          Outside Milera
        </span>
      </span>
    </div>
  )
}
