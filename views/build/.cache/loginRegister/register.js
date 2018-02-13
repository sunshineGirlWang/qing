/*TMODJS:{"version":1,"md5":"7296edce84c14288e70cc668bb4cd2f2"}*/
template('loginRegister/register',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,title=$data.title,locals=$data.locals,$out='';$out+='<!DOCTYPE html> <html> <head> <meta charset="UTF-8"/> <link rel="stylesheet" href="/stylesheets/bootstrap.min.css"> <link rel="stylesheet" href="/stylesheets/style.css"> <title>Qing</title> </head> <body> <div class="col-md-12"> <div class="col-md-1 mt-15px"><img src="/images/title.png" class="h-30px ver-m"></div> <ul class="nav navbar-nav col-md-11" role="tablist"> <li role="presentation" ';
if(title == "home"){
$out+='class="active"';
}
$out+=' ><a href="/">主页</a></li> ';
if(locals.islogin){
$out+=' <li role="presentation" ';
if(title == "modifyPwd"){
$out+='class="active"';
}
$out+=' ><a href="/modifyPwd">更改密码</a></li> <li role="presentation"><a href="/logout">退出</a></li> ';
}else{
$out+=' <li role="presentation" ';
if(title == "login"){
$out+='class="active"';
}
$out+=' ><a href="/login">登录</a></li> <li role="presentation" ';
if(title == "register"){
$out+='class="active"';
}
$out+=' ><a href="/register">注册</a></li> ';
}
$out+=' </ul> </div> <div class="col-md-12"> <article> <div class="container"> <form class=" col-sm-offset-4 col-sm-4 form-horizontal" role="form" method="post"> <fieldset> <div class="form-group"> <label class="col-sm-3 control-label" for="username">用户名</label> <div class="col-sm-9"> <input type="text" class="form-control" id="username" name="username" placeholder="用户名" required> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="password2">密码</label> <div class="col-sm-9"> <input type="password" class="form-control" id="password2" name="password2" placeholder="密码" required> </div> </div> <div class="form-group"> <div class="col-sm-offset-3 col-sm-9 txt-c"> <button type="submit" class="btn btn-primary mr-15px w-90px">注册</button> <button class="btn btn-close ml-15px w-90px"><a href="/">取消</a></button> </div> </div> </fieldset> </form> </div> </article> </div> </body> <script type="text/javascript" src="/javascripts/common/jquery-3.1.1.min.js"></script> <script type="text/javascript" src="/javascripts/common/bootstrap.min.js"></script> </html>';
return new String($out);
});