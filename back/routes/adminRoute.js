const express=require('express')
const router =express.Router()

const {
	login,
	logout,
	rejectRequest,
  acceptRequest
}=require('../controllers/adminController')


router.post('/login',login)
router.get('/logout',logout)
router.delete('/reject',rejectRequest)
router.patch('/accept',acceptRequest);


module.exports = router