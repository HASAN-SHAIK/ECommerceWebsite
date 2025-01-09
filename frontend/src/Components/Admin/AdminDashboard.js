import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import rolexImage from './Images/rolex.png';
import './AdminDashboard.css'
export const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      setProducts(response.data);
      console.log(response.data)
    };
    fetchProducts();
  }, []);
  return (
    <div className='dashboard-container d-none d-lg-block'>
        <div className='row mb-5'>
            <div className='col-8'>
                <div className='card'>
                    <div className='row'>
                      <div style={{height:'100%'}} className='col-7  p-0 d-flex justify-space-around align-items-center'>
                      <div  className='row m-0 d-flex justify-content-center align-items-center'>
                      <div className='col-7 product-feature p-1'>
                        <div className='dark-text'>
                          Water Resistance
                        </div>
                        <div className='white-text'>
                          100 meters
                        </div>
                        <div className='dark-text mt-3'>
                          Weight <span className='white-text'>40G</span>
                        </div>
                      </div>
                      <div className='col-5'>
                      <img className='dashboard-image'  src={rolexImage} />
                      </div>
                      </div>
                      </div>
                      <div className='col-5 d-flex align-items-center justify-content-center flex-column'>
                        <div className='white-text' style={{fontSize: '1.4em'}}>
                          Timeless Elegance in Every Look
                        </div>
                        <div className='dark-text' style={{fontSize:'.8em'}}>
                          Upgrade your style with a watch that blends classicelegance and expert craftsmanship for any occasion
                        </div>
                        <div className='m-4 row text-center'>
                          <button className='btn p-0 d-inline col-5 p-1' style={{backgroundColor:'#00c1b5', width:'7em'}}>Shop Now </button><div className='p-0 text-white text-center' style={{width:'7em', marginTop:'.5em'}}>Rs.120.00</div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div className='col-4'>
                    <div className='card p-3'>
                      <div className='white-text'>Customer Review</div>
                          <div className='dark-text text-center' style={{ fontSize:'2em'}}>4.7 <span style={{color:'orange'}}>{"★".repeat(4) + "☆".repeat(1)}</span></div>
                          <div className='row'>
                            <div className='dark-text col-2 p-1' style={{fontSize:'.8em'}}>5 Star</div>
                            <div className='status-bar col-8 p-0 col-8'>
                            <img width={`80%`} class="status-fill" id='widthPercentage' />
                          </div>
                          <div className='dark-text col-2  mt-1' style={{fontSize:'.8em'}}>80%</div>
                          </div>
                          <div className='row'>
                            <div className='dark-text col-2 p-1' style={{fontSize:'.8em'}}>5 Star</div>
                            <div className='status-bar col-8 p-0 col-8'>
                            <img width={`70%`} class="status-fill" id='widthPercentage' />
                          </div>
                          <div className='dark-text col-2  mt-1' style={{fontSize:'.8em'}}>70%</div>
                          </div>
                          <div className='row'>
                            <div className='dark-text col-2 p-1' style={{fontSize:'.8em'}}>5 Star</div>
                            <div className='status-bar col-8 p-0 col-8'>
                            <img width={`40%`} class="status-fill" id='widthPercentage' />
                          </div>
                          <div className='dark-text col-2  mt-1' style={{fontSize:'.8em'}}>40%</div>
                          </div>
                          <div className='row'>
                            <div className='dark-text col-2 p-1' style={{fontSize:'.8em'}}>5 Star</div>
                            <div className='status-bar col-8 p-0 col-8'>
                            <img width={`10%`} class="status-fill" id='widthPercentage' />
                          </div>
                          <div className='dark-text col-2  mt-1' style={{fontSize:'.8em'}}>10%</div>
                          </div>
                          <div className='row'>
                            <div className='dark-text col-2 p-1' style={{fontSize:'.8em'}}>5 Star</div>
                            <div className='status-bar col-8 p-0 col-8'>
                            <img width={`20%`} class="status-fill" id='widthPercentage' />
                          </div>
                          <div className='dark-text col-2  mt-1' style={{fontSize:'.8em'}}>20%</div>
                          </div>
                          <div className='dark-text mt-3'style={{fontSize:'.9em'}}>Total 600 Review</div>
                      </div>
            </div>
        </div>
        {products.length > 0 && <div className='mx-3 my-2'>Popular Product</div>}
        <div className='row d-flex justify-content-around'>
        {products.length > 0 && products.map((product, index)=>{
          if(index<6)
          return <div className='col-3 small-card'>
          <div className='newTag' style={{backgroundColor:'red', width:'40px', padding:'3px', borderRadius:'.2em'}}>New</div>
            <FontAwesomeIcon className='heartIcon fa-1x' icon={faHeart} />
            <img src={product.images[0]} width='100%' height={250}/>
            <div className='row small-card-text'>
              <div>{product.title}</div>
              <div className='col-5'>Rs. {product.price}</div>
              <div className='col-7'>
              {"★".repeat(Math.floor(4))}
              {"☆".repeat(5 - Math.floor(4))}
              </div>
            </div>
          </div>
        })}
        </div>
        <div style={{width:'103.3%', backgroundColor:'#111', position:'relative', bottom:0, height:'7em', marginTop: '1em'}}>
          
        </div>
    </div>
  )
}
