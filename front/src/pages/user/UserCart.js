import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProducts from "../../components/user/CartProducts";

const UserCart=()=>{

  const navigate=useNavigate();
  const [products,setProducts]=useState([]);

  const gotoshop=()=>{
    navigate('/shop');
  }

  const gotoCheckout=async()=>{
    

    const response=await fetch('/api/user/checkout',{
      method:'DELETE',
      headers:{
        'Content-type':'application/json'
      }
    })
    const json=await response.json();
    console.log(json);


    navigate('/user/checkout');

  }

  useEffect(()=>{
    const getProducts=async()=>{

      const response=await fetch('/api/user/cart',{
        method:'GET',
        headers:{
          'Content-type':'application/json'
        } 
      })
      const json=await response.json();
      const user=json.user;

      console.log(json);
      console.log("ok"); 
      setProducts(user.cart);
      console.log(products);
    }
 
    getProducts()

  },[])

  return(
    <div>
      <button onClick={gotoshop}>go back to product page</button>
      <h2>your cart</h2>
      {products && 
      <div>
      <div>
        {products.map((product)=>(<CartProducts key={product.name} product={product} products={products} setProducts={setProducts} /> ))}
      </div>  
      <div>
        <button onClick={gotoCheckout}>checkout</button>
      </div>  
      </div>}
      {!products && <h4>empty cart </h4>}
    </div>
  )

}

export default UserCart;