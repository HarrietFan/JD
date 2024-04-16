window.onload = function() {
    search();
    banner();
    downTime();
}

var search = function() {
    var searchBox = document.querySelector(".jd_search_box");
    var banner = document.querySelector(".jd_banner");
    var height = banner.offsetHeight;
    window.onscroll = function() {
        var scrollTop = parseInt(document.documentElement.scrollTop);
        var opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height * .85;
        } else {
            opacity = .85;
        }
        searchBox.style.background = "rgba(201, 21, 35, " + opacity + ")";
    }
}

var banner = function() {
    // 1自动轮播且无缝
    // 2点要随轮播的改变而改变
    // 3滑动效果
    // 4滑动结束的如果滑动距离不超过要求则吸附回去
    // 5滑动结束滑动距离超过要求，则切换图片

    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    var imageBox = banner.querySelector("ul:first-child");
    var pointBox = banner.querySelector("ul:last-child");
    var points = pointBox.querySelectorAll("li");


    // 封装
    var addTransition = function() {
        imageBox.style.transition = "all .2s";
        imageBox.style.webkitTransition = "all .2s";
    };
    var removeTransition = function() {
        imageBox.style.transition = "none";
        imageBox.style.webkitTransition = "none";
    };
    var setTranslateX = function(translateX) {
        imageBox.style.transform = "translateX(" + translateX + "px)";
        imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
    };
    // 编程核心 索引
    var index = 1;
    var timer = setInterval(function() {
        index++;
        // 加过渡
        addTransition();
        // 做位移
        setTranslateX(-index * width);
    }, 2000);
    imageBox.addEventListener("transitionend", function() {
        if (index >= 9) {
            index = 1;
            // 清过渡
            removeTransition();
            // 做位移
            setTranslateX(-index * width);
        } else if (index <= 0) {
            index = 8;
            // 清过渡
            removeTransition();
            // 做位移
            setTranslateX(-index * width);
        }
        setPoint();
    });
    // 设置小点
    var setPoint = function() {
        for (var i = 0, len = points.length; i < len; i++) {
            var obj = points[i];
            obj.classList.remove("current");
        }
        points[index - 1].classList.add("current");
    };
    // 滑动实现
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener("touchstart", function(e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener("touchmove", function(e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        // 计算移动的距离
        var translateX = (-index * width) + distanceX;
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener("touchend", function(e) {
        // 判断是否有移动
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTranslateX(-index * width);
            } else {
                if (distanceX < 0) {
                    // 向右边滑动
                    index++;
                } else {
                    index--;
                }
                addTransition();
                setTranslateX(-index * width);
            }
        }
        // 参数重置
        startX = 0;
        distanceX = 0;
        isMove = false;
        // 重启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            // 加过渡
            addTransition();
            // 做位移
            setTranslateX(-index * width);
        }, 2000);
    });
}

var downTime = function() {
    var time = 2 * 60 * 60;
    var spans = document.querySelector(".time").querySelectorAll("span");
    console.log(spans);
    var timer = setInterval(function() {
        time--;
        var hour = Math.floor(time / 3600);
        var minute = Math.floor(time % 3600 / 60);
        var second = time % 60;

        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = hour % 10;
        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = minute % 10;
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = second % 10;
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}