import React from 'react'
import LayoutClient from '../../components/LayoutClient'
import ReservationList from './reservation-list'

const Page = () => {
  return (
    <LayoutClient>
        <main className='contenedor'>
            <ReservationList />
        </main>
    </LayoutClient>
  )
}

export default Page