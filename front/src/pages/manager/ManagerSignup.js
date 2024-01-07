import { NavLink , useNavigate} from "react-router-dom"
import { useState } from "react"
//import { UseManagerContext } from "../../context/managerContext"

const ManagerSignup = () => {
	//const {setManagers}=UseManagerContext();
	const [emailID, setEmailID] = useState('')
	const [password, setPassword] = useState('')
	const [errDisplay, seterrDisplay] = useState('')
	const navigate=useNavigate()

	const SignupFormSubmit = async (e) => {
		e.preventDefault();
		const manager = { emailID, password }
		const response = await fetch(`/api/manager/signup`, {
			method: 'POST',
			body: JSON.stringify(manager),
			headers: {
				'Content-type': 'application/json',
			}
		})
		const json =await  response.json()

		if (response.ok) {
			console.log(json)
			//setManagers((prev)=>[...prev, manager])
			return navigate("/manager")
		}
		else {
			console.log(json.error)
			seterrDisplay(json.error)
		}

	}

	return (
		<div>
			<div>
				<form className="SignupForm" onSubmit={SignupFormSubmit}>
					<div>
						<label>email id  </label>
						<input
							type="text"
							value={emailID}
							onChange={(e) => setEmailID(e.target.value)}
						/>
					</div>
					<div>
						<label>password</label>
						<input
							type='text'
							value={password}
							onChange={(e) => { setPassword(e.target.value) }}
						/>
					</div>

					<button>submit</button>
				</form>
			</div>
			<div>
				{errDisplay && <p>{errDisplay}</p>}
			</div>
			<div>
				<NavLink to='/'>back</NavLink>
			</div>
		</div>)

}

export default ManagerSignup
