var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/hello', function(req, res, next) {
  res.render('hello');
});
router.route('/data')
    .get(function(req,res){
        fs.readFile('/testNode/qing/public/javascripts/data/0101/left.txt', function(err, contents) {
            res.send(JSON.parse(contents));
        });
    })
    .post(function(req,res){
        var url = req.data + "/" +req.type;
        fs.readFile('/testNode/qing/public/javascripts/data/'+url+'.txt', function(err, contents) {
            res.send(JSON.parse(contents));
        });
    });

//1、 app.method(url,[callback1,callback2...],callback)    创建路由
//对于同一个路由，支持提供两个及以上的连续的处理函数，也支持多个处理函数的数组组装形式,还支持混合形式。
// 注意：只要不是最后一个处理函数，其余函数请务必要next()
//2、express.Router() 必须以 app.use(path，Router)的形式挂载到应用app上。
//使用方法同1


module.exports = router;
