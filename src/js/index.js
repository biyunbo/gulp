
//封装一个获取id的函数
function $(obj){
   // return  document.getElementById(obj);
   return  typeof obj =="string"?  document.getElementById(obj) :  obj;
}

//封装通过类名获取元素函数
function getByClass(obj,sClass){
	if(document.getElementsByClassName){
		return obj.getElementsByClassName(sClass);
	}else{
		var aEle = obj.getElementsByTagName("*");
		var aTarget = [];
		var arr = [];
		for(var i=0; i<aEle.length; i++){
			
			aTarget = aEle[i].className.split(' ');
			
			for(var j=0; j<aTarget.length; j++){
				
				if(aTarget[j]==sClass){
					
					arr.push(aEle[i]);
					
				}
			}
		}
		return arr;
	}
	
};

//封装获取样式函数

function getStyle(obj,sName){
	
	if(obj.currentStyle){
		
		return obj.currentStyle[sName];
		
	}else{
		
		return getComputedStyle(obj,false)[sName];
		
	}
	
}
//浏览器类型
function checkBrowser() {
    ua = navigator.userAgent;
    ua = ua.toLocaleLowerCase();
    var browserVersion;
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browserType = "IE";
        browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
    } else if (ua.match(/firefox/) != null) {
        browserType = "火狐";
    } else if (ua.match(/opera/) != null) {
        browserType = "欧朋";
    } else if (ua.match(/chrome/) != null) {
        browserType = "谷歌";
    } else if (ua.match(/safari/) != null) {
        browserType = "Safari";
    }
    var arr = new Array(browserType, browserVersion);
    return arr;
}

//检测是否是移动设备
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	document.writeln("您的浏览设备为：");
	if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		document.write("phone");
	}else if(bIsIpad){
		document.write("iPad");
	} else {
		document.write("pc");
	}
}

		



//各种移动、放大，缩小事件封装函数
function startMove(obj, json, fnCallback) {
	clearInterval(obj.timer); //清楚定时器
	obj.timer = setInterval(function() { //定时器
		bTag = true;
		for (var attr in json) { //遍历对象
			var iTarget = json[attr]; //获取对象所有属性
				if (attr == "opacity"){
					var iCur = Math.round(parseFloat(getStyle(obj, attr) * 100)); //获取对象样式
				} 
				else {
					var iCur = parseFloat(getStyle(obj, attr));
				}
				iSpeed = iTarget - iCur > 0 ? Math.ceil((iTarget - iCur) / 20) : Math.floor((iTarget - iCur) / 20);
				if (iCur != iTarget) {
					bTag = false;
					if (attr == "opacity") {
						obj.style[attr] = (iCur + iSpeed) / 100;
						obj.style.filter = "alpha(opacity=" + (iCur + iSpeed) + ")";
					} 
					else {
						obj.style[attr] = iCur + iSpeed + "px";
					}
				}
			}
			if (bTag) {
				clearInterval(obj.timer);
				if (fnCallback) {
					fnCallback();

				}
			}
	}, 30)
};


//AJAX调用json数据
function Ajax(url,fnSucc,fnFaild){
	var oAjax=null;
	//创建一个兼容的 AJAX 对象
	if(window.XMLHttpRequest){
		oAjax=new XMLHttpRequest();//非IE6			
	}else{
		oAjax=new ActiveXObject('Microsoft.XMLHTTP');//IE6
	};
	//连接服务器
	oAjax.open('GET',url,true)
				
	//发送请求
	oAjax.send()
				
	//接收服务器返回的信息
	oAjax.onreadystatechange=function(){
					
		if(oAjax.readyState==4){
			if(oAjax.status==200){
				fnSucc(oAjax.responseText)
			}
			else{
				if(fnFaild){
					fnFaild()
				};
			};
		};
	};
};


//设置，读取，移除cookie值封装函数
var cookieUtil={
	setCookie:function (name,value,date){
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+date);
		document.cookie = name +"=" + value + ";expires="+oDate;	
	},
	getCookie:function(name){
		var str=document.cookie.split("; ");
		for(var i=0;i<str.length;i++ ){
			var str1=str[i].split("=");
			if(str1[0]==name){
				return str1[1];
			}
		}
		return " ";
	},
	removeCookie:function(name){
		cookieUtil.setCookie(name,"a",-1)
	}
};




















