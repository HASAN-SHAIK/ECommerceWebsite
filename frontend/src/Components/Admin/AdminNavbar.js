import React, { useState } from 'react'
import './AdminNavbar.css';
import { Link } from 'react-router-dom';
import { faBell, faCube, faDumpsterFire, faGear, faHotel, faNewspaper, faPeopleGroup, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AdminNavbar = () => {
    const userInfo = JSON.parse(sessionStorage.userInfo);
    var [searchValue, setSearchValue] = useState(''); 
    const handleSearch =() =>{
      console.log("Camememe", searchValue)
    }
  return (
    <div className=''>
    <div id="mySidenav" class="sidenav">
        <Link className='sidenav-icons'>
            <div className='text-center'>
            </div>
        </Link>
        <Link to="">
            <div className='text-center'>
            <FontAwesomeIcon className='navbar-icon' icon={faHotel} />
            <div className='icon-text'>Dashboard</div>
            </div>
        </Link>
        <Link to="orders">
            <div className='text-center'>
            <FontAwesomeIcon className='navbar-icon' icon={faNewspaper} />
            <div className='icon-text'>Orders</div>
            </div>
        </Link>
        <Link to="products">
            <div className='text-center'>
            <FontAwesomeIcon className='navbar-icon' icon={faCube} />
            <div className='icon-text'>Products</div>
            </div>
        </Link>
        <Link to="customers">
            <div className='text-center'>
            <FontAwesomeIcon className='navbar-icon' icon={faPeopleGroup} />
            <div className='icon-text'>Team</div>
            </div>
        </Link>
        <Link to="settings">
            <div className='text-center'>
            <FontAwesomeIcon className='navbar-icon' icon={faGear} />
            <div className='icon-text'>Settings</div>
            </div>
        </Link>
    </div>



    {/* Top Navbar  */}
    <div id="myTopnav" class="topnav">
    <div className='left-topnav'>
        <Link>
            <div className='text-center'>
            <FontAwesomeIcon className='navbar-icon fa-2x p-1' icon={faDumpsterFire} />
            </div>
        </Link>
        <Link href="#">
            <div class="input-group">
                <input type='search' value={searchValue} onChange={(evt)=>{ setSearchValue(evt.target.value)}} className='admin-search-input' />
                <button className='btn search-text' onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
        </Link>
    </div>
    <div className='right-topnav'>
        <Link href="#">
            <div className='text-center'>
            <FontAwesomeIcon className='navbar-icon' icon={faBell} />
            </div>
        </Link>
        <Link href="#">
                <div className='row rightnav-profile'>
                    <div className='col-4'><img className='profile-image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk_nIiXvWFWyV64bFUtfATT242m-7i3CDfxg&s' alt='profile Image' width={40} height={40}/></div>
                    <div className='col-8 '>
                        <div className='profile-name'>
                            {userInfo.name}
                        </div>
                        <div className='profile-designation'>
                            {userInfo.position}
                        </div>
                    </div>
                </div>
        </Link>

        </div> 
    </div>
</div>
  )
}
