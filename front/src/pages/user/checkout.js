import { useNavigate } from "react-router-dom"

const Checkout=()=>{
  const navigate=useNavigate()
  const gotoshop=()=>{
    navigate('/shop');
  }
  return (
    <div>
      <h1>checkout successful</h1>
      <button onClick={gotoshop}>go back to shop</button>
    </div>
  )
}

export default Checkout;