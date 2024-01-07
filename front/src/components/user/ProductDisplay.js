import { useState } from "react"

const ProductDisplay=({product,navigate})=>{
  const [quantity,setQuantity]=useState(0);
  const [errDisplay,seterrDisplay]=useState('');
  const [addedtocart,setAddedtocart]=useState(false);
  const addtocart=async(e)=>{
    e.preventDefault();
    const name=product.name;
    const item={name,quantity};
    const response = await fetch('/api/user/addtocart',{
      method: 'POST',
      body:JSON.stringify(item),
      headers:{
        'Content-type':'application/json'
      }
    })

    const json=await response.json();
    if(response.ok){
      console.log(json);
      setAddedtocart(true);
    }
    else{
      console.log(json.error);
      //console.log(json);
      seterrDisplay(json.error);
    }

  }

  const acceptadded=(e)=>{
    e.preventDefault();
    setQuantity(0);
    seterrDisplay('');
    setAddedtocart(false);
  }
  const gotoProd=(e)=>{
    e.preventDefault();
    return navigate(`/product/${product.name}`)
  }
  

  return(
    <div>
      <div>
        <h3>name :{product.name} </h3>
        <p>category : {product.category}</p>
      </div>
      {
        !addedtocart &&
        <div>
          <label>quantity to add to cart : </label>
          <input
            value={quantity}
            onChange={(e)=>{setQuantity(e.target.value)}}
          />
          <button onClick={(e)=>{addtocart(e)}}>add</button>
          <button onClick={(e)=>{gotoProd(e)}}>see details</button>
          {errDisplay && <p>{errDisplay}</p>}
        </div>
      }
      {
        addedtocart &&
        <div>
          <label>added to cart</label>
          <button onClick={(e)=>{acceptadded(e)}}>ok</button>
        </div>  
      }
      
    </div>
  )
}
export default ProductDisplay