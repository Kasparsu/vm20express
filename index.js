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

app.get('/', (req, res) => {
  res.render('index.html')
})

app.get('/greeting', (req, res) => {
    res.render('greeting.html', {name: req.query.name, age: req.query.age})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})