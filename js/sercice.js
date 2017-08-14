var path = '/ArtAppInst';
/*var token = document.getElementById('token').value;
var teacherId = document.getElementById('teacherId').value;*/
var sUrl = {
	'login' : path + '/user/login', //登录
	'resetPassword':path + '/user/resetPassword', //忘记密码
	'SendMobileSMS':path + '/user/SendMobileSMS', //发送验证码
	'getInstNoticeList':path + '/instNotice/getInstNoticeList', //公告
	'getInstAddress':path + '/inst/addresss/getInstAddress', //校区信息
	'selectInstAddress4Teacher':path + '/inst/addresss/selectInstAddress4Teacher', //选择机构登录
	'addInstInfo':path + '/inst/addInstInfo', //机构注册
	'selectTodayCourses':path + '/inst/course/selectTodayCourses', //查询首页课程详情
	'selectStudentExercise4Index':path + '/studentExercise/selectStudentExercise4Index', //教学动态查询老师作业信息
	'selectCourses4Teahcer':path + '/inst/course/selectCourses4Teahcer', //根据老师id查询课程详情
	'selectInstNoticeList':path + '/instNotice/selectInstNoticeList', //获取公告
	'getSystemMessageList':path + '/instNotice/getSystemMessageList', //获取通知
	'selectCourseInfosByStudentId4wc':path + '/inst/student/selectCourseInfosByStudentId4wc', //学生获取上课记录 
	'selectCourseInfosByTeacherId4wc':path + '/inst/teacher/selectCourseInfosByTeacherId4wc', //老师获取上课记录
	'selectCoursePost':path + '/myVideo/selectCoursePost', //学生或老师获取远程辅导
	'userInfo':path + '/user/selectUserByAddressId', //查询用户信息
	'selectAllInstAddress':path + '/inst/addresss/selectAllInstAddress',//获取机构校区地址
	'selectToCheckPosts':path + '/myVideo/selectToCheckPosts',			//老师端查询待批改作业
	'selectCheckedPosts':path + '/myVideo/selectCheckedPosts',			//老师端已批改作业
	'selectStuPosts':path + '/myVideo/selectStuPosts',					//学生端发送作业
	'selectTeaCheckedAndStuExerUrl':path + '/myVideo/selectTeaCheckedAndStuExerUrl',				//查看批注
	'selectIndexMusicCircle4wc':path + '/myVideo/selectIndexMusicCircle4wc',
	'getSign':path + '/app/getSign'
}

function sercice(sUrl, callback, strdat) {
	
    window.httpStatusCode = {
    	"Continue" : { status : 100, error  : "指示客户端可能继续其请求！" },
    	"OK" : { status : 200, error  : "请求成功！" },
    	"Redirect" : { status : 302, error  : "页面重定向异常！" },
    	"Unauthorized" : { status : 401, error  : "资源没有认证或会话超时，请认证资源或尝试退出重新登录！" },
    	"Forbidden" : { status : 403, error  : "该页面没有访问权限！" },
    	"Bad Request" : { status : 400, error  : "请求无效！" },
    	"Not Found" : { status : 404, error  : "页面没找到！" },
    	"Internal Server Error" : { status : 500, error  : "服务器内部错误!" }
    };
	
	return $.ajax({
		url : sUrl,
		cache : false,
		data : strdat,
		type : 'post',
		dataType : 'json',
		success : function(data) {
			if (data) {
				callback(data);
			}
		},
		error : function( jqXHR, textStatus ) {
			if ( $(jqXHR.responseText).eq(3).text() === "登录" ) {
				var token = getToken();
				window.location = path + "/user/logout?token=" + token;
			}
			else if ( jqXHR.status != 0  ) {
				alert("服务器内部异常，请联系管理员！");
			}
			else if ( this.url.indexOf("selectReportAccount") != -1 ) {
				alert("操作过于频繁，请稍后再试！");
			}
			else {
				
			}
		}
	});

};

function sercicebackdat(sUrl, callback, calbackdat, strdat) {
	$.ajax({
		url : sUrl,
		cache : false,
		data : strdat,
		type : 'post',
		dataType : 'json',
		success : function(data) {
			if (data) {
				callback(data, calbackdat);
			}
		},
		error : function( jqXHR, textStatus ) {
			debugger
		}
	});

};

function sercicebackdat2(sUrl, callback, calbackdat1, calbackdat2, calbackdat3, calbackdat4, calbackdat5, strdat) {
	$.ajax({
		url : sUrl,
		cache : false,
		data : strdat,
		type : 'post',
		dataType : 'json',
		success : function(data) {
			if (data) {
				callback(data, calbackdat1, calbackdat2, calbackdat3,calbackdat4, calbackdat5);
			}
		},
		error : function( jqXHR, textStatus ) {
			debugger
		}
	});

};

function getToken() {
	return getParametersOnUrl("token");
};

function getParametersOnUrl(parament) {
	var reg = new RegExp("(^|&)" + parament + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}

function common(dat) {
	alert(dat.msg);
}


//显示加载框
function loading(mess){
	top.$.jBox.tip.mess = null;
	top.$.jBox.tip(mess,'loading',{opacity:0});
}

// 确认对话框
function confirmx(mess, href){
	top.$.jBox.confirm(mess,'系统提示',function(v,h,f){
		if(v=='ok'){
			loading('正在提交，请稍等...');
			location = href;
		}
	},{buttonsFocus:1});
	top.$('.jbox-body .jbox-icon').css('top','55px');
	return false;
}

/* ==========================================================================
 * ArtApp Application
 * Version: 1.0.0
 * ---------------------------------------------------------------------------
 * Author: artapp
 * Website: https://www.artapp.cn
 * Email: jianxiong0322@gmail.com
 * ========================================================================== */

var Artapp = App = function(){
	
    return {
    	
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
        	$(document).click(function(){
        		var $dropdownList = top.$('.dropdown-toggle');
        		$dropdownList.each(function(index,dropdown){
        			var $dropdown = top.$(dropdown);
                    var parent = $dropdown.parent();
                    var isActive = parent.hasClass("open");
                    if ( isActive ) {
                    	$dropdown.dropdown('toggle');
                    }	
        		})
        	})
        },
        
        /**
         * 执行apply，扩展LS对象函数isUndefined。
         * isUndefined method.
         * @method isUndefined
         * @param {Object} e 变量
         * @return {Boolean} true/false
         **/
		isUndefined : function(e) {
			try {
				return e === void 0;
			} catch (ex) {
				return typeof e === 'undefined';
			}
		},
		
        /**
         * 执行apply，扩展LS对象函数isDefined.
         * isDefined method.
         * @method isDefined
         * @param {Object} e JS 变量
         * @return {Boolean} true/false
         **/    			
		isDefined : function(e) {
			return typeof e !== "undefined"
		},
    	
    	/**
    	 * APP.alert
    	 */
    	alert: function( options ,callback ) {
			try {
				swal;
			} catch (ex) {
				return ;
			}
    		// 默认配置
    		settings = {
    			title: "系统提示"
    		}
    		
    		
        	if ( $.isPlainObject( options ) ) {
        		$.extend( true, settings, options );
        		callback = callback || function(){};
        		swal(settings, callback);
        	}
        	else if ( arguments.length > 1) {
        		settings.title =  arguments[0] || "系统提示";
        		settings.text = arguments[1] || '';
        		settings.type = arguments[2] || '';
        		swal(settings);
        	}
        	else {
        		settings.title = "系统提示";
        		settings.text = arguments[0] || '';
        		settings.type = arguments[1] || '';
        		swal(settings);
        	}
    	}
    }
	
}();

Artapp.init();
