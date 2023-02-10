const addProducts = require('../controllers/AddProduct');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.post('/addProduct',addProducts)
module.exports = router;
