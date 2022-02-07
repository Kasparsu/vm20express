let express = require('express');
let router  = express.Router();
const bcrypt = require('bcryptjs');

router.get('/register', (req, res) => {
    res.render('register.html') 
});
  
router.post('/register', (req, res) => {
    let json = fs.readFileSync(path.join(__dirname, 'data/users.json'));
    let users = JSON.parse(json);

    req.body.password = crypt(req.body.password);
    users.push(req.body);
    json = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, 'data/users.json'), json);
    res.redirect('/');
});
  
function crypt(pass){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    return hash;
}

function check(pass, hash){
    return bcrypt.compareSync(pass, hash);
}

module.exports = router;