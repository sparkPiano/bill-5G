/*
 * @Description: router
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:21
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2021-01-25 16:26:45
 * @FilePath: \ccbProject\ccb_5g\src\router\router.js
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Vue from "vue";
import Router from "vue-router";
import VueCookies from "vue-cookies";
import store from "../vuex/store";
import General from "@/utils/general";

Vue.use(Router);
Vue.use(VueCookies);
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/home/Home.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "首页",
        requireAuth: true,
        isShowTabbar: true,
        name: ""
      }
    },
    {
      path: "/",
      meta: {
        title: "登录",
        name: ""
      },
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/Index.vue"),
      meta: {
        title: "登录",
        name: ""
      }
    },
    {
      path: "/apps",
      name: "apps",
      component: () => import("../views/apps/Applications.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "应用",
        requireAuth: true,
        isShowTabbar: true,
        name: "返回"
      }
    },
    {
      path: "/services",
      name: "services",
      component: () => import("../views/services/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "输入信息",
        requireAuth: true,
        name: "5G消息服务开通"
      }
    },
    {
      path: "/verifycode",
      name: "verifycode",
      component: () => import("../views/services/verifycode/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "输入密码",
        requireAuth: true,
        name: "5G消息服务开通"
      }
    },
    {
      path: "/confirmInfo",
      name: "confirmInfo",
      component: () => import("../views/services/confirmInfo/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "信息确认",
        requireAuth: true,
        name: "5G消息服务开通"
      }
    },
    {
      path: "/successpage",
      name: "successpage",
      component: () => import("../views/services/success/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "提交成功",
        requireAuth: true,
        name: "5G消息服务开通"
      }
    },
    {
      path: "/billingdetails",
      name: "billingdetails",
      component: () => import("../views/billingdetails/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "账单明细查询",
        requireAuth: true,
        name: "账单明细查询"
      }
    },
    {
      path: "/curr",
      name: "curr",
      component: () =>
        import("../views/billingdetails/currentBilling/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "本期账单",
        requireAuth: true,
        name: "本期账单"
      },
      redirect: "/currbilling",
      children: [
        {
          path: "/currbilling",
          name: "currbilling",
          component: () =>
            import("../components/billing/currBilling/XCurrBilling.vue"),
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            title: "本期账单",
            requireAuth: true,
            name: "本期账单"
          }
        },
        {
          path: "/billingInfo",
          name: "billingInfo",
          component: () =>
            import("../components/billing/currBilling/XBillingInfo.vue"),
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            title: "本期账单",
            requireAuth: true,
            name: "本期账单"
          }
        },
        {
          path: "/billedInfo",
          name: "billedInfo",
          component: () =>
            import("../components/billing/currBilling/XBilled.vue"),
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            title: "已出账单详情",
            requireAuth: true,
            name: "已出账单详情"
          }
        }
      ]
    },
    {
      path: "/his",
      name: "his",
      component: () => import("../views/billingdetails/hisBilling/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "历史账单",
        requireAuth: true,
        name: "历史账单"
      },
      redirect: "/hisbilling",
      children: [
        {
          path: "/hisbilling",
          name: "hisbilling",
          component: () =>
            import("../components/billing/hisBilling/XHisBilling.vue"),
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            title: "历史账单",
            requireAuth: true,
            name: "历史账单"
          }
        },
        {
          path: "/hisbillingdetail",
          name: "hisbillingdetail",
          component: () =>
            import("../components/billing/hisBilling/XHisBillingDetail.vue"),
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            title: "历史账单明细",
            requireAuth: true,
            name: "历史账单明细"
          }
        }
      ]
    },
    {
      path: "/transaction",
      name: "transaction",
      component: () =>
        import("../views/billingdetails/transactionDetails/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "交易明细查询",
        requireAuth: true,
        name: "交易明细查询"
      },
      redirect: "/transactionDetails",
      children: [
        {
          path: "/transactionDetails",
          name: "transactionDetails",
          component: () =>
            import(
              "../components/billing/transactionDetails/XTransactionDetails.vue"
            ),
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            title: "交易明细查询",
            requireAuth: true,
            name: "交易明细查询"
          }
        },
        {
          path: "/hisDetail",
          name: "hisDetail",
          component: () =>
            import("../components/billing/transactionDetails/XHisDetails.vue"),
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            title: "历史账单明细",
            requireAuth: true,
            name: "历史账单明细"
          }
        }
      ]
    },
    {
      path: "/unbilled",
      name: "unbilled",
      component: () => import("../views/billingdetails/unbilled/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "未出账单",
        requireAuth: true,
        name: "未出账单"
      }
    },
    {
      path: "/qrcode",
      name: "qrcode",
      component: () => import("../views/qrcode/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "商品购物券",
        requireAuth: false,
        name: "商品购物券"
      }
    },
    {
      path: "/error",
      name: "error",
      component: () => import("../views/error/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "错误页",
        name: "错误页"
      }
    },
    {
      path: "/blank",
      name: "blank",
      component: () => import("../views/blank/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "中转页",
        name: ""
      }
    }
    // {
    //   path: "/test",
    //   name: "test",
    //   component: () => import("../views/test/Index.vue"),
    //   meta: {
    //     title: "测试",
    //     name: ""
    //   },
    //   query: { hide: "hide-nav" }
    // }
  ]
});
router.beforeEach((to, from, next) => {
  console.log("ready to enter 1", to);
  console.log("ready to leave 1", from);
  store.commit("updateEntryUrl", {
    entryUrl: to.fullPath
  });
  if (to.name == "login" || to.path == "/login") {
    store.commit("updateCommon", {
      commonAll: {}
    });
    let params = getParam("params");
    let tel = getParam("tel");
    let type = getParam("type");
    sessionStorage.setItem("half", params);
    sessionStorage.setItem("tl", tel);
    sessionStorage.setItem("tp", type);
    store.commit("updateCommon", {
      commonAll:
        filterRouter(type) && filterRouter(type).length > 0
          ? filterRouter(type)[0].extra
          : {}
    });
  }
  if (to.name == "qrcode" || to.path == "/qrcode") {
    let code = getParam("Coupon_Code");
    sessionStorage.setItem("cd", code);
  }
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限

    if (new Boolean(General.getCache("param_a")).valueOf()) {
      store.commit("updateLogin", {
        login: new Boolean(General.getCache("param_a")).valueOf()
      });
    }
    if (store.state.login) {
      General.setCache("param_a", store.state.login);
      // 通过vuex state获取当前登录状态
      next();
    } else {
      next(
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        {
          path: "/error",
          query: { hide: "hide-nav" }
        }
      );
    }
  } else {
    //如果不需要正常跳转
    next();
  }
});
router.afterEach((to, from) => {
  //这里不接收next
});
router.onError(error => {
  console.log("router", error);
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  // eslint-disable-next-line no-unused-vars
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    //location.reload();
    //router.replace(targetPath);
  }
});

function getParam(param) {
  return (
    decodeURI(General.getQueryStringByName(param)) ||
    decodeURI(
      General.getQueryStringByName(param, `?${location.href.split("?")[1]}`)
    )
  );
}

function filterRouter(tp) {
  let filterRouter = [];
  if (process.env.NODE_ENV === "development") {
    const routerList = process.env.SWITCH_OPEN || [];
    console.log("routerList", routerList);
    filterRouter = routerList.filter(curVal => {
      return tp == curVal.type;
    });
  } else {
    const routerList = process.env.SWITCH_OPEN || [];
    console.log("routerList1", routerList);
    filterRouter = routerList.filter(curVal => {
      return tp == curVal.type;
    });
  }
  return filterRouter;
}

export default router;
