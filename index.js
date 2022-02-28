const express = require('express');
const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000

app.set('views', path.join(__dirname, '/views/'))

let env = nunjucks.configure('views', {
    express: app,
    autoescape: true
});

app.set('engine', env);

app.set('view engine', 'html');

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(cookieParser());

app.use(session({secret: 'somecoolsecret'}));

app.use((req, res, next) => {
  let engine = res.app.get('engine');
  engine.addGlobal('req', req);
  console.log(req.session.user);
  next();
});

let posts = require('./controllers/PostController.js');
app.use('', posts);

let home = require('./controllers/HomeController.js');
app.use('', home);

let auth = require('./controllers/AuthController.js');
app.use('', auth);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
