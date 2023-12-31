import { Inter } from "next/font/google";
import React from 'react'
import LayoutClient from '../../components/LayoutClient'
import ReservationList from './reservation-list'

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Reservaciones",
  description: "Generated by create next app",
};

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