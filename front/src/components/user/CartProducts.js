
const CartProducts =({product,products,setProducts})=>{

  const deleteProduct = async(e)=>{
    e.preventDefault()
    console.log(product);
    const response = await fetch(`/api/user/cart/delete`, {
			method: 'DELETE',
			body: JSON.stringify(product),
			headers: {
				'Content-type': 'application/json',
			}
		})
    console.log(response);
    const json=await response.json()
    console.log(json);
    const updatedCart=products.filter((prod)=>prod!==product);
    setProducts(updatedCart);
  }

  return(
    <div>
      <h4>name : {product.name}</h4>
      <p>quantity : {product.quantity}</p>
      <button onClick={(e)=>{deleteProduct(e)}}>delete product </button>
    </div>
  )
}

export default CartProducts