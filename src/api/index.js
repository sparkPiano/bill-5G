/*
 * @Description: Axios
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:34:46
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2021-01-25 16:30:25
 * @FilePath: \ccbProject\ccb_5g\src\api\index.js
 */
import Vue from "vue";
import Axios from "axios";
import qs from "qs";
import { Base64 } from "js-base64";
import General from "@/utils/general";
import { AlertPlugin } from "vux";
import store from "../vuex/store";
import { EventBus } from "@/utils/event-bus";

Vue.use(AlertPlugin);

const MobileDetect = require("mobile-detect");

const md = new MobileDetect();

const brand = md.mobile();
const os_type = md.os();

let baseUrl = `${location.protocol}//${location.host}`;
const contentType = "application/json;charset=utf-8";

let header = {
  agent: "mbp1.0",
  version: "3.00",
  device: `${brand},${getMobileType()}`,
  platform: navigator.platform || `${os_type},${getOSVersion()}`,
  local: navigator.language,
  language:
    navigator.languages.length > 1
      ? navigator.languages[1]
      : navigator.language.split("-")[0],
  ext: ""
};

/**
 * @description: 获取手机类型
 * @event: getMobileType
 * @param {*} *
 * @return: 手机类型
 */
function getMobileType() {
  const device_type = navigator.userAgent; //获取userAgent信息
  const os = md.os(); //获取系统
  let model = "";
  if (os == "iOS") {
    //ios系统的处理
    model = md.mobile();
  } else if (os == "AndroidOS") {
    //Android系统的处理
    const sss = device_type.split(";");
    let i = sss.contains("Build/");
    if (i > -1) {
      model = sss[i].substring(0, sss[i].indexOf("Build/"));
    }
  }
  return model;
}

/**
 * @description: 获取手机系统版本
 * @event: getOSVersion
 * @param {*} *
 * @return: 手机系统版本
 */
function getOSVersion() {
  let u = navigator.userAgent,
    version = "";
  if (u.indexOf("Mac OS X") > -1) {
    //ios
    let regStr_saf = /OS [\d._]*/gi;
    let verinfo = u.match(regStr_saf);
    version = (verinfo + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");
  } else if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    //android
    version = u.substr(
      u.indexOf("Android") + 8,
      u.indexOf(";", u.indexOf("Android")) - u.indexOf("Android") - 8
    );
  } else if (u.indexOf("BB10") > -1) {
    //黑莓bb10系统
    version = u.substr(
      u.indexOf("BB10") + 5,
      u.indexOf(";", u.indexOf("BB10")) - u.indexOf("BB10") - 5
    );
  } else if (u.indexOf("IEMobile")) {
    //windows phone
    version = u.substr(
      u.indexOf("IEMobile") + 9,
      u.indexOf(";", u.indexOf("IEMobile")) - u.indexOf("IEMobile") - 9
    );
  }
  return version;
}

/**
 * @description: 创建Axios实例
 * @event: *
 * @param {type}
 * @return: 返回实例
 */
console.log("baseUrl", baseUrl);
const http = Axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  crossDomain: true,
  headers: {
    "Content-Type": contentType
  }
  // transformRequest: [
  //   function(data) {
  //     let newData = "";
  //     for (let k in data) {
  //       if (data.hasOwnProperty(k) === true) {
  //         newData +=
  //           encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
  //       }
  //     }
  //     return newData;
  //   }
  // ]
});
// 添加请求拦截器
http.interceptors.request.use(
  function(config) {
    store.commit("updateLoadingStatus", { isLoading: true });

    //每次请求获取session
    const hf = sessionStorage.getItem("half") || "";
    const sy = sessionStorage.getItem("sunny") || "";
    const tp = sessionStorage.getItem("tp") || "";
    const filterData = filterRouter(tp);
    const isOk = filterData && filterData.length > 0;
    console.log("filterData", filterData, isOk);
    // 在发送请求之前做些什么
    if (config.changeType === "blob") {
      config.responseType = "blob";
    }
    if (config.method === "post" || config.method === "put") {
      config.data.header = JSON.stringify(
        Object.assign({}, { half: hf, sunny: sy })
      );
      if (isOk) {
        Object.assign(
          config.data.params ? config.data.params : {},
          store.state.commonAll
        );
      }
      if (config.changeType === "form") {
        // 此处设置文件上传，配置单独请求头
        config.headers = {
          "Content-Type": "multipart/form-data;charset=utf-8"
        };
        config.data.params = Base64.encode(JSON.stringify(config.data.params));
      } else {
        config.headers = {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        };
        if (config.changeType === "blob") {
          config.data.params = Base64.encode(config.data.params);
        } else if (config.changeType === "login") {
          console.log("config params");
        } else {
          config.data.params = Base64.encode(
            JSON.stringify(config.data.params)
          );
        }
        config.data = qs.stringify(config.data);
      }
    } else {
      if (isOk) {
        Object.assign(
          config.params.params ? config.params.params : {},
          store.state.commonAll
        );
      }
      config.headers = {
        "Content-Type": "application/json;charset=utf-8"
      };
      config.params.header = JSON.stringify(
        Object.assign({}, { half: hf, sunny: sy })
      );
      if (config.changeType === "blob") {
        config.headers = {
          "Content-Type":
            "application/json;application/octet-stream;charset=utf-8"
        };
      }
      if (config.changeType === "blob") {
        config.params.params = Base64.encode(config.params.params);
      } else {
        config.params.params = Base64.encode(
          JSON.stringify(config.params.params)
        );
      }
      config.data = qs.parse(config.params);
    }
    console.log("config-req", config);
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    console.log("zongkong", error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    console.log("拦截响应", response);
    console.log("responese--cookies", document.cookie);
    if (response.config.changeType == "blob") {
      return response;
    } else {
      const status = response.status;
      const retCode = response.data.HEADER.retcode;
      const msg = response.data.HEADER.retmsg;

      if (status >= 200 && status < 300) {
        console.log("this", "new Vue()", this, new Vue().$vux);
        if (retCode === "000000" || retCode === "000000000000") {
          sessionStorage.setItem(
            "sunny",
            response.data.HEADER.SNSHEADERRET
              ? response.data.HEADER.SNSHEADERRET.sunny
              : response.data.BODY.token
              ? response.data.BODY.token
              : ""
          );
          return response;
        } else if (retCode === "P1SNS5G00007") {
          console.log("1");
          showErrorTips({
            title: "提示",
            retCode,
            msg,
            extraMsg: "请重新发送账单点击进行登录！"
          });
          return response;
        } else {
          console.log("2");
          showErrorTips({
            title: "提示",
            retCode,
            msg
          });
          return response;
        }
      } else {
        if (retCode === "P1SNS5G00007") {
          console.log("3");
          showErrorTips({
            title: "提示",
            retCode,
            msg,
            extraMsg: "请重新发送账单点击进行登录！"
          });
        } else {
          console.log("4");
          showErrorTips({
            title: "提示",
            retCode,
            msg
          });
        }
        return response;
      }
    }
  },
  function(error) {
    // 对响应错误做点什么
    // new Vue().$vux.alert.show({
    //   title: "提示",
    //   content: `${error.message}，请联系相关人员修复`,
    //   onShow() {},
    //   onHide() {}
    // });
    console.log("6", error);
    return {
      error: error,
      status: parseInt(
        `${error.message}`.substring(
          `${error.message}`.lastIndexOf(" "),
          `${error.message}`.length + 1
        )
      ),
      message: `${error.message}`,
      data: {}
    };
  }
);

function showErrorTips({ title, retCode, msg, extraMsg = "" }) {
  console.log("5");
  new Vue().$vux.alert.show({
    title: title,
    content: `响应状态码：${retCode}，状态信息：${msg}${extraMsg}`,
    onShow() {},
    onHide() {
      new Vue().$router.push({
        path: "/error",
        query: { hide: "hide-nav" }
      });
    }
  });
}

function filterRouter(tp) {
  let filterRouter = [];
  console.log("api", tp, process.env.VUE_APP_SWITCH);
  if (process.env.NODE_ENV === "development") {
    const routerList = JSON.parse(process.env.VUE_APP_SWITCH) || [];
    console.log("routerList api", routerList);
    filterRouter = routerList.filter(curVal => {
      return tp == curVal.type;
    });
  } else {
    const routerList = JSON.parse(process.env.VUE_APP_SWITCH) || [];
    console.log("routerList1 api", routerList);
    filterRouter = routerList.filter(curVal => {
      return tp == curVal.type;
    });
  }
  return filterRouter;
}

/**
 * @description: ajax请求
 * @event: apiAxios
 * @param {string} method 请求类型
 * @param {string} url api接口服务
 * @param {string/object} params 请求参数
 * @param {string} changeType 自定义请求类型，用于设定Content-type类型
 * @param {string/object} response 响应结果
 * @return: Promise
 */
function apiAxios(method, url, params, changeType, response) {
  http({
    method: changeType === "form" ? "POST" : method,
    url: url,
    changeType: changeType,
    data: method === "POST" || method === "PUT" ? params : null,
    params: method === "GET" || method === "DELETE" ? params : null
    // paramsSerializer: function(params) {
    //   let retParams = null;
    //   // eslint-disable-next-line no-debugger
    //   debugger;
    //   retParams = decodeURIComponent(
    //     qs.stringify(params, { arrayFormat: "indices" })
    //   );
    //   return retParams;
    // }
  })
    .then(function(res) {
      store.commit("updateLoadingStatus", { isLoading: false });
      response(res);
    })
    .catch(function(err) {
      store.commit("updateLoadingStatus", { isLoading: false });
      response(err);
    });
}

export default {
  get: (url, params, changeType, response) =>
    apiAxios("GET", url, params, changeType, response),
  post: (url, params, changeType, response) =>
    apiAxios("POST", url, params, changeType, response),
  put: (url, params, changeType, response) =>
    apiAxios("PUT", url, params, changeType, response),
  delete: (url, params, changeType, response) =>
    apiAxios("DELETE", url, params, changeType, response),
  getOSVersion: () => getOSVersion(),
  getMobileType: () => getMobileType(),
  header: header
};
