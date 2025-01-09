import React from 'react'
import {Route, Link, Navigate} from 'react-router-dom';

export const ProtectedRoute = ({element: Component}) => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  return (
        userInfo? Component : <Navigate to='/login'/>
    )
}
