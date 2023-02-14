const addProducts = require('../controllers/AddProduct');
const getAllProducts = require('../controllers/getAllProduct');
const getSingleProduct = require('../controllers/getSingleProduct');
const router = require('express').Router();

router.get('/', async (_req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.post('/addProduct',addProducts)
router.get('/products/:dataAmount',getAllProducts)
router.route('/product/:productId').get(getSingleProduct)



module.exports = router;
