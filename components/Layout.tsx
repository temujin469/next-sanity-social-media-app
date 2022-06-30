import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Widget from './Widget'

function Layout({children}:any) {
  return (
    <div>
      <header>
        {/* <Navbar/> */}
      </header>
      <main className='grid grid-cols-11'>
        <Sidebar/>
        {children}
        <Widget/>
      </main>
    </div>
  )
}

export default Layout