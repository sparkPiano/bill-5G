/*
 * @Description: mixins
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 15:50:06
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2021-01-19 19:36:50
 * @FilePath: \ccbProject\ccb_5g\src\mixins\mixin.js
 */
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export const mixin = {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  updated() {},
  methods: {
    login() {
      let that = this;
      that.$xhr.post(
        "/CCBRCS/ccbsns/Login",
        {
          params: sessionStorage.getItem("half"),
          tel: sessionStorage.getItem("tl")
        },
        "login",
        response => {
          // eslint-disable-next-line no-empty
          console.log("response---", response);
          if (response.status >= 200 && response.status < 300) {
            if (
              response.data &&
              response.data.HEADER.retcode === "000000000000"
            ) {
              that.$store.commit("updateLogin", { login: true });
              sessionStorage.setItem("sunny", response.data.BODY.token);
              that.gotoRouter();
            } else {
              that.$general.clearCache("param_a");
              that.$store.commit("updateLogin", { login: false });
              if (response.data.HEADER) {
                that.showErrorTips({ response, btnText: "返回" });
              } else {
                that.$vux.alert.show({
                  title: "提示",
                  content: `${response.message}，请联系相关人员修复`,
                  onShow() {},
                  onHide() {
                    that.$router.push({
                      path: "/error",
                      query: { hide: "hide-nav" }
                    });
                  }
                });
              }
            }
          } else {
            that.$router.push({
              path: "/qrcode",
              query: { hide: "hide-nav" }
            });
            that.$general.clearCache("param_a");
            that.$store.commit("updateLogin", { login: false });
            if (response.data.HEADER) {
              that.showErrorTips({ response, btnText: "返回" });
            } else {
              that.$vux.alert.show({
                title: "提示",
                content: `${response.message}，请联系相关人员修复`,
                onShow() {},
                onHide() {
                  that.$router.push({
                    path: "/error",
                    query: { hide: "hide-nav" }
                  });
                }
              });
            }
          }
        }
      );
    },
    showErrorTips({ response, btnText }) {
      let that = this;
      console.log("xxxx", response);
      that.$vux.alert.show({
        title: "温馨提示",
        content: `状态码：${response.data.HEADER.retcode}，状态信息：${
          response.data.HEADER.retmsg
            ? response.data.HEADER.retmsg
            : response.message
            ? response.message
            : "登录失败"
        }，重新发送账单查询。`,
        buttonText: btnText,
        onShow() {},
        onHide() {
          that.$router.push({
            path: "/error",
            query: { hide: "hide-nav" }
          });
        }
      });
    },
    gotoRouter() {
      let that = this;
      const tp = sessionStorage.getItem("tp");
      that.$router.push({
        params: {
          login: true
        },
        name:
          that.filterRouter(tp) && that.filterRouter(tp).length > 0
            ? that.filterRouter(tp)[0].routerName
            : "billingdetails"
      });
    },
    filterRouter(tp) {
      let filterRouter = [];
      console.log("tp", tp, process.env.VUE_APP_SWITCH);
      if (process.env.NODE_ENV === "development") {
        const routerList = JSON.parse(process.env.VUE_APP_SWITCH) || [];
        console.log("routerList", routerList);
        filterRouter = routerList.filter(curVal => {
          return tp == curVal.type;
        });
      } else {
        const routerList = JSON.parse(process.env.VUE_APP_SWITCH) || [];
        console.log("routerList1", routerList);
        filterRouter = routerList.filter(curVal => {
          return tp == curVal.type;
        });
      }
      return filterRouter;
    }
  },
  components: {}
};
