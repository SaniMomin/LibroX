import React from 'react'
import NavbarAD from './NavbarAD'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
      <div><NavbarAD/></div>
      <div><Outlet/></div>
    </div>
  )
}

export default AdminDashboard
