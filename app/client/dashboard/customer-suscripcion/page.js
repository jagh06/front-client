import React from 'react'
import LayoutClient from '../../components/LayoutClient'
import CustomerSuscripcion from './customer-suscripcion'

export const metadata = {
  title: 'Suscripcion',
  description: 'Generated by create next app',
}

const Page = () => {
  return (
    <LayoutClient>
        <CustomerSuscripcion />
    </LayoutClient>
  )
}

export default Page