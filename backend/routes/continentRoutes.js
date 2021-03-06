import express from 'express'
const router = express.Router()

const {
  authenticationCheck,
  adminCheck,
} = require('../middlewares/authMiddleware')
const {
  showAll,
  add,
  show,
  remove,
  update,
  getCountries
} = require('../controllers/continentControllers')

router.post('/continent', authenticationCheck, adminCheck, add)
router.get('/continents', showAll)
router.get('/continent/:slug', show)
router.put('/continent/:slug', authenticationCheck, adminCheck, update)
router.delete('/continent/:slug', authenticationCheck, adminCheck, remove)
router.get('/continent/countries/:_id', getCountries)

module.exports = router
