const addProducts = require('../controllers/AddProduct');
const getAllProducts = require('../controllers/getAllProduct');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.post('/addProduct',addProducts)
router.get('/products',getAllProducts);
module.exports = router;
