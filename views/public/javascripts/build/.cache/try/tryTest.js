/*TMODJS:{"version":1,"md5":"f5a72c31980ee5f13b472c3884138340"}*/
template('try/tryTest',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,locals=$data.locals,user=$data.user,$out='';$out+='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <link rel="stylesheet" href="/stylesheets/bootstrap.min.css"> <link rel="stylesheet" href="/stylesheets/style.css"> <title>';
$out+=$escape(title||'');
$out+='</title> </head> <body> <div class="col-md-12 ptb-15px"> <ul class="nav navbar-nav" role="tablist"> <li role="presentation" ';
if(title == "home"){
$out+='class="active"';
}
$out+=' ><a href="/">主页</a></li> ';
if(locals.islogin){
$out+=' <li role="presentation" ';
if(title == "modifyPwd"){
$out+='class="active"';
}
$out+=' ><a href="/modifyPwd">更改密码</a></li> <li role="presentation"><a href="/logout">退出</a></li> <li role="presentation" class="active"><a href="/try">TRY</a></li> <li role="presentation"><a href="/searchAttendance">考勤</a></li> <li role="presentation"><a href="/toEat">吃啥呀</a></li> ';
}
$out+=' </ul> <div class="fr mt-10px mr-15px"> 当前登录人员：<strong><span name="user_name">';
$out+=$escape(user||'');
$out+='</span></strong> </div> </div> <div class="col-md-12" id="try_container"> <div class="col-md-2" id="try_slide"> <ul class="nav nav-list"> <li class="active"> <a class="try_remark"> <span>备忘</span> </a> </li> <li> <a class="try_requirement"> <span>需求列表</span> </a> </li> <li> <a class="try_gain"> <span>收获</span> </a> </li> </ul> </div> <div class="col-md-10" id="try_main"> </div> </div> </body> <script type="text/javascript" src="/javascripts/common/jquery-3.1.1.min.js"></script> <script type="text/javascript" src="/javascripts/tryTest.js"></script> <script type="text/javascript" src="/views/build/template.js"></script> <script type="text/javascript"> window.onload = function(){ TryTest.init(); } </script> </html>';
return new String($out);
});