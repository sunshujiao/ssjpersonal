window.onload=function () {
    var can=document.querySelector(".can");
    var ctx=can.getContext("2d");
    var lines=document.querySelector(".line");
    var rects=document.querySelector(".rect");
    var arcs=document.querySelector(".arc");
    var trigons=document.querySelector(".trigon");
    var pencils=document.querySelector(".pencil");
    var backs=document.querySelector(".back");
    var keeps=document.querySelector(".keep");
    var news=document.querySelector(".new");
    var buts=document.querySelector(".but");
    var polygons=document.querySelector(".polygon");
    var rounds=document.querySelector(".round");
    var megagons=document.querySelector(".megagon");
    var wrieetns=document.querySelector(".wrieetn");
    var cilps=document.querySelector(".cilp");
    var cbtns=$(".cbtn")[0];
    var tops=$(".top")[0];
    var inputs=$("input")[0];
    var spans=$(".span");
    var masks=$(".mask")[0];
    var gum=$(".gum")[0];
    var lis=$("li");

    var palete=new Palete(can,ctx,masks);

    lines.onclick=function () {
        palete.line();
    }
    rects.onclick=function () {
        palete.rect();
    }
    arcs.onclick=function () {
        palete.arc();
    }
    trigons.onclick=function () {
        palete.trigon();
    }
    pencils.onclick=function () {
        palete.pencil();
    }
    polygons.onclick=function () {
        var p=prompt("？边形");
        palete.polygon(p);
    }
    rounds.onclick=function () {
        palete.round();
    }
    megagons.onclick=function () {
        var p=prompt("？边形");
        palete.megagon(p);
    }
    gum.onclick=function () {
        var p=prompt("大小");
        palete.gum(p);
    }
    wrieetns.onclick=function () {
        palete.wrieetn();
    }
    spans[0].onclick=function () {
        palete.style="stroke";
    }
    spans[1].onclick=function () {
        palete.style="fill";
    }
    inputs.onchange=function () {
        palete.strokeStyle = this.value;
        palete.fillStyle=this.value;
    }
    cilps.onclick=function(){
        palete.clip(cbtns);
    }

    //撤销
    backs.onclick=function () {
        palete.history.pop();
        if(palete.history.length==0){
            ctx.clearRect(0,0,can.width,can.height);
            alert("已清空");
        }else{
            ctx.putImageData(palete.history[palete.history.length-1],0,0);
        }
    }
    //保存
    keeps.onclick=function () {
        var str=can.toDataURL();
        location.href=str.replace("data.image/png","data.image/octet-stream");
    }
    //选中样式
    tops.onmousedown=function(e){
        var obj=e.target;
        for(var i=0;i<lis.length;i++){
            lis[i].style.fontSize='16px';
        }
        obj.style.fontSize='20px';
    }
    //新建
    news.onclick=function () {
        ctx.clearRect(0,0,can.width,can.height);
        palete.history.push(ctx.getImageData(0,0,can.width,can.height));
    }
}