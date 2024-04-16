(function (w) {
  class Storage {
    constructor(type = "local") {
      this.storage = w[`${type}Storage`]
      this.history = {}
    }


    //设置存储项
    setStorage (...args) {
      const len = args.length;
      if (len === 0) {
        //如果无参数 return false终止后续
        return false;
      }
      if (len === 2) {
        //如果两个参数 并且两个参数都不是对象或者数组 以字符串形式setItem
        if (args.every(item => typeof item !== 'object')) {
          this.history[args[0]] = args[1];
          this.storage.setItem(String(args[0]), String(args[1]));
        }
        //反馈设置项目 提供check
        return {
          [args[0]]: args[1]
        }
      }

      if (len === 1) {
        //如果1个参数 并且是对象 合并到this.history中并且 迭代设置每一项
        if (Object.prototype.toString.call(args[0]) === "[object Object]") {
          let obj = args[0];
          Object.assign(this.history, obj);
          //返回给调用者一个 Array 方便check存储项目
          return Object.entries(obj).map(([key, value]) => {
            this.storage.setItem(key, value);
            return key;
          })
        }
      }
      //返回所有设置历史 供check
      return this.history;
    }


    //获取存储项目
    getStorage (...args) {
      const len = args.length;
      if (len === 0) {
        //如果不传参数 返回所有的存储项目
        return this.history;
      }
      if (len === 1 && Object.prototype.toString.call(args[0]) === "[object Array]" && args[0].length) {
        //如果只有一个参数并且参数维数组并且数组长度不为0
        let arr = args[0].slice();
        //循环数组获取数组每一项对应的值 返回一个json key(数组每一项):value(数组项对应值)
        return arr.reduce((acc, curr) => {
          acc[curr] = this.storage.getItem(curr);
          return acc;
        }, {});
      }
      if (len === 1 && Object.prototype.toString.call(args[0]) === "[object String]" && args[0].length) {
        //如果参数只有一个 并且类型是字符串 并且字符串长度不为0 获取对应项的值
        //如果不传参数 返回所有的存储项目
        return this.storage.getItem(args[0]);
      }

    }

    //参数可以是字符串 数组
    removeStorage (...args) {
      //降维args参数数组 扁平化处理
      args = args.flat(Infinity);
      //循环删除每一项
      args.forEach(item => {
        if (typeof item !== 'object') {
          if (this.history[item]) {
            delete this.history[item]
          }
          this.setStorage.removeItem(String(item));
        }
      })
    }

    //清空所有的storage 并且清空history
    clearStorage () {
      this.history = {};
      this.storage.clear();
    }

  }

  w.Storage = Storage;
})(window);