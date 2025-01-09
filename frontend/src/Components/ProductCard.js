import React, { useEffect, useState } from 'react'
import './ProductCard.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
export const ProductCard = ({ wishList, setWishList, products, cartItems, setCartItems, product, setProducts }) => {
  // const curProduct = product;
  // const [addButton, setAddButton] = useState(false);
  const [liked, setLiked] = useState(false);
  // if (!product || !product._id)
  //   return (<div>Loading...</div>);
  // useEffect(() => {
  //   cartItems.map((item) => {
  //     if (product._id == item._id)
  //       setProductIncart(true);
  //   })
  // }, []);
  // useEffect(() => {
  //   cartItems.map((item) => {
  //     const button = document.getElementById(`add-to-cart-${product._id}`);
  //     if (product._id == item._id) {
  //       button.classList.add('d-none');
  //       const element = document.getElementById(`quantity-${product._id}`);
  //       element.classList.remove('d-none');
  //       const quantityElement = document.getElementById(`quantity-value-${product._id}`);
  //       quantityElement.innerHTML = item.quantity;
  //     }
  //   })
  // }, [])
  const moveToCenterAndBounce = (elementId) => {
    // const cartElement = cartRef.current;
    const element = document.getElementById(elementId);
    if (element) {
      // Get the current position of the element
      const rect = element.getBoundingClientRect();
      const clone = element.cloneNode(true); // Clone the element to animate
      clone.style.position = "fixed";
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.transition = "all 1s ease-in-out";
      clone.style.zIndex = "3000"
      document.body.appendChild(clone); // Append to body for animation

      // Calculate the center of the screen
      const centerX = window.innerWidth / 2 - rect.width / 2;
      const centerY = window.innerHeight / 2 - rect.height / 2;

      // Move to the center of the screen
      setTimeout(() => {
        // const cartElement = document.getElementById('cartItem');
        // const recty = cartElement.getBoundingClientRect();
        // console.log(recty)
        clone.style.left = '70em';
        // clone.style.right = '30em';
        clone.style.top = '-10em';
        // clone.style.bottom = '97em';
      }, 0);


      // Add bounce effect once it reaches the center
      // clone.addEventListener("transitionend", () => {
      // box.innerHTML = '<i class="bi bi-box2 fa-4x text-success"></i>';
      setTimeout(() => {
        clone.classList.add('add-to-cart-card');
        setTimeout(() => {
          document.body.removeChild(clone);
        }, 1000)
      }, 0)
      // body.appendChild(box);
      // box.classList.add('add-to-cart-animation');
      clone.addEventListener("animationend", () => {
        //   box.classList.remove('add-to-cart-animation');
        //   box.addEventListener('animationend', () => {
        //     body.removeChild(box);

        //   }, { once: true })
      });
      // }, { once: true });

      // Remove the element after the animation
      // setTimeout(() => {

      // }, 1500)
      setTimeout(() => {
      }, 2000); // Adjust time to match animation duration
    }
  };
  const handleAddToCart = (product) => {
    console.log("Product", product);
    var quantity = 0;
    var items = [...cartItems];
    let found = false;
    setWishList(wishList.filter(item => item._id !== product._id));
    items = items.map((item) => {
      if (item._id === product._id) {
        found = true;
        quantity = item.quantity + 1;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    })
    if (!found) {
      items.push({ quantity: 1, ...product });
      quantity = 1;
    }
    // Animate the button (could add more complex animations here)
    const button = document.getElementById(`add-to-cart-${product._id}`);
    if (button) {
      // const body = document.querySelector('body');
      // const box = document.createElement('div');
      // box.innerHTML = '<i class="bi bi-box2 fa-4x text-success"></i>';
      moveToCenterAndBounce(product._id);
    }

    setCartItems(items);
    // setProducts(products.map((item) => {
    //   if (item._id == product._id)
    //     return { inCart: 1, ...item };
    // }))
    // setAddButton(true)
    // button.classList.add('d-none');
    // const element = document.getElementById(`quantity-${product._id}`);
    // element.classList.remove('d-none');
    // const quantityElement = document.getElementById(`quantity-value-${product._id}`);
    // if (quantityElement)
    // quantityElement.innerHTML = quantity;
    // alert("Item Added");
  }
  const handleAddButton = (productId) => {
    var items = [...cartItems];
    items = items.map((item) => {
      var quantity = item.quantity;
      if (item._id === productId) {
        if (item.quantity < product.countInStock)
          quantity = item.quantity + 1;
        else
          alert("Product Stock Completed")
        return { ...item, quantity: quantity };
      }
      return item;
    })
    setCartItems(items);
  }
  const handleMinusButton = (productId) => {
    var quantity;
    var items = [...cartItems];
    items = items.map((item) => {
      if (item._id === productId) {
        quantity = item.quantity - 1;
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    })
    items = items.filter((item) => {
      if (item.quantity != 0)
        return item;
    })
    setCartItems(items);
    // if (quantity == 0) {
    //   const button = document.getElementById(`add-to-cart-${product._id}`);
    //   button.classList.remove('d-none');
    //   const element = document.getElementById(`quantity-${product._id}`);
    //   element.classList.add('d-none');
    // }
    // else {
    //   const quantityElement = document.getElementById(`quantity-value-${product._id}`);
    //   if (quantityElement)
    //     quantityElement.innerHTML = quantity;
    // }
  }
  const handleHeartIconClick = (id, product) => {
    const element = document.getElementById(id);
    element.classList.add('bounce');
    setTimeout(() => {
      element.classList.remove('bounce');
    }, 500);
    if (product.inCart > 0) {
      alert("Already in Cart")
      return;
    }
    if (liked == false) {
      var items = [...wishList];
      items.push(product);
      setWishList(items);
    }
    else {
      var items = [...wishList];
      items = items.filter((item) => {
        if (item._id != product._id)
          return item;
      })
      setWishList(items);
    }
    setLiked(!liked);
  }
  return (
    <div id={product._id} className="product-card">
      {product.inWishlist ?
        <FontAwesomeIcon id={`${product._id}heart`} onClick={() => handleHeartIconClick(`${product._id}heart`, product)} className='userHeartIcon text-danger' color='white' icon={faHeart} /> :
        <FontAwesomeIcon id={`${product._id}heart`} onClick={() => handleHeartIconClick(`${product._id}heart`, product)} className='userHeartIcon text-danger' color='white' icon={outlineHeart} />}

      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name"><Link to={`/product/${product._id}`} className='product-name'>{product.name}</Link></h3>
      <p className='product-description'>{product.description}</p>
      <h5 className="product-price">&#8377;{product.price}</h5>
      {product.countInStock != 0 && product.countInStock < 3 && <div className='fewLeftTag'>Only few left</div>}
      {
        product.countInStock == 0 ? <Button className='btn-danger disabled'>Out of Stock</Button> :
          <>
            {
              product.inCart ?
                <div id={`quantity-${product._id}`} className='plus-minus-button d-flex justify-content-between'>
                  <button className='btn text-light' onClick={() => handleMinusButton(product._id)}><i class="bi bi-dash fa-2x" /></button>
                  <div id={`quantity-value-${product._id}`} style={{ paddingLeft: '1.3em', fontSize: '2em', paddingRight: '1.3em', marginTop: '.2em' }}>{product.inCart}</div>
                  <button className='btn text-light' onClick={() => handleAddButton(product._id)}><i class="bi bi-plus fa-2x" /></button>
                </div>
                :
                <Button
                  id={`add-to-cart-${product._id}`}
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  <div><FontAwesomeIcon icon={faShoppingCart} className='' /><span className='ml-2'>Add to Cart</span></div>
                </Button>
            }
          </>

      }


    </div>
  )
} 
