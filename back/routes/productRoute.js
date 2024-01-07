const express=require('express')
const router=express.Router();

//middleware
const {
  managermiddle,
  usermiddle
}=require('../middleware/productMiddleware')

const {
  createProduct,
  deleteProduct,
  updateQuantity,
  allManager,
  allProducts,
  getdetails,
  productbyCategory
} =require('../controllers/productController');

 


router.use(['/delete','/updatequantity','/create','/allmanager'],managermiddle)

router.delete('/delete',deleteProduct)
router.patch('/updatequantity',updateQuantity)
router.post('/create',createProduct);
router.get('/allmanager',allManager)

router.use(['/allproducts'],usermiddle)
router.get('/allproducts',allProducts);

router.get('/details/:name',getdetails)
router.get('/category/:category',productbyCategory)

module.exports=router;