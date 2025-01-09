const handleAddToCart = (product, cartItems, setCartItems) =>{
    var items = [...cartItems];
    let found = false;
    items = items.map((item)=>{
      if(item._id === product._id){
        found = true;
        let value = item.quantity+1;
        // console.log("Value", value);
        return {...item, quantity: item.quantity + 1};
      }
      return item;
    })
    if(!found)
    items.push({quantity:1,...product});
    setCartItems(items);
    // const element = document.getElementById(product._id).cloneNode(true);
    const element = document.createElement('div')
    element.innerText = 'Item Added';
    element.classList.add('zoom');
    document.getElementById('container').appendChild(element);
    console.log(items);
//     const addToCart = async() =>{
//      const userData = sessionStorage.getItem('userInfo');
//      const {_id, cart} = JSON.parse(userData);
//      await axios.post('http://localhost:8080/api/users/addToCart', {
//        _id,
//        product
//      })
//    }
//    addToCart();
  }

  exports.module = {handleAddToCart};