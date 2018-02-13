/*TMODJS:{"version":1,"md5":"57b93ae5fd6eab85bf72df3ae234128c"}*/
template('eat/searchFoodResult',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,dataArray=$data.dataArray,switchType=$data.switchType,type=$data.type,typeName=$data.typeName,d=$data.d,data=$data.data,index=$data.index,name=$data.name,$escape=$utils.$escape,$out='';$out+='<table class="table table-bordered table-striped"> <thead> <tr> <th> <input type="checkbox" name="randomCheckAll" checked /> </th> <th>序号</th> <th>分类</th> <th>饭菜名</th> <th>描述</th> </tr> </thead> <tbody> ';
if(dataArray && dataArray.length){
            function switchType(type){
                var typeName = "";
                switch(type){
                    case 1: typeName = "面食";break;
                    case 2: typeName = "快餐便当";break;
                    case 3: typeName = "炒菜";break;
                    case 4: typeName = "小吃";break;
                    case 5: typeName = "甜点";break;
                    case 6: typeName = "其它";break;
                }
                return typeName;
            }
        for(var d=0;d < dataArray.length;d++){
            var data = dataArray[d];
            var index = d+1;
            var name = switchType(data.type);
$out+=' <tr index="';
$out+=$escape(index);
$out+='"> <td> <input type="checkbox" name="randomCheck" checked /> </td> <td>';
$out+=$escape(index);
$out+='</td> <td>';
$out+=$escape(name);
$out+='</td> <td name="food">';
$out+=$escape(data.food||'');
$out+='</td> <td>';
$out+=$escape(data.detail||'');
$out+='</td> </tr> ';
}}
$out+=' </tbody> </table>';
return new String($out);
});