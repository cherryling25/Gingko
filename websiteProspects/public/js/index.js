  $(function(){

  /*顶部-我的平台*/
   $(".main .right1 .pingtai").mouseenter(function(){
    //$(this).find(".my").css({"transform":"rotate(180deg)"});
    $(this).css({"background":"white"});
    $(this).next().show();
 });

 $(".main .right1 .pingtai").mouseleave(function(){
    $(this).css({"background":"#f2f2f2"});
    $(this).next().hide();
 });
/*幻灯片左侧导航*/
 $(".div3 .menu2").mouseenter(function() {
        $(this).css({"background":"#eee"});

        $(this).find(".right").show();
        $(".right").not($(this).find(".right")).hide();
    });
     $(".div3 .menu2").mouseleave(function() {
         $(this).find(".right").hide();
         $(this).css({"background":"#fff"});
     });

//幻灯片
$(".paging").show();
    	$(".paging a:first").addClass("active");
        num = $(".paging a:first").attr("rel");
        arr=[1,2,3,4,5,6,7,8,9];
        imgs=arr.slice((num-1)*3,num*3);

        for (i = 0; i < imgs.length; i++) {
            $("."+imgs[i]).show();
            
        }
    	//获取图像的大小,有多少图像，然后确定图像的大小
    	  //调整图像新的大小
        var imageWidth = $(".window").width();
        
        var imageSum = $(".image_reel img").length;   
        var imageReelWidth = imageWidth * imageSum;
        $(".image_reel").css({ "width":imageReelWidth});

        var pageSize = $(".paging a").length;

        //分页和滑动
        rotate = function(end){
            if(end) {
                $active = $(".paging a:first");
                $(".paging a").removeClass("active");
                $active.addClass("active");
                $(".image_reel").animate({ 
                    left: -pageSize * imageWidth 
                    }, 500,function () {
                        $(".image_reel").css({'left':'0px'});
                    }
                );
                
            } else {
                var triggerID = $active.attr("rel")-1;
                var image_reelPosition = triggerID*imageWidth;

                $(".paging a").removeClass("active");   //删除所有active类
                $active.addClass("active");
                
                $(".image_reel").animate({  //滑动动画
                    left: -image_reelPosition 
                }, 500);
            }

           act= $(".paging a.active").attr("rel");

           imgs=arr.slice((act-1)*3,act*3);
            for (i = 0; i < imgs.length; i++) {
                $("."+imgs[i]).show();
                
            }
        };

        //定时时间
        rotateSwitch = function() {
            play = setInterval(function() { //这个总过程每隔7秒重复一次
            $(".img").hide();
                $active = $(".paging a.active").next(); //移动到下一个分页
                var rel = $active.attr("rel");
                var end = false;
                if(!rel) {
                    end = true;
                }
                rotate(end);     //触发分页和滑块函数
            }, 2000);   //每隔分页停留的定时器速度
        };

        rotateSwitch();

        //On Click
        $(".paging a").click(function() {
            
            $(".img").hide();
           $active = $(this);
           act= $(this).attr("rel");

            imgs=arr.slice((act-1)*3,act*3);
            for (i = 0; i < imgs.length; i++) {
                $("."+imgs[i]).show();
                
            }

           clearInterval(play);     //动画立即停止
           rotate();        //立即触发rotate函数
           rotateSwitch();  //重新开始rotateSwitch方法
           return false;    //以防定时器是a链接，浏览器会跳转到链接
        });

        //On hover
        $(".image_reel img").hover(function() {
            clearInterval(play);    //鼠标移进，停止play方法
        }, function() {
            rotateSwitch();     //  鼠标移走，重新开始rotateSwitch方法
        });
});