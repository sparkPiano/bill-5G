/*
 * @Description: general.js
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-27 10:32:13
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-09-25 16:58:10
 * @FilePath: \ccbProject\ext_admin\src\plugins\general.js
 */
function GVerify(options) {
  // 创建一个图形验证码对象，接收options对象为参数
  this.options = {
    // 默认options参数值
    id: "", // 容器Id
    canvasId: "verifyCanvas", // canvas的ID
    width: "100", // 默认canvas宽度
    height: "48", // 默认canvas高度
    type: "blend", // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
    code: ""
  };

  if (Object.prototype.toString.call(options) == "[object Object]") {
    // 判断传入参数类型
    for (let i in options) {
      // 根据传入的参数，修改默认参数值
      this.options[i] = options[i];
    }
  } else {
    this.options = options;
  }

  this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
  this.options.letterArr = getAllLetter();

  this._init();
  this.refresh();
}

GVerify.prototype = {
  /** 版本号* */
  version: "1.0.0",

  /** 初始化方法* */
  _init: function() {
    const con = document.getElementById(this.options.id);
    const canvas = document.createElement("canvas");
    this.options.width =
      con.offsetWidth > 0 ? con.offsetWidth : this.options.width;
    this.options.height =
      con.offsetHeight > 0 ? con.offsetHeight : this.options.height;
    canvas.id = this.options.canvasId;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    canvas.style.cursor = "pointer";
    canvas.innerHTML = "您的浏览器版本不支持canvas";
    con.appendChild(canvas);
    const parent = this;
    canvas.onclick = function() {
      parent.refresh();
    };
  },

  /** 生成验证码* */
  refresh: function() {
    this.options.code = "";
    const canvas = document.getElementById(this.options.canvasId);
    let ctx = null;
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
    } else {
      return;
    }

    ctx.textBaseline = "middle";

    ctx.fillStyle = randomColor(180, 240);
    ctx.fillRect(0, 0, this.options.width, this.options.height);
    let txtArr = [];
    if (this.options.type == "blend") {
      // 判断验证码类型
      txtArr = this.options.numArr.concat(this.options.letterArr);
    } else if (this.options.type == "number") {
      txtArr = this.options.numArr;
    } else {
      txtArr = this.options.letterArr;
    }

    for (let i = 1; i <= 5; i++) {
      let txt = txtArr[randomNum(0, txtArr.length)];
      this.options.code += txt;
      ctx.font =
        randomNum(this.options.height / 2, this.options.height) +
        "px SimHei, sans-serif"; // 随机生成字体大小
      ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色
      ctx.shadowOffsetX = randomNum(-3, 3);
      ctx.shadowOffsetY = randomNum(-3, 3);
      ctx.shadowBlur = randomNum(-3, 3);
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      const x = ((this.options.width - 10) / 6) * i;
      const y = this.options.height / 2;
      const deg = randomNum(-30, 30);
      /** 设置旋转角度和坐标原点* */
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      /** 恢复旋转角度和坐标原点* */
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    }
    /** 绘制干扰线* */
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(
        randomNum(0, this.options.width - 20),
        randomNum(0, this.options.height)
      );
      ctx.lineTo(
        randomNum(0, this.options.width - 20),
        randomNum(0, this.options.height)
      );
      ctx.stroke();
    }
    /** 绘制干扰点* */
    for (let i = 0; i < this.options.width / 5; i++) {
      ctx.fillStyle = randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        randomNum(0, this.options.width),
        randomNum(0, this.options.height),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  },

  /** 验证验证码* */
  validate: function(code) {
    code = code.toLowerCase();
    const v_code = this.options.code.toLowerCase();
    if (code == v_code) {
      return true;
    } else {
      return false;
    }
  }
};
/** 生成字母数组* */
function getAllLetter() {
  const letterStr =
    "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
  return letterStr.split(",");
}
/** 生成一个随机数* */
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
/** 生成一个随机色* */
function randomColor(min, max) {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}

// 设计稿以750px为宽度，而把页面宽度设计为10rem的情况下

//如果设计稿基于iphone6，横向分辨率为750，body的width为750 / 100 = 7.5rem
//如果设计稿基于iphone4/5，横向分辨率为640，body的width为640 / 100 = 6.4rem
function setRem() {
  // 实际设备页面宽度和设计稿的比值
  let deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 750) deviceWidth = 750;
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
  // if (deviceWidth > 750) deviceWidth = 750;
  // let scale = 1 / devicePixelRatio;
  // document
  //   .querySelector('meta[name="viewport"]')
  //   .setAttribute(
  //     "content",
  //     "initial-scale=" +
  //       scale +
  //       ", maximum-scale=" +
  //       scale +
  //       ", minimum-scale=" +
  //       scale +
  //       ", user-scalable=no"
  //   );
  // // 计算实际的rem值并赋予给html的font-size
  // document.documentElement.style.fontSize = deviceWidth / 10 + "px";
}
// setRem();
// window.addEventListener("resize", () => {
//   setRem();
// });

/**
 * @description: cookieName
 * @event: clearCookie
 * @param {*} cookieName 键名
 * @return: void
 */
function clearCookie(cookieName) {
  let now = new Date(),
    yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
  setCookie(cookieName, "", yesterday);
}
/**
 * @description: 设置cookies
 * @event: setCookie
 * @param {*} cookieName 键名
 * @param {*} cookieValue 键值
 * @param {*} expires 过期时间
 * @param {*} path 路径
 * @param {*} domain 域名
 * @param {*} secure 安全
 * @return: void
 */
function setCookie({
  cookieName,
  cookieValue,
  expires,
  path = "/",
  domain,
  secure
}) {
  let cookie = escape(cookieName) + "=" + escape(cookieValue);
  if (expires) cookie += ";expires=" + expires.toGMTString();
  if (expires) cookie += ";path=" + path;
  if (expires) cookie += ";domain=" + domain;
  if (expires) cookie += ";secure=" + secure;
  document.cookie = cookie;
}

/**
 * @description: 获取cookies
 * @event: getCookie
 * @param {*} cookieName 键名
 * @return: 返回键值
 */
function getCookie(cookieName) {
  let cookieValue = "",
    cookie = document.cookie,
    posName = cookie.indexOf(escape(cookieName) + "=");
  if (posName != -1) {
    let posValue = posName + (escape(cookieName) + "=").length,
      endPos = cookie.indexOf(";", posValue);
    if (endPos != -1)
      cookieValue = unescape(cookie.substring(posValue, endPos));
    else cookieValue = unescape(cookie.substring(posValue));
  }
  return cookieValue;
}
/**
 * @description: 深拷贝
 * @event: deepCopy
 * @param {*} obj 需要进行深拷贝的对象
 * @return: 返回深拷贝值
 */
function deepCopy(obj) {
  if (obj === null) return null;
  if (typeof obj !== "object") return obj;
  if (obj.constructor === Date) return new Date(obj);
  if (obj.constructor === RegExp) return new RegExp(obj);
  let newObj = new obj.constructor(); //保持继承链
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      //不遍历其原型链上的属性
      let val = obj[key];
      newObj[key] = typeof val === "object" ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
    }
  }
  return newObj;
}
/**
 * @description: 绘制钟表刻度线
 * @event: createTimeLine
 * @return: 返回刻度列表
 */
function createTimeLine() {
  /* 绘制钟表的时钟刻度线 */
  let list = [];
  // key1表示x方向上的偏移量，key2表示y方向上的偏移量
  let val, key1, key2;
  for (let i = 0; i < 36; i++) {
    val = i * 10;
    key1 = 290;
    key2 = 0;
    if (val >= 180 && val < 270) {
      key1 = 290 / 100;
    }
    if (val >= 270 && val < 360) {
      key1 = 288 / 100;
    }
    if (val >= 0 && val < 180) {
      key1 = 286 / 100;
    }

    if (val > 90 && val < 270) {
      key2 = 1;
    }
    if (val < 90 || val > 270) {
      key2 = -1;
    }
    list.push({ deg: val, key1: key1 + "rem", key2: key2 });
  }
  console.log(this.list);
  return list;
}
/**
 * @description: 判断是否为微信客户端
 * @event: isMiniProgram
 * @return: 返回Promise对象
 */
function isMiniProgram() {
  return new Promise((resolve, reject) => {
    if (
      navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1 ||
      navigator.userAgent.match(/_SQ_/i) == "_sq_"
    ) {
      // eslint-disable-next-line no-undef
      wx.miniProgram.getEnv(res => {
        if (!res.miniprogram) {
          resolve(false);
          return;
        } else {
          resolve(true);
        }
      });
    } else {
      resolve(false);
      return;
    }
  });
}

// 获取本地存储
function getCache(name) {
  return localStorage.getItem(name) || "";
}
// 设置本地存储
function setCache(name, value) {
  localStorage.setItem(name, value);
}

function clearCache(name) {
  localStorage.removeItem(name);
}

/**
 * @description: 时间格式化
 * @event: formatTime
 * @param {*} date 需要格式化的时间/字符串
 * @param {*} fmt：格式，如"yyyy-MM-dd"为2016-05-03，"yyyy-M-d"为2016-5-3，"MM-dd hh:mm"为05-03 17:08
 * @return: 格式化后的时间格式
 */
function formatTime(date, fmt) {
  if (!date) return;
  if (
    typeof date === "string" ||
    (typeof date === "object" && date.constructor === Date)
  ) {
    if (typeof date === "string") {
      date = date.replace(/-/g, "/");
      let index = date.indexOf(",");
      if (index > -1) {
        date = date.substring(0, index);
      }
      date = new Date(date);
      if (date == "Invalid Date") return date;
    }
    let o = {
      "M+": date.getMonth() + 1, //月份
      "D+": date.getDate(), //日
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/((y+)|(Y+))/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  } else {
    return date;
  }
}
// url参数及操作 ============================
// 获取所有的url参数，有参数时，只返回指定参数
function GetQueryString(name) {
  return name ? getQueryStringByName(name) : getUrlParam();
}
//根据QueryString参数名称获取值
function getQueryStringByName(name, search) {
  search = search || location.search;
  var result = search.match(new RegExp("[?&]" + name + "=([^&]+)", "i"));
  if (result == null || result.length < 1) return "";
  return unescape(result[1]);
}
// 获取所有的url参数，有参数时，只返回指定参数
function getUrlParam(name, search) {
  search = search || location.search.replace(/^\?/, "");
  var r = {};
  if (search) {
    var param = unescape(search).split("&");
    for (var i = 0; i < param.length; i++) {
      var item = param[i].split("=");
      r[item[0]] = item[1];
    }
  }
  return name ? r[name] : r;
}

/**
 *获取url参数对象
 */
function getUrlParamsObj() {
  let paramsObj = {};
  // ?key=value...
  let search = window.location.search;
  // 若没有参数则返回空对象
  if (search !== "") {
    let paramsArr = search.slice(1).split("&");
    paramsArr.forEach(item => {
      let paramArr = item.split("=");
      paramsObj[paramArr[0]] = paramArr[1];
    });
  }
  return paramsObj;
}

// 获取当前时间， 并返回年月日
function getTimeX(time) {
  let date = new Date(time);
  let month;
  let day;
  // console.log(date.getMonth())
  //  console.log(date.getDate())
  if (date.getMonth() < 9) month = "0" + (date.getMonth() + 1) + "-";
  else month = date.getMonth() + 1 + "-";
  if (date.getDate() < 10) day = "0" + date.getDate();
  else day = date.getDate();
  return date.getFullYear() + "-" + month + day;
}

export default {
  GVerify,
  clearCookie,
  getCookie,
  setCookie,
  setRem,
  deepCopy,
  createTimeLine,
  isMiniProgram,
  getQueryStringByName,
  GetQueryString,
  getUrlParam,
  formatTime,
  getCache,
  setCache,
  clearCache,
  getTimeX,
  getUrlParamsObj
};
