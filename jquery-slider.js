(function ($) {
    /*!
     * 横向轮播
     * author：Kevin
     * camel is obj
     * name has _ is variable
     */
    $.fn.slider = function (options) {
        //默认参数
        var defaults = {
            prevBtn : null,
            nextBtn : null,
            scroll : 3,
            visible : 3,
            loop : true,
            start : 0,
            auto : false,
            speed : 1000,
            interval : 5000,
            easing : null
        };
        var opts = $.extend(defaults, options);
        /* content */
        var obj = $(this);
        var ul = $('ul', obj);
        var li = $('li', ul);
        var li_len = li.size();
        //制作克隆后的li
        if (opts.loop) {
            ul.prepend(li.slice(li_len - opts.visible).clone())
                .append(li.slice(0, opts.visible).clone());
        }
        //设定克隆后样式
        var nul = $('ul', obj);
        var nli = $('li', obj);
        var nli_len = nli.size();
        var w = li.outerWidth(true);
        var h = li.outerHeight(true);
        var curr = opts.visible;
        ul.css({
            width : w * nli_len,
            height : h,
            left : -w * curr   
        });
        obj.css({
            'width' : w * opts.visible,
            'overflow' : 'hidden'
        });
        //点击向前滚动
        if (opts.prevBtn) {
            $(opts.prevBtn).on('click', function (e) {
                e.preventDefault();
				console.log(this);
                return go(curr - opts.scroll)
            });
        }
        //点击向后滚动
        if (opts.nextBtn) {
            $(opts.nextBtn).on('click', function (e) {
                e.preventDefault();
                return go(curr + opts.scroll) 
            });
        }
        //自动滚动
        if (opts.auto) {
            var siv = window.setInterval(function () {
                go(curr + opts.scroll);
            }, opts.interval);
            obj.on('mouseenter', function () {
                window.clearInterval(siv);
            });
        }

        function move (a) {
            
            if (!nul.is(':animated')) {
                nul.animate({
                    'left' : -a * w
                },
                opts.speed, opts.easing);
            }
        }
        function go(a) {
            //是否禁止循环,有问题
            if (!opts.loop) {
                if (a > li_len) {
                    $(nextBtn).css('display', 'none');
                    return fasle;
                } else if (a <= 0 ) {
                    $(prevBtn).css('display', 'none');
                    return fasle;
                }
            }
            if (a > curr) {
                if (a + opts.visible >= nli_len) {
                    curr = curr - li_len;
                    nul.css('left', -curr * w);
                }
                a = curr + opts.scroll;
                move(a);
                curr = a;
            } else {
                if (a < 0) {
                    curr = curr + li_len;
                    nul.css('left', -curr * w);
                }
                a = curr - opts.scroll;
                move(a);
                curr = a;
            }
        }
    }
})(jQuery);
$(function () {
    $('#slider2').slider({
        prevBtn : '.prev2',
        nextBtn : '.next2',
		visible : 3,
		scroll : 3,
    });  
	$('#slider3').slider({
        prevBtn : '.prev3',
        nextBtn : '.next3',
		visible : 3,
		scroll : 3,
    }); 
	$('.car_box').slider({
        prevBtn : '.prev4',
        nextBtn : '.next4',
		visible : 5,
		scroll : 5,
    }); 
});

