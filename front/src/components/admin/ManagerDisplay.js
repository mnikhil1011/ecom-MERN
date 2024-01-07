
const ManagerDisplay=({manager,setManagers,managers})=>{

  const acceptManager=async ()=>{
    const response = await fetch(`/api/admin/accept`, {
			method: 'PATCH',
			body: JSON.stringify(manager),
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
		const updatedManagers=managers.filter((man)=>man.emailID!==json.emailID)
		setManagers(updatedManagers)
  }
  const rejectManager=async ()=>{

    const response = await fetch(`/api/admin/reject`, {
			method: 'DELETE',
			body: JSON.stringify(manager),
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
		const updatedManagers=managers.filter((man)=>man.emailID!==json.emailID)
		setManagers(updatedManagers)

  }

  return(
    <div>
      <div>
        <h3>email id : </h3>
        <h3>{manager.emailID}</h3>
        <button onClick={acceptManager}>accept</button>
        <button onClick={rejectManager}>delete</button>
      </div>
    </div>
  )
}
export default ManagerDisplay