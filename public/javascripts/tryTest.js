/**
 * Created by wangqingqing3 on 2017/7/1.
 */
/**
 * Created by wangqingqing3 on 2017/6/30.
 */
;(function(window,document,undefined){
    var TryTest = {};


    TryTest.init = function(){
        var self = this;
        $(".try_remark").unbind().bind("click",function(){
            $("#try_slide").find("li").removeClass("active");
            $(this).parent().addClass("active");
            $("#try_main").html(template("try/tryTest/remark"));
        });
        $(".try_requirement").unbind().bind("click",function(){
            $("#try_slide").find("li").removeClass("active");
            $(this).parent().addClass("active");
            $("#try_main").html(template("try/tryTest/requirement"));
        });
        $(".try_gain").unbind().bind("click",function(){
            $("#try_slide").find("li").removeClass("active");
            $(this).parent().addClass("active");
            $("#try_main").html(template("try/tryTest/gain"));
        });
        $(".try_remark").click();
    };




    window.TryTest = TryTest;
})(window,document);









