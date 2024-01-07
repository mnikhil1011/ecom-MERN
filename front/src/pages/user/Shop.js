import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProductDisplay from "../../components/user/ProductDisplay"

const Shop = () => {
	const navigate=useNavigate()
	const [products,setProducts]=useState([])
	const [category,setCategory]=useState([])
	const [filterinUse,setFilterinUse]=useState(false)
	const logoutUser=async ()=>{
		console.log("logged out")
		await fetch('/api/user/logout', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			}
		})
		console.log("logged out")
		return navigate('/');
		
	}
	const getProds=async()=>{
		const response =await fetch('/api/product/allproducts',{
			method:'GET',
			headers:{
				'Content-type':'application/json'
			}
		})
		const json =await response.json();
		setProducts(json);
		console.log(json);
		
	}

	const redirecttocart=()=>{
		return navigate('/user/cart')
	}
	
	const filterProducts=async ()=>{
		const response =await fetch(`/api/product/category/${category}`,{
			method:'GET',
			headers:{
				'Content-type':'application/json'
			}
		})
		const json =await response.json();
		setProducts(json);
		setFilterinUse(true);
	}
	
	const removeFilter=()=>{
		getProds();
		setFilterinUse(false);
	}
	
	useEffect(()=>{
		
		getProds();

		//const intervalId = setInterval(getProds,  10 * 1000);
    //return () => clearInterval(intervalId);
		
	},[])

	return (
		<div>
			<div>
				<button onClick={logoutUser}>sign out</button>
			</div>
			<div>
				<button onClick={redirecttocart}>go to cart</button>
			</div>
			<div>
				{
					!filterinUse &&
					<div>
							<button onClick={filterProducts}>filter based on category</button>
						<input 
							type="text"
							value={category}
							onChange={(e)=>{setCategory(e.target.value)}}
						/>
					</div>	
					
				}
				{
					filterinUse &&
					<div>
						<h3>filtered category is : {category}</h3>
						<button onClick={removeFilter}>remove filter</button>
					</div>	
				}
			</div>
			<h1>this is the shop</h1>
			<div>
				<h3>all available products</h3>
			</div>
			<div>
				{products && products.map((product)=>(
					<ProductDisplay key={product.name} product={product} navigate={navigate}  />
				))}
			</div>

		</div>
	)
}

export default Shop