let router = require('express').Router();

router.get('/', (req,res) => {
    res.json({
        status:'OK',
        message: 'API V1'
    });
});


module.exports = router;