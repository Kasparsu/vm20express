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


app.get('/', (req, res) => {
  res.render('index.html')
})

app.get('/greeting', (req, res) => {
    res.render('greeting.html', {name: req.query.name, age: req.query.age})
})

app.get('/posts', (req, res) => {
  let json = fs.readFileSync(path.join(__dirname, 'data/posts.json'));
  let posts = JSON.parse(json);
  res.render('posts.html', {posts}) // same as {posts: posts}
})

app.get('/posts/new', (req, res) => {
  res.render('newpost.html') 
})

app.post('/posts/new', (req, res) => {
  let json = fs.readFileSync(path.join(__dirname, 'data/posts.json'));
  let posts = JSON.parse(json);
  posts.push(req.body);
  json = JSON.stringify(posts);
  fs.writeFileSync(path.join(__dirname, 'data/posts.json'), json);
  res.redirect('/posts');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})