const express = require('express')
const path = require('path')
const fs = require('fs')
const nunjucks = require('nunjucks')
const bcrypt = require('bcryptjs');
const app = express()
const port = 3000

app.set('views', path.join(__dirname, '/views/'))

let env = nunjucks.configure('views', {
    express: app,
    autoescape: true
})

app.set('view engine', 'html')

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())


app.get('/', (req, res) => {
  res.render('index.html')
})

app.get('/greeting', (req, res) => {
    res.render('greeting.html', {name: req.query.name, age: req.query.age})
})



app.get('/register', (req, res) => {
  res.render('register.html') 
})

app.post('/register', (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})