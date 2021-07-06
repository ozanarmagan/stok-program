let router = require('express').Router();



/* USER ROUTES */

let userController = require('./controllers/userController');
router.get('/', (req,res) => {
    res.json({
        status:'OK',
        message: 'API V1'
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

/* COMPANY ROUTES */
var companyCustomerController = require("./controllers/companyCustomerController");

router.route('/categories')
    .get(companyCustomerController.index)
    .post(companyCustomerController.new)

router.route('/categories/:category_id')
    .get(companyCustomerController.view)
    .post(companyCustomerController.edit)
    .patch(companyCustomerController.edit)
    .put(companyCustomerController.edit)
    .delete(companyCustomerController.delete);


module.exports = router;