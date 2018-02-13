/*TMODJS:{"version":1,"md5":"bb4b7968e40524b87f23a85694b7f41c"}*/
template('index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,title=$data.title,locals=$data.locals,$escape=$utils.$escape,user=$data.user,$out='';$out+=' <!doctype html> <html> <head> <meta name="viewport" charset="UTF-8" content="width=device-width, initial-scale=1">  <link rel="stylesheet" href="/stylesheets/bootstrap.min.css"> <link rel="stylesheet" href="/stylesheets/style.css"> <title>QING</title> </head> <body> <div name="main_page"> <div class="fl w-20p"> <img src="/images/index.jpg"> <div class="mt-20px ml-20px"> <span class="fs-20px red ver-m">Welcome to</span> <span><img src="/images/title.png" class="h-30px ver-m"></span> </div> </div> <div class="fl w-70p"> <div class="col-md-12"> <ul class="nav navbar-nav" role="tablist"> <li role="presentation" ';
if(title == "home"){
$out+='class="active"';
}
$out+=' ><a href="/">主页</a></li> ';
if(locals.islogin){
$out+=' <li role="presentation" ';
if(title == "modifyPwd"){
$out+='class="active"';
}
$out+=' ><a href="/modifyPwd">更改密码</a></li> <li role="presentation"><a href="/logout">退出</a></li> <li role="presentation"><a href="/try">TRY</a></li> <li role="presentation"><a href="/searchAttendance">考勤</a></li> <li role="presentation"><a href="/toEat">吃啥呀</a></li> ';
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
$out+=' </ul> </div> <div class="col-md-12 mt-15px"> <article> ';
 if(locals.islogin){
$out+=' <span>用户：<span class="fs-20px plr-15px violet">';
$out+=$escape( user);
$out+='</span>已经登录啦</span> ';
 }else{
$out+=' <div><btn class="btn bg-pink"><a href="/login" style="color:#FFF;">请先登录</a></btn></div> ';
}
$out+=' </article> </div> </div> <div class="fl w-10p txt-c"> <div class="">糖果色</div> <div class="bg-green m-10px h-30px">mint green</div> <div class="bg-pink m-10px h-30px">pink</div> <div class="bg-blue m-10px h-30px">powder blue</div> <div class="bg-yellow m-10px h-30px">light yellow</div> <div class="bg-red m-10px h-30px">red</div> <div class="bg-gray m-10px h-30px">gray</div> <div class="bg-violet m-10px h-30px">violet</div> </div> </div> </body> <script type="text/javascript" src="/javascripts/common/jquery-3.1.1.min.js"></script> <script type="text/javascript" src="/javascripts/common/bootstrap.min.js"></script> </html> ';
return new String($out);
});