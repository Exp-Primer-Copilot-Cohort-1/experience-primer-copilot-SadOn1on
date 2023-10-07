//create web server
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//set the view engine to ejs
app.set('view engine', 'ejs');

//use res.render to load up an ejs view file
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/comments', function(req, res) {
  pool.query('SELECT * FROM comments', (error, results) => {
    if (error) {
      throw error
    }
    res.render('pages/comments', { results: results.rows });
  })
});

app.get('/comments/:id', function(req, res) {
  const id = req.params.id;
  pool.query('SELECT * FROM comments WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.render('pages/comments', { results: results.rows });
  })
});

app.post('/comments', function(req, res) {
  const comment = req.body.comment;
  pool.query('INSERT INTO comments (comment) VALUES ($1)', [comment], (error, results) => {
    if (error) {
      throw error
    }
    res.redirect('/comments');
  })
});

app.listen(port, function() {
  console.log('Server is running on port ' + port);
});