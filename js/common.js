"use strict"
/*
 * @Author: your name
 * @Date: 2020-08-10 18:59:12
 * @LastEditTime: 2020-08-15 17:13:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \案例\js\common.js
 */
//获取元素对象下标
function getElementIdx (item) {
  var elements = item.parentNode.children;
  for (var i = 0, len = elements.length; i < len; i++) {
    if (item === elements[i]) {
      return i;
    }
  }
}

//设置任意的标签中间的任意文本内容
function setInnerText (element, text) {
  var key = element.textContent == "undefined" ? 'innerText' : 'textContent';
  element[key] = text;
  // //判断浏览器是否支持这个属性
  // if (typeof element.textContent == "undefined") {//不支持
  //   element.innerText = text;
  // } else {//支持这个属性
  //   element.textContent = text;
  // }
}

//获取元素实际样式
function getStyle (obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

//设置元素样式
function setStyle (dom, css) {
  for (var key in css) {
    dom['style'][key] = css[key];
  }
}



//querySelector
function $ (ele) {
  return document.querySelector(ele);
}

//querySelectorAll
function $$ (ele) {
  return document.querySelectorAll(ele);
}



function addEventListener (element, type, fn) {
  if (element.addEventListener) {
    //标准浏览器写法
    element.addEventListener(type, fn, false);
  } else if (element.attachEvent) {
    //IE兼容写法
    element.attachEvent("on" + type, fn);
  } else {
    //on绑定写法
    element["on" + type] = fn;
  }
}


function removeEventListener (element, type, fn) {
  if (element.removeEventListener) {
    element.removeEventListener(type, fn, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, fn);
  } else {
    element["on" + type] = null;
  }
}

/**
 * @description: 函数的功效
 * @param {Object} element 需要监听的DOM对象
 * @param {String} type 事件类型 click mouseenter
 * @param {Function} fn 监听绑定的回调函数
 * @param {Boolean} capture true 捕获阶段监听 false 冒泡阶段监听 
 * @return {JSON} "remove":Function 返回一个用于解除监听的函数
 * @Date: 2020-08-10 22:45:25
 */
function eventListener (element, type, fn, capture) {
  capture = capture || false; //处理capture的默认值为 false
  if (element.addEventListener) {
    //标准浏览器写法
    element.addEventListener(type, fn, capture);
  } else {
    //IE兼容写法
    element.attachEvent("on" + type, fn);
  }

  return {
    'remove': function () {
      if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
      } else {
        element.detachEvent("on" + type, fn);
      }
    }
  }
}


function getPosition (element) {
  var pos = {
    left: 0,
    top: 0
  }
  while (element.offsetParent) {
    pos.left += element.offsetLeft;
    pos.top += element.offsetTop;
    element = element.offsetParent;
  }
  return pos;
}

/* 

ie/chrome: onmousewheel
   ev.wheelDelta:
      上：120
      下：-120
 
 ff: addEventListener('DOMMouseScroll',fn,false) 火狐用鼠标事件要用addEventListener绑定
  ev.detail:
     上：-3
     下：3
 
 阻止默认事件：
     return false 用于阻止一般形式的事件（如：on+事件名称）的默认行为
     ev.preventDefault() 用于阻止addEventListener绑定的事件的默认行为 */
function mousewheel (obj, fn) {

  obj.onmousewheel === null ? obj.onmousewheel = fun : obj.addEventListener('DOMMouseScroll', fun, false);

  function fun (e) {
    var e = e || event,
      num = 0;

    if (e.wheelDelta) {
      num = e.wheelDelta > 0 ? 1 : -1;
    } else {
      num = e.detail < 0 ? 1 : -1;
    }
    fn(num);

    if (e.preventDefault) e.preventDefault();
    return false;
  }
}






function openFullScreen (ele = document) {
  const requestFullScreens = ['requestFullscreen', 'webkitRequestFullScreen', 'mozRequestFullScreen', 'msRequestFullscreen'];
  for (let i = 0; i < requestFullScreens.length; i++) {
    let key = requestFullScreens[i];
    if (ele[key]) {
      ele[key]();
      return false;
    }
  }
}

function closeFullScreen () {
  const exitFullScreens = ['exitFullscreen', 'webkitCancelFullScreen', 'mozCancelFullScreen', 'msExitFullscreen'];
  for (let i = 0; i < exitFullScreens.length; i++) {
    let key = exitFullScreens[i];
    if (document[key]) {
      document[key]();
      return false;
    }
  }
}

function isFullScreen () {
  return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
}




