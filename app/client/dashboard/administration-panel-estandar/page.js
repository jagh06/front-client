import React from 'react'
import LayoutClient from '../../components/LayoutClient'
import AdministrationPanelEstandar from './administration-panel-estandar'

const Page = () => {
  return (
    <LayoutClient>
        <main className='contenedor'>
            <AdministrationPanelEstandar />
        </main>
    </LayoutClient>
  )
}

export default Page