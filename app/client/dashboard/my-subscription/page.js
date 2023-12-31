import { Inter } from "next/font/google";
import React from 'react'
import LayoutClient from '../../components/LayoutClient'
import MySubscription from './my-subscription'

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Mi suscripcion",
  description: "Generated by create next app",
};

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