/*TMODJS:{"version":1,"md5":"7de368461b74957bfc141b182444183a"}*/
template('eat/searchEat',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,locals=$data.locals,user=$data.user,foodType=$data.foodType,f=$data.f,$out='';$out+='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <link rel="stylesheet" href="/stylesheets/bootstrap.min.css"> <link rel="stylesheet" href="/stylesheets/style.css"> <title>';
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
$out+=' ><a href="/modifyPwd">更改密码</a></li> <li role="presentation"><a href="/logout">退出</a></li> <li role="presentation"><a href="/try">TRY</a></li> <li role="presentation"><a href="/searchAttendance">考勤</a></li> <li role="presentation" class="active"><a href="/toEat">吃啥呀</a></li> ';
}
$out+=' </ul> <div class="fr mt-10px mr-15px"> 当前登录人员：<strong><span name="user_name">';
$out+=$escape(user||'');
$out+='</span></strong> </div> </div> <div class="col-md-8 col-md-offset-2"> <div id="eat_random" class="col-md-12"> <div class="col-md-3 ptb-15px"> <button name="random_btn" class="btn bg-blue">随机</button> </div> <div class="col-md-9" name="random_show"> </div> </div> <div class="col-md-12"> <div class="col-md-5 mt-10px" style="border: 1px dashed #ccc;"></div> <div class="col-md-2 txt-c">~~我是分界线~~</div> <div class="col-md-5 mt-10px" style="border: 1px dashed #ccc;"></div> </div> <div id="eat_search" class="col-md-12 ptb-15px"> <div class="col-md-12"> <span> <input type="checkbox" name="allType" checked /> <label class="mb-0px">全部</label> </span> ';
if(foodType && foodType.length){
            for(var f=0;f < foodType.length;f++){
$out+=' <span class="ml-5px"> <input type="checkbox" name="type" value="';
$out+=$escape(foodType[f].key||'');
$out+='" checked /> <label class="mb-0px">';
$out+=$escape(foodType[f].val||'');
$out+='</label> </span> ';
}}
$out+=' </div> <div class="col-md-12 plr-0"> <div class="col-md-3 ptb-15px"> <input name="foodName" class="form-control" placeholder="请输入想要吃的菜名"/> </div> <div class="col-md-3 ptb-15px"> <button name="search_btn" class="btn bg-pink">查询</button> <button name="selectedRandom_btn" class="btn bg-blue ml-30px" style="display: none;">可选择的随机</button> </div> <div class="col-md-3 ptb-15px" name="selectedRandomShow" style="line-height: 32px;"></div> </div> <div name="search_result" class="col-md-12 ptb-15px" style="max-height: 500px;overflow-x: auto"> </div> </div> ';
if(user && user == "root"){
$out+=' <div class="col-md-12"> <div class="col-md-5 mt-10px" style="border: 1px dashed #ccc;"></div> <div class="col-md-2 txt-c">~~我是分界线~~</div> <div class="col-md-5 mt-10px" style="border: 1px dashed #ccc;"></div> </div> <div class="nav-wrapper"> <ul class="nav nav-tabs nav-justified"> <li><a>添加菜品</a></li> <li><a>修改菜品</a></li> </ul> </div> <div id="eat_add" class="col-md-12 mb-15px"> <div class="col-md-12 mt-15px"><button class="btn bg-pink" name="add_btn">添加菜品</button></div> <div class="col-md-12 mt-15px" name="add_food_area" style="display: none;border:1px solid #ccc"> <div class="col-md-12"> <div class="col-md-2 plr-0 ptb-15px"> <label class="col-md-4 control-label"><span class="red">*</span>分类：</label> <div class="col-md-8"> <select name="type" class="form-control"> <option value="0">请选择</option> <option value="1">面食</option> <option value="2">快餐便当</option> <option value="3">炒菜</option> <option value="4">小吃</option> <option value="5">甜点</option> <option value="6">其它</option> </select> </div> </div> <div class="col-md-6 plr-0 ptb-15px"> <label class="col-md-2 control-label"><span class="red">*</span>饭菜名：</label> <div class="col-md-10"> <input name="food_name" class="form-control" /> </div> </div> <div class="col-md-2 plr-0 ptb-15px"> <button name="submit_btn" class="btn bg-pink">提交</button> </div> </div> <div class="col-md-12"> <div class="col-md-8 plr-0 ptb-15px"> <label class="col-md-1 control-label">描述：</label> <div class="col-md-11"> <textarea name="describe" class="form-control" style="height: 80px;resize: none"></textarea> </div> </div> </div> </div> </div> ';
}
$out+=' </div> </body> <script type="text/javascript" src="/javascripts/common/jquery-3.1.1.min.js"></script> <script type="text/javascript" src="/javascripts/eat.js"></script> <script type="text/javascript"> $(document).ready(function(){ Eat.init(); }); </script> </html>';
return new String($out);
});