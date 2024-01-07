const express=require('express')
const router =express.Router()

const {
	signup,
	login,
	logout,
	getall
}=require('../controllers/managerController')


router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
router.get('/all',getall)




module.exports = router