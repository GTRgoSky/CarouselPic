// $(function(){
    
//     imgCarousel();
// });
var imgCarousel=function(params){
        var curIndex = 0; //当前index
        var imgLen = $(".foucebox .showDiv").length; //图片总数
        var imgtime;//图片轮转时间
        var showDiv =$('.showDiv')//装载图片的div元素
        var Slider = $('.J-slider li');//底部hover按钮事件
        var imgsize= params.imgsize;//图片大小
        var calback = params.calback;//回调
        var timeSize = params.timesize//设置动态图切换时间
        $('.J-imgcont').css("width",imgLen*imgsize);//获取总共容器长度
        $(showDiv[0]).css('display','block')//第一张图
        $(Slider[0]).addClass('sliderhover')//给第一张图片加入样式
        //  // 定时器自动变换5秒每次
        function changeTime(_index){
            imgtime=setInterval(function(){ 
                if(_index < imgLen-1){ 
                    _index ++; 
                }else{ 
                    _index = 0;
                }
                changeTo(_index); 
            },timeSize);
        } 
        changeTime(curIndex);
        function changeTo(num){ 
            // console.log(imgtime)
            //动画渐入效果
            var goLeft = num * imgsize;
            Slider.removeClass('sliderhover')
            $(Slider[num]).addClass('sliderhover')
            $(".J-imgcont").stop(false, true).animate({left: "-"+goLeft+"px"},200,function(){
                curIndex=num;
                // changeTime(num);
            });
        }

        //点击上一张图的事件
        $('.J-prep').click(function(){
            var _index;
            clearInterval(imgtime);
            if(curIndex==0){
                _index = imgLen-1
                changeTo(_index);
                changeTime(_index)
            }else{
                _index = curIndex-1
                changeTo(_index);
                changeTime(_index)
            }
        })
        //点击下一张图的事件
        $('.J-next').click(function(){
            var _index;
            clearInterval(imgtime);
            if(curIndex==imgLen-1){
                _index = 0
                changeTo(_index);
                changeTime(_index)
            }else{
                _index = curIndex+1
                changeTo(_index);
                changeTime(_index)
            }
        })

        $.each(Slider,function(i,v){
            $(v).hover(function(){
                calback(i)
                Slider.removeClass('sliderhover')
                $(v).addClass('sliderhover');
                clearInterval(imgtime);
                changeTo(i);
                changeTime(i);
            },
            function(){
                
            })
        })
    }
    