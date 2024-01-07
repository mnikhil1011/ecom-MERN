import { NavLink } from "react-router-dom"

const ManagerHome=()=> {
  return (
    <div>
      <h1>welcome manager</h1>
      <div>
        <div>
          <NavLink to ='/manager/login'>login</NavLink>
        </div>
        <div>
          <NavLink to ='/manager/signup'>signup</NavLink>
        </div>
        <div>
          <NavLink to ='/'>back</NavLink>
        </div>
      </div>
    </div>
  )
}

export default ManagerHome
