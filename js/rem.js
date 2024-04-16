

(function (window, document) {
  var doEl = document.documentElement;
  // 这里只对iOS设备进行dpr的计算，android默认为1
  var dpr = window.devicePixelRatio || 1;

  function _rootFontSize () {
    if (document.body) {
      doEl.style.fontSize = window.innerWidth / 10 + 'px';
    } else {
      document.addEventListener('DOMContentLoaded', _rootFontSize);
    }
  }

  _rootFontSize();

  function _rootDpr () {
    if (document.body) {
      document.body.setAttribute('data-dpr', dpr);
    } else {
      document.addEventListener('DOMContentLoaded', _rootDpr);
    }
  }

  _rootDpr();
})(window, document);
