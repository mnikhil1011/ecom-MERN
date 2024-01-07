import { useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react'
import ManagerDisplay from "../../components/admin/ManagerDisplay";
//import { UseManagerContext } from "../../context/managerContext";

const AdminShop = () => {
	//const {managers,setManagers}=UseManagerContext();
	const [managers,setManagers]=useState([])
	const navigate=useNavigate()
	const logoutAdmin=async ()=>{
		  await fetch('/api/admin/logout', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			}
		})
		console.log("logged out")
		return navigate('/');
		
	}
	const GetManagers=async()=>{
		console.log("getting managers here1")
		const response = await fetch('/api/manager/all', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			}
		})
		const json =await  response.json()

		if (response.ok) {
			console.log(json)
			setManagers(json);
		}
		else {
			console.log(json.error)
		}

	}
	
	useEffect(()=>{
		GetManagers();

		const intervalId = setInterval(GetManagers,  10 * 1000);

    return () => clearInterval(intervalId);
	},[])

	return (
		<div>
			<div>
				<button onClick={logoutAdmin}>sign out</button>
			</div>
			<h1>this is the list of managers</h1>
			<div>
				{managers && managers.map((manager)=>(
					<ManagerDisplay key={manager.emailID} manager={manager} setManagers={setManagers} managers={managers} />
				))}
			</div>
		</div>
	)
}

export default AdminShop