//任意数组最大值
//任意数组最大值
function maxArr(arr){
	var max=arr[0];
	for(var i=0;i<arr.length;i++){
		if(max<arr[i]){
			max=arr[i];
		}	
	}
	console.log(max);
}
//任意数组最小值
function minArr(arr){
	var min=arr[0];
	for(var i=0;i<arr.length;i++){
		if(min>arr[i]){
			min=arr[i];
		}	
	}
	console.log(min);
}
//任意数组最值
function most(arr,type="<"){	//默认最大值
	if(type==">"){		//小
		minArr(arr);
	}else if(type="<"){	//大
		maxArr(arr);
	}
}
//任意范围求和
function addArr(bot=0,top=10){			//默认1-10求和
	var sum=0;
	for(var i=bot;i<=top;i++){
		sum+=i;
	}
	for(var i=top;i<=bot;i++){
		sum+=i;
	}
	console.log(sum);
}
//任意值求和
function addNum(){
	var sum=0;
	for(var i=0;i<arguments.length;i++){
		sum=sum+=arguments[i];
	}
	console.log(sum);
}
//检测参数的数据类型
function type(i){
	if(arguments.length!=0){
		if(typeof i == "number"){
			console.log("这是一个数字");
		}else if(typeof i == "string"){
			console.log("这是一个字符串");
		}else if(typeof i == "boolean"){
			console.log("这是一个布尔值");
		}else if(typeof i == "undefined"){
			console.log("undefined");
		}
	}else{
		console.log("请输入参数");
	}
}
//给某一个数组在最后添加一个元素
function push(arr,...ele){
	if(arr instanceof Array && ele.length>=1){
		for(var i=0;i<ele.length;i++){
			 arr[arr.length]=ele[i];
		}	
		return arr;
	}else{
		return "输入有误";
	}
}
//参数最大值
function para(...para){
	if(para.length==0){
		alert("请输入参数");
	}else{
		var max=para[0];
		for(var i=0;i<para.length;i++){
			if(max<para[i]){
				max=para[i];
			}	
		}
		console.log(max);
	}
}
//计算
function calc(num1,num2,type){
	if(type=="+"){
		return num1+num2;
	}else if(type=="-"){
		return num1-num2;
	}else if(type=="*"){
		return num1*num2;
	}else if(type=="/"){
		return num1/num2;
	}
}
//*************************************************************************
//$
	//selector传入的类名 id名 标签名
	//ranger  查找范围
function $(selector,ranger){
	var obj=ranger||document;
	var type=typeof selector;
	if(type=="string"){
		var select=selector.trim();
		if(select.charAt(0)=="."){
			return obj.getElementsByClassName(select.substr(1));
		}else if(select.charAt(0)=="#"){
			return document.getElementById(select.substr(1));
		}else if(/^[a-zA-Z][a-zA-Z1-6]{1,8}$/.test(select)){
			return obj.getElementsByTagName(select);
		}else if(/^<[a-zA-Z][a-zA-Z1-6]{1,8}>$/.test(select)){
			return document.createElement(select.slice(1,-1));
		}
	}else if(type=="function"){
		addEvent(window,"load",selector);
	}
}
//获取元素的所有样式
	//由于在ie9以下的浏览器中不存在getComputedStyle w3c ,而是存在currentStyle ie，所以写函数getStyle实现浏览器中通用
	//由于传入的attr是需要获取的属性，而属性在这里传入的字符串，所以必须用aa[attr]，而不能写aa.attr
	//obj-------通过某种方式选择到的元素
	//attr------被获取元素的指定（attr）样式，传入的是字符串
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}
//设置或获取某一个元素的内容
	//obj 指定的对象
	//content 设置的内容 可有可无 不传获取 传设置
function getText(obj,content){
	if(content){
		obj.innerHTML=content;
	}else{
		return obj.innerHTML;
	}
}
//获取某一个元素里的元素节点
function getChlids(obj){
		var childs=obj.childNodes;
		var arr=[];
		childs.forEach(function(v){
			if(v.nodeType==1){
				arr.push(v);
			}
		});
		return arr;
}
//获取某一个元素的第一个元素节点
function getFirst(obj){
	return getChlids(obj)[0];
}
//获取某一个元素的最后一个元素节点
function getLast(obj){
	var last=getChlids(obj);
	return last[last.length-1];
}
//获取某一个元素的指定一个元素节点
function getNum(obj,num){
	var nums=getChlids(obj);
	if(num<=nums.length){
		return nums[num];
	}else{
		return "参数有误";
	}
}
//获取某一个元素的下一个元素节点
function getNext(obj){
	var next=obj.nextSibling;
	if(next===null){
		return false;
	}
	while(next.nodeType!=1){
		next=next.nextSilbling;
		if(next===null){
			return false;
		}
	}
	return next;
}

//在某一个元素之后插入		ele要插入的元素
Node.prototype.insertAfter=function(ele){
	var next=this.nextElementSibling;	
	var parent=this.parentNode;	//父节点
	parent.insertBefore(ele,next);
}
//在父元素的第一个元素前插入
Node.prototype.pretend=function(ele){
	var first=this.firstElementChild;
	this.insertBefore(ele,first);
}
//appendTo  把子元素插入到父元素里
Node.prototype.appendTo=function (parent) {
	parent.appendChild(this);
}
//添加 绑定事件
function  addEvent(obj,type,fn) {
	obj.addEventListener(type,fn,false);
}
//滚轮事件
function mouseWheel(obj,upfn,downfn) {
	obj.addEventListener("mousewheel",fn,false);
	function fn(e) {
		e.preventDefault();     
		var dir=e.wheelDelta; 
		if(dir==120||dir==150||dir==180){
			upfn.call(obj);
		}else if(dir==-120||dir==-150||dir==-180){
			downfn.call(obj);
		}
	}
}



























