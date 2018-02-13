/*TMODJS:{"version":1,"md5":"eb3bf9e1e00aa0058a2409abf1c7615b"}*/
template('home',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,user=$data.user,$out='';$out+='<!DOCTYPE html> <html> <head> <meta charset="UTF-8"/> <title>Test</title> <link rel="stylesheet" href="/stylesheets/style.css"> </head> <body> <header> <h1>';
$out+=$escape( title);
$out+='</h1> </header> <nav> <span><a title="主页" href="/">主页</a></span> <span><a title="登录" href="/login">登录</a></span> <span><a title="注册" href="/register">注册</a></span> </nav> <article> 用户：';
$out+=$escape( user);
$out+='<h1> 欢迎登录！！</h1> <a class="btn" href="/logout">退出</a> </article> </body> </html>';
return new String($out);
});