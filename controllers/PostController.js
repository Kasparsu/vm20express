let express = require('express');
let router  = express.Router();
const path = require('path');
const fs = require('fs');
const DB = require('../database/db.js');
const db = require('../database/db.js');


router.get('/posts', (req, res) => {
    
    let db = DB.getDB();
    db.all('SELECT * FROM posts;', [], (err, results)=> {
        res.render('posts.html', {posts:results});
    });
     // same as {posts: posts}
});
  
router.get('/posts/new', (req, res) => {
    res.render('newpost.html'); 
});
  
router.post('/posts/new', (req, res) => {
    let db = DB.getDB();
    db.run('INSERT INTO posts (title, body) VALUES ($title, $body);', {
        $title: req.body.title,
        $body: req.body.body
    });
    res.redirect('/posts');
});
  
router.get('/posts/:id/edit', (req, res) => {
    let db = DB.getDB();
    db.get('SELECT * FROM posts WHERE id=?', req.params.id, (err, result) => {
        res.render('editpost.html', {post:result}); 
    });
    
});
  
router.post('/posts/:id', (req, res) => {
    let db = DB.getDB();
    db.run('UPDATE posts SET title=$title, body=$body WHERE id=$id', {
        $title: req.body.title,
        $body: req.body.body,
        $id: req.params.id
    });
    res.redirect('/posts');
});
  
router.get('/posts/:id/delete', (req, res) => {
    let db = DB.getDB();
    db.run('DELETE FROM posts WHERE id=$id', {
        $id: req.params.id
    });
    res.redirect('/posts');
});

module.exports = router;