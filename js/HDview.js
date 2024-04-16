'use strict';

/**
 * @param {Boolean} [normal = false] - 默认开启页面压缩以使页面高清;  
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
 */

(function (win) {
  win.flex = (baseFontSize, fontscale) => {
    const _baseFontSize = baseFontSize || 100;
    const _fontscale = fontscale || 1;

    const doc = win.document;
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
    const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    //获取设备DPR 赋值给变量 dpr
    let dpr = win.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
      // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
      dpr = 1;
    }
    //根据dpr 反比设置scale  dpr越高 缩放比例 越小  2dpr => scale(.5) 3dpr=>scale(.33)
    const scale = 1 / dpr;
    //获取meta viewport标签
    let metaEl = doc.querySelector('meta[name="viewport"]');
    if (!metaEl) {
      //如果没有 创建一个
      metaEl = doc.createElement('meta');
      metaEl.setAttribute('name', 'viewport');
      doc.head.appendChild(metaEl);
    }

    // 设置meta viewport 属性 拼接缩放比例到 content值中
    metaEl.setAttribute('content', `width=device-width,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
    //根据缩小倍率 反向 等比放大 html的font-size 保证实际效果一样
    doc.documentElement.style.fontSize = `${_baseFontSize / 2 * dpr}px`;
    document.documentElement.setAttribute('data-dpr', dpr)
  };
})(window);

