import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
  <div className="flex">
    <Sidebar/>
    <main className="flex-grow">
      <Outlet/>
    </main>
  </div>
  )
}

export default PageLayout;
