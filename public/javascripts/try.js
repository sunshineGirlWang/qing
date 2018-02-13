/**
 * Created by wangqingqing3 on 2017/6/30.
 */
;(function(window,document,undefined){
    var Try = {};


    Try.init = function(){
        var self = this;
        self.base();
    };

    Try.base = function(){
        // 注册
        Vue.component('test-a', {
            template: '<div>A custom component!</div>'
        })
        Vue.component('test-b',{
            template: '<div>test B component~</div>'
        })
        new Vue({
            el: '#try_container',
            data:{
                showA: true,
                showB: false
            },
            methods: {
                testA : function(){
                    this.showA = true;
                    this.showB = false;
                },
                testB : function(){
                    this.showB = true;
                    this.showA = false;
                },
            }
        })

    };

    window.Try = Try;
})(window,document);









