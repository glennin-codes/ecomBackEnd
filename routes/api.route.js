const addProducts = require('../controllers/AddProduct');
const deleteProduct = require('../controllers/deleteProduct');
const getAllProducts = require('../controllers/getAllProduct');
const getSingleProduct = require('../controllers/getSingleProduct');
const updateProduct = require('../controllers/updateProduct');
const UpdateUser = require('../controllers/User/UpdateUser');
const authenticateToken = require('../Middleware/AuthMiddleware');
const router = require('express').Router();

router.get('/', async (_req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.post('/addProduct',authenticateToken,addProducts)
router.get('/products/:dataAmount',getAllProducts)
router.route('/product/:id').get(getSingleProduct).delete(authenticateToken,deleteProduct).patch(authenticateToken,updateProduct)
router.put('/api/user/:id').put(authenticateToken,UpdateUser).delete(authenticateToken,deleteUser);


module.exports = router;
