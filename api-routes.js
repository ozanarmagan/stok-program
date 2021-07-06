let router = require('express').Router();
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
    .put(userController.edit)
    .delete(userController.delete)

module.exports = router;