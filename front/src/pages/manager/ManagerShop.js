import { useNavigate } from "react-router-dom"
import ProductDisplay from "../../components/product/ProductDisplay"
import { useEffect, useState } from "react"

const ManagerShop = () => {
	const navigate=useNavigate()
	const [products,setProducts]=useState([]);

	const [name,setName]=useState('');
	const [quantity,setQuantity]=useState(0);
	const [category,setCategory]=useState('');
	const [errDisplay,seterrDisplay]=useState('');

	useEffect(()=>{
		const run=async()=>{
			const response=await fetch('/api/product/allmanager', {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
				}
			})
			const json=await response.json()

			if (response.ok) {
				console.log(json)
				setProducts(json);
			}
			else {
				console.log(json.error)
			}
		}
		run();

	},[])

	const logoutManager=async (e)=>{
		e.preventDefault();
		console.log("logged out")
		await fetch('/api/manager/logout', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			}
		})
		console.log("logged out")
		return navigate('/manager');
		
	}

	const addprod =async (e)=>{
		e.preventDefault();
		const product={name,quantity,category}
		const response = await fetch(`/api/product/create`, {
			method: 'POST',
			body: JSON.stringify(product),
			headers: {
				'Content-type': 'application/json',
			}
		})
		const json =await  response.json()
		if (response.ok) {
			console.log(json)
			setName('');
			setQuantity(0);
			setCategory('');
			seterrDisplay('');
			setProducts((prev)=>[...prev ,product])
		}
		else {
			console.log(json.error)
			seterrDisplay(json.error)
		}
	}


	return (
		<div>
			<div>
				<button onClick={logoutManager}>sign out</button>
			</div>
			<div>
				<h2>add product</h2>
				<form onSubmit={addprod}>
					<div>
						<label>name </label>
						<input 
            type='text'
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          	/> 
					</div>
					<div>
						<label>quantity </label>
						<input 
            type='number'
            value={quantity}
            onChange={(e)=>{setQuantity(e.target.value)}}
          	/> 
					</div>
					<div>
						<label>category </label>
						<input 
            type='text'
            value={category}
            onChange={(e)=>{setCategory(e.target.value)}}
          	/> 
					</div>
					<button> add</button>
				</form>
				<div>
					{errDisplay && <p>{errDisplay}</p>}
				</div>
			</div>
			<div>
				<h1>u have added all these products</h1>
			</div>
			<div>
				{products && products.map((prod)=>(
					<ProductDisplay key={prod.name} products={products} setProducts={setProducts} product={prod} />
				))}
			</div>
			
		</div>
	)
}

export default ManagerShop