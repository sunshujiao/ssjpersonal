function Palete(obj,ctx,mask) {
    this.obj=obj;
    this.mask=mask;
    this.ctx=ctx;
    this.width=obj.width;
    this.height=obj.height;
    this.history=[];
    this.lineWidth = 1;
    this.lineCap = 'round'
    this.fillStyle = '';
    this.strokeStyle = '';
    this.style="stroke";
}
Palete.prototype={
    //初始化
    init:function(){
        //初始化
        this.font='26px sans-serif';
        this.textBaseline='middle';
        this.textAlign='center';
        this.lineWidth=3;
    },
    //直线
    line:function () {
      var that=this;
        that.mask.onmousedown=function (e) {
            var ox=e.offsetX,oy=e.offsetY;
            that.mask.onmousemove=function (e) {
                that.ctx.fillStyle=that.fillStyle;
                that.ctx.strokeStyle=that.strokeStyle;
                that.init();
                var mx=e.offsetX,my=e.offsetY;
                that.ctx.beginPath();
                that.ctx.clearRect(0,0,that.width,that.height);
                that.ctx.moveTo(ox,oy);
                that.ctx.lineTo(mx,my);
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.stroke();
            }
            that.mask.onmouseup=function () {
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
            }
        }
    },
    //矩形
    rect:function () {
        var that=this;
        that.mask.onmousedown=function (e) {
            var ox=e.offsetX,oy=e.offsetY;
            that.mask.onmousemove=function (e) {
                that.init();
                that.ctx.fillStyle=that.fillStyle;
                that.ctx.strokeStyle=that.strokeStyle;
                var mx=e.offsetX,my=e.offsetY;
                that.ctx.beginPath();
                that.ctx.clearRect(0,0,that.width,that.height);
                that.ctx.rect(ox,oy,mx-ox,my-oy);
                that.ctx.closePath();
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx[that.style]();
            }
            that.mask.onmouseup=function () {
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
            }
        }
    },
    //圆
    arc:function () {
        var that=this;
        that.mask.onmousedown=function (e) {
            var ox=e.offsetX,oy=e.offsetY;
            that.mask.onmousemove=function (e) {
                that.init();
                that.ctx.fillStyle=that.fillStyle;
                that.ctx.strokeStyle=that.strokeStyle;
                var mx=e.offsetX,my=e.offsetY;
                var r=Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                that.ctx.beginPath();
                that.ctx.clearRect(0,0,that.width,that.height);
                that.ctx.arc(ox,oy,r,0,Math.PI*2);
                that.ctx.closePath();
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx[that.style]();
            }
            that.mask.onmouseup=function () {
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
            }
        }
    },
    //三角形
    trigon:function () {
        var that=this;
        that.mask.onmousedown=function (e) {
            that.init();
            var ox=e.offsetX,oy=e.offsetY;
            that.mask.onmousemove=function (e) {
                that.ctx.fillStyle=that.fillStyle;
                that.ctx.strokeStyle=that.strokeStyle;
                var mx=e.offsetX,my=e.offsetY;
                that.ctx.beginPath();
                that.ctx.clearRect(0,0,that.width,that.height);
                that.ctx.moveTo(ox,oy);
                that.ctx.lineTo(mx,oy);
                that.ctx.lineTo(ox,my);
                that.ctx.closePath();
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx[that.style]();
            }
            that.mask.onmouseup=function () {
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
            }
        }
    },
    //铅笔
    pencil:function () {
        var that=this;
        that.mask.onmousedown=function (e) {
            var ox=e.offsetX,oy=e.offsetY;
            that.ctx.fillStyle=that.fillStyle;
            that.ctx.strokeStyle=that.strokeStyle;
            that.ctx.beginPath();
            that.ctx.moveTo(ox,oy);
            that.mask.onmousemove=function (e) {
                var mx=e.offsetX,my=e.offsetY;
                that.ctx.clearRect(0,0,that.width,that.height);
                that.ctx.lineTo(mx,my);
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.stroke();
            }
            that.mask.onmouseup=function () {
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
            }
        }
    },
    //多边形
    polygon:function (num) {
        var that=this;
        var angle=(360/num)/180*Math.PI;
        that.mask.onmousedown=function (e) {
            that.init();
            that.ctx.fillStyle=that.fillStyle;
            that.ctx.strokeStyle=that.strokeStyle;
            var ox=e.offsetX,oy=e.offsetY;
            that.mask.onmousemove=function (e) {
                var mx=e.offsetX,my=e.offsetY;
                var r=Math.sqrt((mx-ox)*(mx-ox)+(my-oy)*(my-oy));
                that.ctx.beginPath();
                that.ctx.clearRect(0,0,that.width,that.height);
                that.ctx.moveTo(ox+r,oy);
                for(var i=0;i<num;i++){
                    var x=ox+r*Math.cos(angle*i);
                    var y=oy+r*Math.sin(angle*i);
                    that.ctx.lineTo(x,y);
                }
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.closePath();
                that.ctx[that.style]();
            }
            that.mask.onmouseup=function () {
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
            }
        }
    },
    //圆角矩形
    round:function () {
        var that=this;
        that.mask.onmousedown=function (e) {
            that.init();
            var ox=e.offsetX,oy=e.offsetY;
            that.mask.onmousemove=function (e) {
                that.ctx.fillStyle=that.fillStyle;
                that.ctx.strokeStyle=that.strokeStyle;
                var mx=e.offsetX,my=e.offsetY;
                that.ctx.beginPath();
                that.ctx.clearRect(0,0,that.width,that.height);
                that.ctx.moveTo(ox+15,oy);
                that.ctx.lineTo(mx-15,oy);
                that.ctx.quadraticCurveTo(mx,oy,mx,oy+15);
                that.ctx.lineTo(mx,my-15);
                that.ctx.quadraticCurveTo(mx,my,mx-15,my);
                that.ctx.lineTo(ox+15,my);
                that.ctx.quadraticCurveTo(ox,my,ox,my-15);
                that.ctx.lineTo(ox,oy+15);
                that.ctx.quadraticCurveTo(ox,oy,ox+15,oy);
                that.ctx.closePath();
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx[that.style]();
            }
            that.mask.onmouseup=function () {
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
            }
        }
    },
    //多角形
    megagon:function(num){
        var that=this;
        that.mask.onmousedown=function(e){
            that.init();
            that.ctx.fillStyle=that.fillStyle;
            that.ctx.strokeStyle=that.strokeStyle;
            var ox=e.offsetX,oy=e.offsetY;
            that.mask.onmousemove=function(e){
                var mx=e.offsetX,my=e.offsetY;
                var radius=Math.sqrt((mx-ox)*(mx-ox)+(my-oy)*(my-oy));
                var radius1=radius/3;
                var angle=360/(num*2)*Math.PI/180;
                that.ctx.clearRect(0,0,that.width,that.height);
                that.ctx.beginPath();
                that.ctx.moveTo(ox+radius,oy);
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                for(var i=0;i<num*2;i++){
                    if(i%2==0){
                        that.ctx.lineTo(ox+radius*Math.cos(angle*i),oy+radius*Math.sin(angle*i))
                    }else{
                        that.ctx.lineTo(ox+radius1*Math.cos(angle*i),oy+radius1*Math.sin(angle*i))
                    }
                }
                that.ctx.closePath();
                that.ctx[that.style]();
            }
            that.mask.onmouseup=function(){
                console.log(1)
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
            }
        }
    },
    //橡皮
    gum:function (num) {
        var that=this;
        that.mask.onmousedown=function (e) {
            var ox=e.offsetX,oy=e.offsetY;
            that.mask.onmousemove=function (e) {
                var mx=e.offsetX-num/2,my=e.offsetY-num/2;
                that.ctx.clearRect(mx,my,num,num);
            }
            that.mask.onmouseup=function () {
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
            }
        }
    },
    //文字
    wrieetn:function () {
        var that=this;
        var tx=0;
        var ty=0;
        that.mask.ondblclick=function (e) {
            var x=e.offsetX;
            var y=e.offsetY;
            var div=document.createElement("div");
            div.className="wrieetns";
            div.style.cssText="position:absolute;left:"+x+"px;top:"+y+"px";
            var but=document.querySelector(".but");
            but.appendChild(div);
            div.contentEditable=true;
            // div.focus();
            div.onmousedown=function(e){
                var dx=e.clientX-div.offsetLeft;
                var dy=e.clientY-div.offsetTop;
                document.onmousemove=function(e){
                    var mx=e.clientX;
                    var my=e.clientY;
                    tx=mx-dx;
                    ty=my-dy;
                    div.style.left=tx+'px';
                    div.style.top=ty+'px';
                }
                document.onmouseup=function(){
                    document.onmousemove=null;
                    document.onmouseup=null;
                }
            }
            div.onblur=function(){
                var t=div.innerHTML;
                but.removeChild(div)
                that.ctx.fillText(t,tx,ty)
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
            }
        }
    },
    //截取
    clip:function(cbtn){
        var that=this;
        that.cbtn=cbtn;
        that.mask.onmousedown=function(e){
            var ox=e.offsetX,oy=e.offsetY;
            var minx,miny,w,h;
            that.init();
            that.mask.onmousemove=function(e){
                var cx=e.offsetX,cy=e.offsetY;
                that.init();
                minx=ox>=cx?cx:ox;
                miny=oy>=cy?cy:oy;
                w=Math.abs(cx-ox);
                h=Math.abs(cy-oy);
                cbtn.style.cssText=`
                    width:${w}px;height:${h}px;border:1px dashed #000;display:block;
                    position:absolute;top:${miny}px;left:${minx}px;
                `;
            }
            that.mask.onmouseup=function(){
                that.temp=that.ctx.getImageData(minx,miny,w,h);
                console.log(that.temp)
                that.ctx.clearRect(minx,miny,w,h);
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height))
                that.ctx.putImageData(that.temp,minx,miny);
                that.drag(minx,miny,w,h,cbtn);
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
            }
        }
    },
    drag:function(x,y,w,h,cbtn){
        var that=this;
        that.mask.onmousemove=function(e){
            var ox=e.offsetX,oy=e.offsetY;
            if(ox>x && ox<w+x && oy>y&& oy<h+y){
                that.mask.style.cursor='move';
            }
            that.mask.onmousemove=function(){
                that.mask.style.cursor='default';
            }
        }
        that.mask.onmousedown=function(e){
            var ox=e.offsetX,oy=e.offsetY;
            var cx=ox-x,cy=oy-y;
            if(ox>x && ox<w+x && oy>y && oy<h+y){
                that.mask.style.cursor='move';
            }
            that.mask.onmousemove=function(e){
                that.ctx.clearRect(0,0,that.width,that.height);
                if(that.history.length!=0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                var mx=e.offsetX,my=e.offsetY;
                var lefts=mx-cx,tops=my-cy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w;
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h;
                }
                cbtn.style.left=lefts+'px';
                cbtn.style.top=tops+'px';
                x=lefts,y=tops;
                that.ctx.putImageData(that.temp,lefts,tops);
            }
            that.mask.onmouseup=function(){
                that.drag(x,y,w,h,cbtn);
                // that.cbtn.style.display="none";
                that.history.push(that.ctx.getImageData(0,0,w,h));
                that.mask.onmouseup=null;
                that.mask.onmousemove=null;
            }
        }
    },
}