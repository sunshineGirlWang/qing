;(function(window,document,undefined){
    var Eat = {};
    Eat.randomArea ="#eat_random";
    Eat.searchArea = "#eat_search";
    Eat.addArea ="#eat_add";


    Eat.init = function(){
        var self = this;
        $("[name=random_btn]",self.randomArea).unbind().bind("click",function(){
            self.randomFood();
        });
        $("input[name=allType]",self.searchArea).unbind().bind("click",function(){
            self.checkAll(Eat.searchArea,'allType','type');
        });
        $("input[name=type]",self.searchArea).unbind().bind("click",function(){
            self.isCheckAll(Eat.searchArea,'allType','type');
        });
        $("[name=search_btn]",self.searchArea).unbind().bind("click",function(){
            self.searchFood();
        });
        $("[name=selectedRandom_btn]",self.searchArea).unbind().bind("click",function(){
            self.selectedRandom();
        });
        $("[name=add_btn]",self.addArea).unbind().bind("click",function(){
            $("[name=add_food_area]",self.addArea).toggle();
        });
        $("[name=submit_btn]",self.addArea).unbind().bind("click",function(){
            self.submitFoodInfo();
        });
    };
    /**
     * 全选
     */
    Eat.checkAll = function(container,allCheckName,eachCheckName){
        var parentCheckBoxStatus = $("input[name="+allCheckName+"]",container).is(":checked");
        $("input[name="+eachCheckName+"]",container).each(function(i, ele) {
            $(ele).prop("checked",parentCheckBoxStatus);
        });
    };

    /**
     * 检查是否要全选
     */
    Eat.isCheckAll = function(container,allCheckName,eachCheckName){
        var isCheckAll = true;
        var _input = $("input[name="+eachCheckName+"]",container);

        _input.each(function(i){
            if($(this).is(":not(:checked)")){
                isCheckAll = false;
                return false;
            }
        });

        if(isCheckAll){
            $("input[name="+allCheckName+"]:not(:checked)",container).prop("checked",true);
        }else{
            $("input[name="+allCheckName+"]:checked",container).prop("checked",false);
        }
    };

    /**
     * 随机产生饭菜名
     */
    Eat.randomFood = function(){
        var showArea =  $("[name=random_show]",self.randomArea);
        showArea.html('');
        $.ajax(
            {
                type: 'get',
                url: '/toEat/random',
                data: "",
                dataType: 'json',
                success: function (respData) {
                    if(respData.data){
                        showArea.html(respData.data);
                    }else{
                        alert("无数据");
                    }
                }
            });
    };

    /**
     * 查询
     */
    Eat.searchFood = function(){
        var resultArea = $("div[name=search_result]",Eat.searchArea);
        resultArea.html('');
        var foodInput = $("input[name=foodName]",Eat.searchArea);
        var typeList = [];
        $("input[name=type]",Eat.searchArea).each(function (i,item) {
            if($(item).is(":checked")){
                typeList.push(Number($(item).val()));
            }
        });
        if(typeList.length == 0){
            alert("请输入需要查询的品类");
            return;
        }
        $("[name=selectedRandom_btn]",Eat.searchArea).hide();
        $("[name=selectedRandomShow]",Eat.searchArea).html('');
        var params = {
            "typeList": JSON.stringify(typeList),
            "foodName": foodInput.val()
        }
        $.ajax(
            {
                type: 'post',
                url: '/toEat/searchFood',
                data: params,
                dataType: 'json',
                error: function (data) {
                    console.log(data);
                    resultArea.html(data.responseText);
                    $("[name=selectedRandom_btn]",Eat.searchArea).show();
                    $("input[name=randomCheckAll]",Eat.searchArea).unbind().bind("click",function(){
                        Eat.checkAll(Eat.searchArea,'randomCheckAll','randomCheck');
                    });
                    $("input[name=randomCheck]",Eat.searchArea).unbind().bind("click",function(){
                        Eat.isCheckAll(Eat.searchArea,'randomCheckAll','randomCheck');
                    });
                }
            });
    };

    /**
     * 添加菜品
     */
    Eat.submitFoodInfo = function(){
        var self = this;
        var type = $("select[name=type]",self.addArea).find("option:selected").val();
        if(type == "0"){
            alert("请选择分类");
            return;
        }
        var food = $("input[name=food_name]",self.addArea).val();
        if(!food){
            alert("请输入饭菜名");
            return;
        }
        var submitParams = {
            "type": Number(type),
            "food": food,
            "detail": $("[name=describe]",self.addArea).val()||null
        };
        console.log(submitParams);

        $.ajax(
            {
                type: 'post',
                url: '/toEat/addFood',
                data: submitParams,
                dataType: 'json',
                error: function (data) {
                    if(data){
                        $("input,textarea",self.addArea).val('');
                        $("select[name=type]",self.addArea).val(0);
                    }else{
                       alert("添加不成功");
                    }
                }
            });
    };

    /**
     *可选择的随机
     */
    Eat.selectedRandom = function(){
        var selected = [];
        $("input[name=randomCheck]:checked",Eat.searchArea).each(function(i,item){
            var _tr = $(item).closest("tr");
            var itemObject = {};
            itemObject.key = _tr.attr("index");
            itemObject.val = $.trim($("td[name=food]",_tr).text());
            selected.push(itemObject);
        });
        if(selected.length == 0){
            alert("请先选择要随机的菜名");
            return;
        }
        var randomFood ="";
        var randomNum = Math.round(Math.random()*(selected.length-1)+1);
        for(var i = 0;i < selected.length;i++){
            if(randomNum == selected[i].key){
                randomFood = selected[i].val;
            }
        }
        //结果展示
        $("tr",Eat.searchArea).each(function(e,ele){
           if(randomFood && $(ele).attr("index") == randomNum){
              $(ele).css("background-color","pink");
           }else{
               $(ele).removeAttr("style")
           }
        });
        if(!randomFood){
            $("[name=selectedRandomShow]",Eat.searchArea).html("<span><strong>随机结果：</strong>暂无结果</span>");
        }else{
            $("[name=selectedRandomShow]",Eat.searchArea).html("<span><strong>随机结果：</strong>"+randomFood+"</span>");
        }
    };


    window.Eat = Eat;
})(window,document);









