import React, { useEffect } from 'react'
import './Popup.css';

export default function ({ description }) {
  useEffect(() => {
    const element = document.getElementById('popup');
    element.classList.add('popup-animation');
  }, [])
  return (
    <div id='popup'>
      {description}
    </div>
  )
}
