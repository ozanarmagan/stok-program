let router = require('express').Router();
let fs = require('fs');
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = `./images`
        fs.mkdirSync(path, { recursive: true })
        return cb(null, 'images/')
    },
    filename: function(req, file, cb) {   
        cb(file.originalname);
    }
});





let upload = multer({ storage});


/* USER ROUTES */

let userController = require('./controllers/userController');
router.get('/', (req,res) => {
    console.log(":D");
    res.json({
        status:'OK',
        message: 'API V1.1'
    });
});

router.route('/login')
    .get(userController.login)
    .post(userController.login);

router.route('/users')
    .get(userController.index);

router.route('/register')
    .get(userController.register)
    .post(userController.register);

router.route('/whoami')
    .get(userController.whoami);

router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.edit)
    .put(userController.edit);

/* BILL ROUTES */
var billController = require("./controllers/billController");

router.route('/bills')
    .get(billController.index)
    .post(billController.new)

router.route('/bills/:bill_id')
    .get(billController.view)
    .post(billController.edit)
    .patch(billController.edit)
    .put(billController.edit)
    .delete(userController.delete);

/* CARD ROUTES */
var cardController = require("./controllers/cardController");

router.route('/cards')
    .get(cardController.index)
    .post(cardController.new)

router.route('/cards/:card_id')
    .get(cardController.view)
    .post(cardController.edit)
    .patch(cardController.edit)
    .put(cardController.edit)
    .delete(cardController.delete);

/* CATEGORY ROUTES */
var categoryController = require("./controllers/categoryController");

router.route('/categories')
    .get(categoryController.index)
    .post(categoryController.new)

router.route('/categories/:category_id')
    .get(categoryController.view)
    .post(categoryController.edit)
    .patch(categoryController.edit)
    .put(categoryController.edit)
    .delete(categoryController.delete);

/* COMPANY CUSTOMER ROUTES */
var companyCustomerController = require("./controllers/companyCustomerController");

router.route('/company')
    .get(companyCustomerController.index)
    .post(companyCustomerController.new)

router.route('/company/:company_id')
    .get(companyCustomerController.view)
    .post(companyCustomerController.edit)
    .patch(companyCustomerController.edit)
    .put(companyCustomerController.edit)
    .delete(companyCustomerController.delete);

/* COMPANY ROUTES */
var companyController = require("./controllers/companyController");

router.route('/us')
    .get(companyController.index)
    .post(companyController.new)

router.route('/us/:company_id')
    .get(companyController.view)
    .post(companyController.edit)
    .patch(companyController.edit)
    .put(companyController.edit)
    .delete(companyController.delete);

/* CUSTOMER ROUTES */
var customerController = require("./controllers/customerController");

router.route('/customer')
    .get(customerController.index)
    .post(customerController.new)

router.route('/customer/:customer_id')
    .get(customerController.view)
    .post(customerController.edit)
    .patch(customerController.edit)
    .put(customerController.edit)
    .delete(customerController.delete);

/* INDENTURE ROUTES */
var indentureController = require("./controllers/indentureController");

router.route('/indentures')
    .get(indentureController.index)
    .post(indentureController.new)

router.route('/indentures/:indenture_id')
    .get(indentureController.view)
    .post(indentureController.edit)
    .patch(indentureController.edit)
    .put(indentureController.edit)
    .delete(indentureController.delete);

/* ORDER ROUTES */
var orderController = require("./controllers/orderController");

router.route('/orders')
    .get(orderController.index)
    .post(orderController.new)

router.route('/orders/:order_id')
    .get(orderController.view)
    .post(orderController.edit)
    .patch(orderController.edit)
    .put(orderController.edit)
    .delete(orderController.delete);

/* PAYMENT ROUTES */
var paymentController = require("./controllers/paymentController");

router.route('/payments')
    .get(paymentController.index)
    .post(paymentController.new)

router.route('/payments/:payment_id')
    .get(paymentController.view)
    .post(paymentController.edit)
    .patch(paymentController.edit)
    .put(paymentController.edit)
    .delete(paymentController.delete);

/* PRODUCT ROUTES */
var productController = require("./controllers/productController");

router.route('/products')
    .get(productController.index)
    .post(upload.single('image'),productController.new)

router.route('/products/short')
    .get(productController.shortindex);

router.route('/products/:product_id')
    .get(productController.view)
    .post(upload.single('image'),productController.edit)
    .patch(upload.single('image'),productController.edit)
    .put(upload.single('image'),productController.edit)
    .delete(productController.delete);

/* DEBT ROUTES */
var debtController = require("./controllers/debtController");

router.route('/debts')
    .get(debtController.index)
    .post(debtController.new)

router.route('/debts/:debt_id')
    .get(debtController.view)
    .post(debtController.edit)
    .patch(debtController.edit)
    .put(debtController.edit)
    .delete(debtController.delete);



/* DASHBOARD ROUTES */
var dashboardController = require("./controllers/dashboardController");

router.route('/dashboard')
    .get(dashboardController.index)
    .post(dashboardController.index)

module.exports = router;