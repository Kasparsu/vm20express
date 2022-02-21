let express = require('express');
let router  = express.Router();

router.get('/', (req, res) => {
    res.render('index.html');
});
  
router.get('/greeting', (req, res) => {
    res.render('greeting.html', {name: req.query.name, age: req.query.age});
});

router.get('/toggletheme', (req, res) => {
    if(req.cookies.dark === 'true'){
        res.cookie('dark', 'false', {maxAge: 1000*60*60*24*365*10000  }).redirect('back');
    } else {
        res.cookie('dark', 'true', {maxAge: 1000*60*60*24*365*10000 }).redirect('back');
    }
});

module.exports = router;