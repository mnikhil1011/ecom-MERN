import { useState } from "react"

const ProductDisplay=({product,setProducts,products})=>{

  const [quantity,setQuantity]=useState(0);

  const updateProduct=async (e,istrue)=>{
    e.preventDefault();
    
    if(istrue){
      let temp=parseInt(product.quantity,10)+parseInt(quantity,10)
      product.quantity=temp
    }
    else{
      product.quantity=quantity
    }

    const response = await fetch(`/api/product/updatequantity`, {
			method: 'PATCH',
			body: JSON.stringify(product),
			headers: {
				'Content-type': 'application/json',
			}
		})
		const json =await  response.json()

		if (response.ok) {
			console.log(json)
		}
		else {
			console.log(json.error)
		}
		const updatedProducts=products.map(prod=>{
      if(prod.name ===product.name)
      {
        prod.quantity=product.quantity;
      }
      return prod
    })
		setProducts(updatedProducts)
  }
  const deleteProduct=async (e)=>{
    e.preventDefault();

    const response = await fetch(`/api/product/delete`, {
			method: 'DELETE',
			body: JSON.stringify(product),
			headers: {
				'Content-type': 'application/json',
			}
		})
		const json =await  response.json()

		if (response.ok) {
			console.log(json)
      console.log("here")
		}
		else {
			console.log(json.error)
		}
		const updatedProducts=products.filter((prod)=>prod.emailID!==json.emailID)
		setProducts(updatedProducts)

  }

  return(
    <div>
      <div>
        <div>
          <h5>product name: {product.name}</h5>
        </div>
        <div>
          <p>product quantity: {product.quantity}</p>
        </div>
        <div>
          <p>product category: {product.category}</p>
        </div>
        <button onClick={deleteProduct}>delete</button>
        <div>
          <input 
            type='number'
            value={quantity}
            onChange={(e)=>{setQuantity(e.target.value)}}
          />  
          <button onClick={(e)=>{updateProduct(e,true)}}>add this amount</button>
          <button onClick={(e)=>{updateProduct(e,false)}}>set this amount</button>
          
        </div>
      </div>
    </div>
  )
}
export default ProductDisplay