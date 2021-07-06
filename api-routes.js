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



module.exports = router;