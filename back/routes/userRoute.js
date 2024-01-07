const express=require('express')
const router =express.Router()

const {
	usermiddle
} =require('../middleware/userMiddleware')

const {
	signup,
	login,
	logout,
	addtocart,
	cart,
	deleteFromCart,
	checkout
}=require('../controllers/userController')


router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)

router.use(['/addtocart','/cart','/cart/delete','/checkout'],usermiddle)
router.post('/addtocart',addtocart)
router.get('/cart',cart)
router.delete('/cart/delete',deleteFromCart)
router.delete('/checkout',checkout);

module.exports = router