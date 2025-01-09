import React, { useEffect, useState } from 'react'
import './AdminHome.css';
import { AdminDashboard } from './AdminDashboard';
import { AdminNavbar } from './AdminNavbar';
import OrdersPage from './OrdersPage';
import ProductsPage from './ProductsPage';
import Settings from './Settings';
import AdminCustomersPage from './AdminCustomersPage';
export const AdminHome = ({handleLogout}) => {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(()=>{
    setPath(window.location.pathname);
  }, [window.location.pathname])
  return (
    <>
    <div className='d-block d-lg-none text-center'>
      Please use Bigger Screen for Admin Controls
    </div>
    <div className='admin-container d-none d-lg-block'>
        <div className='myadminnavbar'>
            <AdminNavbar />
        </div>
        <div className='content'>
            {path === '/admin' && <AdminDashboard />}
            {path === '/admin/orders' && <OrdersPage />}
            {path === '/admin/products' && <ProductsPage />}
            {path === '/admin/customers' && <AdminCustomersPage />}
            {path === '/admin/settings' && <Settings handleLogout={handleLogout}/>}

        </div>
     
    </div>
    </>
  )
}
