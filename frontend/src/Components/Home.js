import React, { useEffect, useState } from 'react'
import ProductList from './ProductList';
import { Categories } from './Categories';
import axios from 'axios';
import Popup from './Popup';

export const Home = ({ wishList, setWishList, setProducts, cartRef, cartItems, setCartItems, products }) => {

  return (
    <div className='fluid-container'>
      {/* <Categories /> */}
      {/* <Popup description={"Added to Cart"}/> */}
      <ProductList wishList={wishList} setWishList={setWishList} setProducts={setProducts} cartRef={cartRef} products={products} cartItems={cartItems} setCartItems={setCartItems} />
      {/* <Footer /> */}
    </div>
  )
}

