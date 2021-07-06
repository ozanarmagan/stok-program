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
    .get(userController.index)



module.exports = router;