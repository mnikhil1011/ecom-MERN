import {Route,Routes,BrowserRouter} from 'react-router-dom'

//pages
import Home from './pages/Home';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import Shop from './pages/user/Shop';
import ManagerHome from './pages/manager/ManagerHome';
import ManagerLogin from './pages/manager/ManagerLogin'
import ManagerSignup from './pages/manager/ManagerSignup';
import ManagerShop from './pages/manager/ManagerShop';
import AdminShop from './pages/admin/AdminShop';
import AdminLogin from './pages/admin/AdminLogin';
import UserCart from './pages/user/UserCart';
import Checkout from './pages/user/checkout';
import ProductPage from './pages/product/ProductPage';


//contexts
//import { ManagerContextProvider } from './context/managerContext';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
            <Routes>
              <Route path='/' element={< Home />}/>
              <Route path='/login' element={< Login />}/>
              <Route path='/signup' element={< Signup />}/>
              <Route path='/shop' element={< Shop />}/>
              <Route path='/manager' element={<ManagerHome/>}/>
              <Route path='/manager/login' element={<ManagerLogin/>}/>
              
                <Route path='/manager/signup' element={<ManagerSignup/>}/>
                <Route path='/admin/shop' element={<AdminShop/>}/>
              
              <Route path='/manager/shop' element={<ManagerShop/>}/>
              <Route path='/admin/login' element={<AdminLogin/>}/>

              <Route path='/user/cart' element={<UserCart/>}/>
              <Route path='/user/checkout' element={<Checkout/>}/>
              <Route path='/product/:name' element={<ProductPage />} />

            </Routes>
        </div>  
      </BrowserRouter>
      
    </div>
  );
}

export default App;
