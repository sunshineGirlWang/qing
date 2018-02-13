;(function(window, document, undefined) {
var Main = {};
Main.preffix = "Main_";
Main.urlConfig = {
	//batchInquiryUrl: Confirm.path_config+'/manage/confirm/inquiry',	
};
document.getElementsByName("login_start").click(function(){
	window.open("../login");
});
/*document.extend(Main, {
	init: function(){
		document.getElementByName("login_start").unbind("click").click(function(){
			window.open("../login");
		});
	}


});*/

window.Main = Main;
})(window, document);