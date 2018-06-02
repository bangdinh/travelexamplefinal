var express = require('express');
var bodyparser = require('body-parser');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var http = require('http');



var connection = require('./dbconnection');
var routes = require('./routes');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: true})); //support x-www-form-urlencoded
app.use(bodyparser.json());
 const options = {  
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
};

// app.use(express.bodyParser({uploadDir:'/path/to/temporary/directory/to/store/uploaded/files'}));

app.use('/api/utc2',routes);


// const fileUpload = require('express-fileupload'); 
// // default options
// app.use(fileUpload());
 
// app.post('/upload', function(req, res) {
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
 
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;
 
//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
//     if (err)
//       return res.status(500).send(err);
 
//     res.send('File uploaded!');
//   });
// });



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var server = http.createServer(app);
server.listen(4001);