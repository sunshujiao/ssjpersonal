$(function () {
    var puke=[];  //存放牌              [{huase,shuzi}]
    var biao={};  //记录已经发过的牌      {h_1:true,s_2:true}uase:"s",shuzi:"5"},{huase:"h",shuzi:"2"}]
    var color=["h","s","c","d"];    // 花色    黑桃（Spade）、红桃（Heart）、方块（Diamond）、梅花（Club）
    var z=1;                        // 层级
    var num=0;                      // 记录当前发的第几张
    var first=null;
    //初始化
    for(var i=0;i<52;i++){
        var huase=color[Math.floor(Math.random()*4)];   //随机花色
        var shuzi=Math.floor(Math.random()*13+1);       //随机数字
        while(biao[huase+"_"+shuzi]){                   //判断 如果有重复则重新产生
            huase=color[Math.floor(Math.random()*4)];
            shuzi=Math.floor(Math.random()*13+1);
        }
        biao[huase+"_"+shuzi]=true;
        puke.push({huase,shuzi});
    }
    //发牌
    for(var i=0;i<7;i++){           //坐标    left:"300-i*50+100*j",top:"70*i"
        for(var j=0;j<=i;j++){
            var item=puke[num];     //item {huase:"s",shuzi:"5"}
            num++;
            var imgSrc=`img/${item.shuzi}${item.huase}.png`;
            $("<li>")
                .attr('id',i+'_'+j)
                .attr("value",`${item.shuzi}`)      //添加自定义属性 id value
                .addClass("pai")
                .css('backgroundImage',`url(${imgSrc})`)
                .delay(num*50)
                .animate({opacity:0.9,left:300-i*50+100*j,top:60*i})
                .appendTo("ul");
        }
    }
    //剩下的牌
    for(;num<puke.length;num++){
        var item=puke[num];
        var imgSrc=`img/${item.shuzi}${item.huase}.png`;    //图片路径
        $("<li>")
            .addClass("pai zuo")
            .attr('id',i+'_'+j)
            .attr("value",`${item.shuzi}`)
            .css('backgroundImage',`url(${imgSrc})`)
            .delay(num*50)
            .animate({opacity:0.9,left:100,top:520})
            .appendTo($("ul"));
    }
    //选中    求和         
    $(".pai").click(function () {
        var ids=$(this).attr("id").split("_");        //点击牌的id
        var ele1=$(`#${parseInt(ids[0])+1}_${parseInt(ids[1])}`);
        var ele2=$(`#${parseInt(ids[0])+1}_${parseInt(ids[1])+1}`); //压着这张牌的id
        if(ele1.length==1&&ele2.length==1){
            return;
        }
        $(this).toggleClass("active");                //如果存在（不存在）就删除（添加）一个类。
        //==13 消失
        if(!first){
            first=this;
            var sum=parseInt($(first).attr("value"));
            if(sum==13){
                $(".active").animate({left:0,top:600},function () {
                    $(this).remove();
                })
                first=null;
            }
        }else{
            var sum=parseInt($(first).attr("value"))+parseInt($(this).attr("value"));
            if(sum==13){
                $(".active").animate({left:0,top:600},function () {
                    $(this).remove();
                })
            }else{
                $(".active").removeClass("active");
            }
            first=null;
        }
    })
    //纸牌切换
    $(".left").click(function () {
        z++;
        $(".zuo:last").removeClass("zuo").addClass("you").css("zIndex",z).animate({left: "+=400"});
    })   //左
    $(".right").click(function () {
        z--;
        $(".you").addClass("zuo").removeClass("you").css("zIndex", z).animate({left:"-=400"});
    })  //右
})  