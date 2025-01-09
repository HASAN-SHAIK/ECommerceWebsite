import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Categories.css';
import { Link } from 'react-router-dom';
import LoadingIcons from 'react-loading-icons'
import { Dropdown } from './Dropdown';

export const Categories = () => {
  return (
    <>
    <Navbar expand="lg" className="bg-secondary d-none d-lg-block navbarHeight">
      <Container className='d-flex justify-space-around'>
        {/* <form action='../../post' method='post'> */}
        {/* <Navbar.Brand><Link activeClassName='is-active' to='/'>Home</Link></Navbar.Brand> */}
        {/* </form> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <div className='dropdown'>
              <Link to='skillstech'><a>Mobiles</a></Link>
              <div className="dropdown-content">
                <Dropdown />
              </div>
            </div>
            <div className='dropdown'>
              <Link to='certifications'><a>Laptops</a></Link>
              {/* <div className="dropdown-content">
                <div>riudvceuker</div>
                <div>riudvceuker</div>
                <div>riudvceuker</div>
                <div>riudvceuker</div>

              </div> */}
            </div>
            <div className='dropdown'>
              <Link to='experience'><a>Clothing</a></Link>
              {/* <div className="dropdown-content">
                <div>riudvceuker</div>
                <div>riudvceuker</div>
                <div>riudvceuker</div>
                <div>riudvceuker</div>
              </div> */}
            </div>
            <div className='dropdown'>
              <Link to='projects'><a>Electronics</a></Link>
              {/* <div className="dropdown-content">
                <div>riudvceuker</div>
                <div>riudvceuker</div>
                <div>riudvceuker</div>
                <div>riudvceuker</div>
              </div> */}
            </div>
            <div className='dropdown'>
              <Link to='contact'><a>Accessories</a></Link>
              {/* <div className="dropdown-content">
                <div>riudvceuker</div>
                <div>riudvceuker</div>
                <div>riudvceuker</div>
                <div>riudvceuker</div>
              </div> */}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}