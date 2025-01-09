import React from 'react'

export const AdminProtectedRoute = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    return (
          userInfo? Component : <Navigate to='/login'/>
      )
}
