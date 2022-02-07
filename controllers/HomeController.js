let express = require('express');
let router  = express.Router();

router.get('/', (req, res) => {
    res.render('index.html');
});
  
router.get('/greeting', (req, res) => {
    res.render('greeting.html', {name: req.query.name, age: req.query.age});
});


module.exports = router;