import { NavLink } from "react-router-dom"

const Home=()=> {
  return (
    <div>
      <h1>welcome</h1>
      <div>
        <div>
          <NavLink to ='/login'>login</NavLink>
        </div>
        <div>
          <NavLink to ='/signup'>signup</NavLink>
        </div>
        <div>
          <NavLink to ='/manager'>manager home page</NavLink>
        </div>
        <div>
          <NavLink to ='/admin/login'>admin login</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home
