import React from 'react'
import LayoutClient from '../../components/LayoutClient'
import MySubscription from './my-subscription'

const Page = () => {
  return (
    <LayoutClient>
        <main className='contenedor'>
            <MySubscription />
        </main>
    </LayoutClient>
  )
}

export default Page