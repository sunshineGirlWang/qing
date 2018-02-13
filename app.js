var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
//  需要添加的
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); 
//app.set("view engine","ejs");
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());//注释了
app.use(express.static(path.join(__dirname, 'public')));

//需要修改的
app.use(cookieParser("An"));
//需要添加的
app.use(session({
  secret:'an',
  resave:false,
  saveUninitialized:true
}));

app.use('/', index);
app.use('/users', users);
//app.use('/', routes);  // 即为为路径 / 设置路由
//app.use('/users', users); // 即为为路径 /users 设置路由
app.use('/login',index); // 即为为路径 /login 设置路由
app.use('/register',index); // 即为为路径 /register 设置路由
app.use('/home',index); // 即为为路径 /home 设置路由
app.use("/logout",index); // 即为为路径 /logout 设置路由
app.use("/searchAttendance",index); // 即为为路径 /searchAttendance 设置路由
app.use("/toEat",index); // 即为为路径 /searchAttendance 设置路由

// catch 404 and forward to error handler
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

//设置端口号
var server = app.listen(1119, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Program Qing listening at http://%s:%s', host, port);
});

module.exports = app;
