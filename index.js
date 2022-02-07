const express = require('express')
const path = require('path')
const fs = require('fs')
const nunjucks = require('nunjucks')
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


let posts = require('./controllers/PostController.js');
app.use('', posts);

let home = require('./controllers/HomeController.js');
app.use('', home);

let auth = require('./controllers/AuthController.js');
app.use('', auth);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})