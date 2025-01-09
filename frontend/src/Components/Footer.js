import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCartShopping, faUser} from '@fortawesome/free-solid-svg-icons'
import './Footer.css';
export const Footer = () => {
  return (
    <div className='d-block d-sm-none footer'>
    <div className='d-inline'>
        <FontAwesomeIcon className='fa-2xl' icon={faHouse} />
        </div>
    <div className='d-inline'>

        <FontAwesomeIcon className='fa-2xl' icon={faCartShopping} />
        </div>
        <div className='d-inline'>
        <FontAwesomeIcon className='fa-2xl' icon={faUser} />
        </div>
    </div>
  )
}
