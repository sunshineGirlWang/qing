/*TMODJS:{"version":1,"md5":"c53db841af9e66fcdc12f3c3f0d10785"}*/
template('attendance/attendance',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,locals=$data.locals,user=$data.user,i=$data.i,$out='';$out+='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <link rel="stylesheet" href="/stylesheets/bootstrap.min.css"> <link rel="stylesheet" href="/stylesheets/style.css"> <title>';
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
$out+=' ><a href="/modifyPwd">更改密码</a></li> <li role="presentation"><a href="/logout">退出</a></li> <li role="presentation"><a href="/try">TRY</a></li> <li role="presentation" class="active"><a href="/searchAttendance">考勤</a></li> <li role="presentation"><a href="/toEat">吃啥呀</a></li> ';
}
$out+=' </ul> <div class="fr mt-10px mr-15px"> 当前登录人员：<strong><span name="user_name">';
$out+=$escape(user||'');
$out+='</span></strong> </div> </div> <div class="col-md-8 col-md-offset-2"> <div id="attendance_search" class="col-md-12"> <div class="col-md-12 plr-0"> <div class="col-md-3 ptb-15px"> <select name="search_month" class="form-control"> <option value="-1">当前月份</option> ';
for(var i = 1;i < 13 ;i++){
$out+=' <option value="';
$out+=$escape(i);
$out+='">';
$out+=$escape(i);
$out+='月</option> ';
}
$out+=' </select> </div> <div class="col-md-3 ptb-15px"> <select name="search_type" class="form-control"> <option value="-1">全选</option> <option value="1">正常工作日</option> <option value="2">双休日</option> <option value="3">法定节假日</option> </select> </div> <div class="col-md-3 ptb-15px"> <button name="search_btn" class="btn bg-pink">查询</button> <button name="count_btn" class="btn bg-blue ml-15px" style="display: none">统计时长</button> </div> </div> <div name="search_result" class="col-md-12 ptb-15px"></div> <div name="count_result" class="col-md-12 ptb-15px"> <div name="count_result1" class="mb-5px"></div> <div name="count_result2" class="mb-5px"></div> <div name="count_result3"></div> </div> </div> <div class="col-md-12"> <div class="col-md-5 mt-10px" style="border: 1px dashed #ccc;"></div> <div class="col-md-2 txt-c">~~我是分界线~~</div> <div class="col-md-5 mt-10px" style="border: 1px dashed #ccc;"></div> </div> <div id="attendance_add" class="col-md-12 mb-15px"> <div class="col-md-12 mt-15px"><button class="btn bg-pink" name="add_btn">添加考勤信息</button></div> <div class="col-md-12 mt-15px" name="add_attendance_area" style="display: none;border:1px solid #ccc"> <div class="col-md-3 plr-0 ptb-15px"> <label class="col-md-3 control-label"><span class="red">*</span>日期：</label> <div class="col-md-9"> <input name="add_date" class="form-control" placeholder="格式为“yyyy-MM-dd”"/> </div> </div> <div class="col-md-3 plr-0 ptb-15px"> <label class="col-md-3 control-label"><span class="red">*</span>姓名：</label> <div class="col-md-9"> <input name="add_name" class="form-control" value="';
$out+=$escape(user||'');
$out+='" disabled="disabled"/> </div> </div> <div class="col-md-3 plr-0 ptb-15px"> <label class="col-md-3 control-label">上班时间：</label> <div class="col-md-9"> <input name="add_start_time" class="form-control" placeholder="格式为“hh:mm:ss”"/> </div> </div> <div class="col-md-3 plr-0 ptb-15px"> <label class="col-md-3 control-label">下班时间：</label> <div class="col-md-9"> <input name="add_end_time" class="form-control" placeholder="格式为“hh:mm:ss”"/> </div> </div> <div class="col-md-3 plr-0 ptb-15px"> <label class="col-md-3 control-label"><span class="red">*</span>类型：</label> <div class="col-md-9"> <select name="add_type" class="form-control"> <option value="1">正常工作日</option> <option value="2">双休日</option> <option value="3">法定节假日</option> </select> </div> </div> <div class="col-md-3 plr-0 ptb-15px"> <button name="submit_btn" class="btn bg-pink">提交</button> </div> </div> </div> </div> </body> <script type="text/javascript" src="/javascripts/common/jquery-3.1.1.min.js"></script> <script type="text/javascript" src="/javascripts/attendance.js"></script> <script type="text/javascript"> $(document).ready(function(){ Attendance.init(); }); </script> </html>';
return new String($out);
});