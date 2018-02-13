//var express = require('express');
//var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index');
//});
/*router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});*/
//router.get('/hello', function(req, res, next) {
//  res.render('hello');
//});
//module.exports = router;



var express = require('express');
var router = express.Router();
var usr = require('dao/dbConnect');
var attendance = require('dao/attendanceDao');
var eat = require('dao/eatDao');
var tryDto = require('dao/tryDao');

router.get('/', function(req, res) {
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    res.render('index', { title: 'home',user:res.locals.islogin});
});

//登录
router.route('/login')
    .get(function(req, res) {
        if(req.session.islogin){
            res.locals.islogin = req.session.islogin;
        }
        if(req.cookies.islogin){
            req.session.islogin = req.cookies.islogin;
        }
        res.render('loginRegister/login', { title: 'login' ,user:res.locals.islogin});
    })
    .post(function(req, res) {
       var client = usr.connect();
        var result = null;
        usr.selectFun(client,req.body.username, function (result) {
            if(result[0] === undefined){
                res.send('没有该用户');
            }else{
                if(result[0].pwd === req.body.password){//密码正确
                    req.session.islogin = req.body.username;
                    res.locals.islogin = req.session.islogin;
                    res.cookie('islogin',res.locals.islogin,{maxAge:60000});//设置最大缓存时长
                    res.redirect('/');
                }else{
                    res.redirect('/login');
                }
               }
        });
    });

//退出已登录状态
router.get('/logout', function(req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

//注册
router.route('/register')
    .get(function(req,res){
        res.render('loginRegister/register',{title:'register'});
    })
    .post(function(req,res) {
        var client = usr.connect();
        console.log(req);
        usr.insertFun(client,req.body.username ,req.body.password2, function (err) {
              if(err) throw err;
              res.send('注册成功');
        });
    });

//更改密码
router.route('/modifyPwd')
    .get(function(req,res){
        if(req.session.islogin){
            res.locals.islogin = req.session.islogin;
        }
        if(req.cookies.islogin){
            req.session.islogin = req.cookies.islogin;
        }
        res.render('loginRegister/modifyPwd',{title:'modifyPwd',user:res.locals.islogin});
    })
    .post(function(req,res){
        var client = usr.connect();
        usr.updateFun(client,req.session.islogin,req.body.password3,function (err){
            if(err) throw err;
            res.send('更改密码成功');
        });
    });

//打开页面
router.route('/searchAttendance')
    .get(function(req,res){
        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }
        console.log("searchAttendance-------"+res.locals.islogin);
        if(res.locals.islogin){
            res.render('attendance/attendance',{title:'attendance',user:res.locals.islogin});
        }else{
            res.redirect('/');
        }
    });

//查询考勤记录
router.route('/searchAttendance/queryRecord')
    .get(function(req,res,next){
        var client = attendance.connect();
        var result = null;
        console.log("name:"+req.query.name);
        attendance.selectFun(client,req.query.name,req.query.month,req.query.type, function (result) {
            res.send(result);
        });
    });

//添加考勤记录
router.route('/searchAttendance/addRecord')
    .post(function(req,res,next){
        var client = attendance.connect();
        var result = null;
        console.log("添加入参："+req.body.name);
        attendance.insertFun(client,req.body.name,req.body.month,req.body.date,req.body.start_time,req.body.end_time,req.body.duration,req.body.type, function (result) {
            res.send(result);
        });
    });

//校验加班是否符合标准
router.route('/searchAttendance/checkOverTime')
    .get(function(req,res,next){
        var client = attendance.connect();
        var result = null;
        console.log("name:"+req.query.name);
        var data = [];
        attendance.selectOverTimeDateFun(client,req.query.name,req.query.month,req.query.type,function(result){
            if(result && result.length){
                for(var i = 0;i < result.length;i++){
                    var date = result[i].date;
                    if(date){
                        attendance.checkOverTimeFun(client,req.query.name,date, function (info) {
                            console.log("!!!!"+info[0].data);
                            var num = info[0].data;
                            if(num < 36000){
                                var meet = false;
                            }else{
                                var meet = true;
                            }
                            var check = {
                                "date": date,
                                "num": num,
                                "meet": meet
                            }
                            console.log(check);
                            data.push(check);
                        });
                    }
                }
            }
            console.log("--------------"+data);
            res.contentType('json');
            res.send(JSON.stringify(data));
        });
    });

//“吃啥呀”页面
router.route('/toEat')
    .get(function(req,res){
        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }
        if(res.locals.islogin){
            res.render('eat/searchEat',{
                title:'eat',
                user:res.locals.islogin,
                foodType: [
                    {key:1,val:'面食'},
                    {key:2,val:'快餐便当'},
                    {key:3,val:'炒菜'},
                    {key:4,val:'小吃'},
                    {key:5,val:'甜点'},
                    {key:6,val:'其它'}
                ]
            });
        }else{
            res.redirect('/');
        }
    });

//随机产生饭菜名
router.route('/toEat/random')
    .get(function(req,res,next){
        var client = eat.connect();
        var result = null;
        eat.randomFun(client,function (result) {
            res.send(result);
        });
    });

//查询有哪些可吃的饭菜
router.route('/toEat/searchFood')
    .post(function(req,res,next){
        var client = eat.connect();
        var result = null;
        eat.selectFun(client,req.body.typeList,req.body.foodName,function(result){
            console.log("result"+result);
            if(result && result.length){
                console.log("result:"+result.length);
                res.render('eat/searchFoodResult',{
                    dataArray: result
                });
            }else{
                var data = {
                    success: false,
                    msg: "无数据"
                }
                res.send(data);
            }
        });
    });

//添加菜品
router.route('/toEat/addFood')
    .post(function(req,res,next){
        var client = eat.connect();
        var result = null;
        eat.insertFun(client,req.body.type,req.body.food,req.body.detail, function (result) {
            res.send(result);
        });
    });

//展示try页面
router.route('/try')
    .get(function(req,res){
        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }
        if(res.locals.islogin){
            res.render('try/tryTry',{
                title:'try',
                user:res.locals.islogin
            });
        }else{
            res.redirect('/');
        }
    });
module.exports = router;
