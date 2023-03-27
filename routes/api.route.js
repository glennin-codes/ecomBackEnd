const addProducts = require('../controllers/AddProduct');
const loginUser = require('../controllers/auth/login');
const { registerUser } = require('../controllers/auth/regester');
const verifyCode = require('../controllers/auth/verifyingCode');
const deleteProduct = require('../controllers/deleteProduct');
const getAllProducts = require('../controllers/getAllProduct');
const getSingleProduct = require('../controllers/getSingleProduct');
const updateProduct = require('../controllers/updateProduct');
const deleteUser = require('../controllers/User/DeleteUser');
const getAllUsers = require('../controllers/User/getAllUser');
const getSingleUser = require('../controllers/User/getSingleUser');
const UpdateUser = require('../controllers/User/UpdateUser');
const Emailer = require('../Emails/Contactus/emailer');


const authenticateToken = require('../Middleware/AuthMiddleware');
const router = require('express').Router();

router.get('/', async (_req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.post('/addProduct',authenticateToken,addProducts)
router.post('/verifyCode',verifyCode)
router.post('/email/contactUs',Emailer)
router.get('/products/:dataAmount',getAllProducts)
router.route('/product/:id').get(getSingleProduct).delete(authenticateToken,deleteProduct).patch(authenticateToken,updateProduct)
router.route('/user/:id').put(authenticateToken,UpdateUser).delete(authenticateToken,deleteUser).get(getSingleUser);
router.route('/user/').get(getAllUsers).post(registerUser).post(loginUser);


module.exports = router;
