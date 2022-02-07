let express = require('express');
let router  = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/posts', (req, res) => {
    let json = fs.readFileSync(path.join(__dirname, '../data/posts.json'));
    let posts = JSON.parse(json);
    res.render('posts.html', {posts}); // same as {posts: posts}
});
  
router.get('/posts/new', (req, res) => {
    res.render('newpost.html'); 
});
  
router.post('/posts/new', (req, res) => {
    let json = fs.readFileSync(path.join(__dirname, '../data/posts.json'));
    let posts = JSON.parse(json);
    posts.push(req.body);
    json = JSON.stringify(posts);
    fs.writeFileSync(path.join(__dirname, '../data/posts.json'), json);
    res.redirect('/posts');
});
  
router.get('/posts/:id/edit', (req, res) => {
    let json = fs.readFileSync(path.join(__dirname, '../data/posts.json'));
    let posts = JSON.parse(json);
    let post = posts[req.params.id];
    post.id = req.params.id;
    res.render('editpost.html', {post}); 
});
  
router.post('/posts/:id', (req, res) => {
    let json = fs.readFileSync(path.join(__dirname, '../data/posts.json'));
    let posts = JSON.parse(json);
    posts[req.params.id] = req.body;
    json = JSON.stringify(posts);
    fs.writeFileSync(path.join(__dirname, '../data/posts.json'), json);
    res.redirect('/posts');
});
  
router.get('/posts/:id/delete', (req, res) => {
    let json = fs.readFileSync(path.join(__dirname, '../data/posts.json'));
    let posts = JSON.parse(json);
    posts.splice(req.params.id, 1);
    json = JSON.stringify(posts);
    fs.writeFileSync(path.join(__dirname, '../data/posts.json'), json);
    res.redirect('/posts');
});

module.exports = router;