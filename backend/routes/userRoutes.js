import express from 'express'
const router = express.Router()

const {
  authenticationCheck,
  adminCheck,
} = require('../middlewares/authMiddleware')
const {
  createOrUpdate,
  getUserInfo,
  applyCoupon,
  createOrder,
  fetchOrders
} = require('../controllers/userControllers')

router.post('/user/create-update', authenticationCheck, createOrUpdate)
router.post('/user/get-info', authenticationCheck, getUserInfo)
router.post('/admin/get-info', authenticationCheck, adminCheck, getUserInfo)
router.post('/user/checkout/coupon', authenticationCheck, applyCoupon)
router.post('/user/order', authenticationCheck, createOrder)
router.get('/user/orders', authenticationCheck, fetchOrders)


module.exports = router
