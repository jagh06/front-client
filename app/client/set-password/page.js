import React from 'react'
import SetPassword from './set-password'
import LayoutRegister from '../Layout'

export const metadata = {
  title: 'Add Password',
  description: 'Generated by create next app',
}

const Page = () => {
  return (
   <LayoutRegister>
    <SetPassword />
   </LayoutRegister>
  )
}

export default Page