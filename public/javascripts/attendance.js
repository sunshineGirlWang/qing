;(function(window,document,undefined){
    var Attendance = {};
    Attendance.searchArea = "#attendance_search";
    Attendance.addArea ="#attendance_add";
    Attendance.attendanceArray = [];
    Attendance.switchTrClass = function(type){
        var data = "";
        switch(type){
            case "cblack" : data = 1;break;
            case "cred" : data = 2;break;
            case "cgreen" : data = 3;break;
        }
        return data;
    };
    Attendance.init = function(){
        var self = this;
        $("[name=search_btn]",self.searchArea).unbind().bind("click",function(){
            self.search();
        });
        $("[name=search_month],[name=search_type]",self.searchArea).unbind("change").bind("change",function(){
            $("[name=count_btn]",self.searchArea).hide();
        });
        $("[name=count_btn]",self.searchArea).unbind().bind("click",function(){
            self.countTime();
        });
        $("[name=add_btn]",self.addArea).unbind().bind("click",function(){
            $("[name=add_attendance_area]",self.addArea).toggle();
        });
        $("[name=submit_btn]",self.addArea).unbind().bind("click",function(){
            self.submitAttendanceInfo();
        });
    };
    /**
     * 提交考勤信息
     */
    Attendance.submitAttendanceInfo = function(){
        var self = this;
        var date = $.trim($("[name=add_date]",self.addArea).val());
        var startTime = $.trim($("[name=add_start_time]",self.addArea).val());
        var endTime = $.trim($("[name=add_end_time]",self.addArea).val());
        var month = date.substring(5,7);
        //计算总时长
        if(startTime && endTime){
            var hour = parseInt(endTime.substring(0,2))-parseInt(startTime.substring(0,2));//小时
            var minute = parseInt(endTime.substring(3,5))-parseInt(startTime.substring(3,5));//分钟
            var second = parseInt(endTime.substring(6,8))-parseInt(startTime.substring(6,8));//秒
            var duration = hour*3600+minute*60+second;
        }
        var submitParams = {
            "date": date||null,
            "name": $("[name=add_name]",self.addArea).val()||null,
            "month": month?Number(month):null,
            "start_time": startTime,
            "end_time": endTime,
            "duration": duration?duration:0,
            "type": Number($("[name=add_type]",self.addArea).find("option:selected").val())
        };
        console.log(submitParams);

        $.ajax(
            {
                type: 'post',
                url: '/searchAttendance/addRecord',
                data: submitParams,
                dataType: 'json',
                error: function (data) {
                    if(data){
                       alert(data);
                        $("input",self.addArea).val('');
                        $("[name=add_name]",self.addArea).val($.trim($("[name=user_name]").text()));
                    }else{
                        console.log("添加成功");
                    }
                }
            });
    };
    /**
     * 查询考勤情况
     */
    Attendance.search = function(){
        var self = this;
        var month = $("[name=search_month]",self.searchArea).find("option:selected").val();
        if(month == "-1"){
            month = new Date().getMonth()+1;
        }
        var searchParams = {
            "name": $.trim($("[name=user_name]").text()),
            "month": Number(month),
            "type": Number($("[name=search_type]",self.searchArea).find("option:selected").val())
        };
        $.ajax(
            {
                type: 'get',
                url: '/searchAttendance/queryRecord',
                data: searchParams,
                dataType: 'json',
                success: function (respData) {
                    for(var c= 0;c < 4;c++){
                        $("[name=count_result"+c+"]",self.searchArea).empty();
                    }
                    if(!respData.success){
                        alert(respData.msg);
                        return;
                    }
                    if (respData.success) {
                        if(respData.data && respData.data.length){
                            self.attendanceArray = respData.data;
                            var showHtml = "<table class='table table-bordered table-striped thead-nowrap'><thead><tr><th>姓名</th><th>月份</th><th>日期</th><th>上班时间</th><th>下班时间</th><th>工作时长</th><th>类型</th></tr></thead><tbody>";
                            for(var i =0;i < respData.data.length;i++){
                                var info = respData.data[i];
                                var typeText = self.switchType(info.type||'');
                                var date = info.date;
                                if(info.type == 1 && info.duration == 0){
                                    showHtml += "<tr class='red' index='"+i+"'>";
                                }else if(info.type != 1 && info.duration > 0){
                                    showHtml += "<tr class='violet' index='"+i+"'>";
                                }else{
                                    showHtml += "<tr index='"+i+"'>";
                                }
                                showHtml += "<td>"+(info.name||'')+"</td><td>"+(info.month||'')+"</td><td>"+ date+"</td><td>"+(info.start_time||'')+"</td><td>"+(info.end_time||'')+"</td><td>"+(info.duration||'0')+"</td><td>"+(typeText||'')+"</td></tr>";
                            }
                            showHtml += "</tbody></table>";
                            $("[name=search_result]",self.searchArea).html(showHtml);
                            $("[name=count_btn]",self.searchArea).show();
                        }else{
                            $("[name=search_result]",self.searchArea).html("暂无记录");
                            $("[name=count_btn]",self.searchArea).hide();
                        }
                    }
                }
            });
    };
    Attendance.switchType = function(type){
        var data = "";
        switch(type){
            case 1 : data = "正常工作日";break;
            case 2 : data = "双休日";break;
            case 3 : data = "法定节假日";break;
        }
        return data;
    };
    /**
     * 统计考勤情况
     * @param countMonth
     * @param type  1正常工作日   2双休日  3法定节假日  不传则依次输出
     */
    Attendance.countTime = function(){
        var self = this;
        var type= Number($("[name=search_type]",self.searchArea).find("option:selected").val());
        var countMonth = $("[name=search_month]",self.searchArea).find("option:selected").val();
        if(countMonth == "-1"){
            countMonth = new Date().getMonth()+1;
        }
        if(countMonth){
            if(countMonth <0 || countMonth>12){
                console.log("第一个参数请输入月份(1~12之间的正整数)");
                return;
            }
        }
        if(type == -1){
            for(var i = 1; i < 4 ;i++){
                self.countAttendance(countMonth,i);
            }
        }else{
            self.countAttendance(countMonth,type);
        }
    };
    /**
     *
     * @param currentMonth
     * @param type
     */
    Attendance.countAttendance = function(currentMonth,type){
        var self = this;
        if(self.attendanceArray.length == 0){
            alert("暂无记录，无法统计");
            return;
        }
        var startDate = "";
        var endDate = "";
        if(currentMonth){
            var dateCount = 0;
            var realDateCount = 0;
            var durationCount = 0;
            for(var j = 0; j < self.attendanceArray.length;j++){
                var info = self.attendanceArray[j];
                if(info.month && (parseInt(info.month) == parseInt(currentMonth))){
                    //统计时长
                    if(info.type && info.type == type && info.duration){
                        durationCount += info.duration;
                        realDateCount++;
                    }
                    //查找起止时间
                    if(dateCount == 0 || (dateCount != 0 && startDate > info.date.substring(0,10))){
                        startDate = info.date.substring(0,10);
                    }
                    if(dateCount == 0 || (dateCount != 0 && endDate < info.date.substring(0,10))){
                        endDate = info.date.substring(0,10);
                    }
                    dateCount++;
                }
            }
            var showHtml = "";
            var countName = self.switchType(type);
            var lastTip = "从"+startDate+"到"+endDate+",";
            showHtml += "<div class='count-info'><div><strong>"+countName+"的统计情况如下：</strong></div>";
            if(realDateCount == 0){
                showHtml += "<div>"+lastTip+"暂无您"+currentMonth+"月份的"+countName+"的工作时长统计。</div></div>";
                $("[name=count_result"+type+"]",self.searchArea).html(showHtml);
                return;
            }
            showHtml += "<div>"+lastTip+"您"+currentMonth+"月份的"+countName+"的工作总时长为"+Math.floor(durationCount/3600)+"小时"+Math.floor((durationCount%3600)/60)+"分钟"+Math.floor(durationCount%3600%60)+"秒</div>";
            showHtml += "<div>共计"+realDateCount+"天,平均工作时长为"+Math.floor(durationCount/3600/realDateCount)+"小时"+Math.floor(durationCount%(3600*realDateCount)/(60*realDateCount))+"分钟"+Math.floor(durationCount%(3600*realDateCount)%(60*realDateCount)/realDateCount)+"秒</div>";
            if(type == 1){
                if(durationCount < (36000*realDateCount)){
                    var leftSecond = 36000*realDateCount - durationCount;
                    showHtml += "<div>距离规定的工作时长，还有"+Math.floor(leftSecond/3600)+"小时"+Math.floor((leftSecond%3600)/60)+"分钟"+Math.floor(leftSecond%3600%60)+"秒</div>";
                }else{
                    var exceedSecond = durationCount - 36000*realDateCount;
                    showHtml += "<div>已达标准(超出标准时长"+Math.floor(exceedSecond/3600)+"小时"+Math.floor((exceedSecond%3600)/60)+"分钟"+Math.floor(exceedSecond%3600%60)+"秒)</div>";
                }
            }else{
               showHtml += "<button class='btn bg-blue' name='check_btn' data-month='"+currentMonth+"' data-type='"+type+"'>检测是否符合标准</button>";
            }
            showHtml += "</div>";
            $("[name=count_result"+type+"]",self.searchArea).html(showHtml);
            $("[name=check_btn]",self.searchArea).unbind().bind("click",function(){
                self.checkOverTime($(this));
            });
        }
    };
    /**
     *统计加班那天的前十个工作日的平均工作时长，是否符合标准
     */
    Attendance.checkOverTime = function(el){
        var month = $(el).attr("data-month");
        var type = $(el).attr("data-type");
        if(!month || !type){
            alert("数据不足，无法校验");
            return;
        }
        var params = {
            "name": $.trim($("[name=user_name]").text()),
            "month": month,
            "type": type
        }
        $.ajax(
            {
                type: 'get',
                url: '/searchAttendance/checkOverTime',
                data: params,
                dataType: 'json',
                success: function (respData) {
                    console.log(respData);
                    if(!respData.success){
                        alert(respData.msg);
                        return;
                    }
                    if(respData.data){

                    }
                }
            });
    };

    window.Attendance = Attendance;
})(window,document);









