//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//create web server
const server = app.listen(3000, function(){
    console.log('Server is running...');
});

//set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//get request for home page
app.get('/', function(req, res){
    res.render('index', {
        title: 'My Site'
    });
});

//get request for comments page
app.get('/comments', function(req, res){
    res.render('comments', {
        title: 'Comments'
    });
});

//post request for comments page
app.post('/comments', function(req, res){
    var comment = req.body.comment;
    //write to file
    fs.appendFile('comments.txt', comment + '\n', function(err){
        if(err){
            console.log(err);
        } else{
            console.log('Comment saved!');
        }
    });
    //render comments page
    res.render('comments', {
        title: 'Comments',
        comment: comment
    });
});

//get request for comments page
app.get('/comments', function(req, res){
    res.render('comments', {
        title: 'Comments'
    });
});