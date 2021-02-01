/*
 * @Description: axios请求数据
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-09-28 09:30:17
 * @LastEditors: Edison Lu
 * @LastEditTime: 2021-01-25 16:06:04
 */
/* eslint-disable */
import EventBus from "../utils/event-bus";
import Api from "../api/index";
import store from "../vuex/store";
import { Base64 } from "js-base64";

//请求账单明细查询
export const apiRequireAllBill = (obj) => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/CCBRCS/ccbsns/SNSService",
      {
        TXCODE: "5G1002",
        params: {
          Svc_ID: store.state.XBillingDetails.svcID, // 3是信用卡 4是客户号
          Cst_ID: "091190000103383912", //客户编号
          CrCrd_CardNo: store.state.XBillingDetails.crdCrad, //信用卡卡号
          Flt_Txn_Tp_Nm: store.state.XHisDetails.list2Title, //筛选交易类型
          StDt: store.state.XBillingDetails.startTime.replace(/-/g, ""), //开始日期
          EdDt: store.state.XBillingDetails.endTime.replace(/-/g, ""), //结束日期
          REC_IN_PAGE: store.state.XBillingDetails.current_page_num, //当前页配置数据条数
          PAGE_JUMP: store.state.XBillingDetails.page, //当前页
        },
      },
      null,
      response => {
        if (
          response.data.HEADER.retcode == "000000" ||
          response.data.HEADER.retcode == "000000000000"
        ) {
          let resulData = response.data.BODY;
          if(store.state.XBillingDetails.page >= response.data.BODY.TOTAL_PAGE) {
            store.state.XBillingDetails.isLoadMore = false;
            store.state.XBillingDetails.page = 0;
          }else{
            store.state.XBillingDetails.isLoadMore = true;
          }
          store.state.XBillingDetails.page++;
          store.commit("updateXBillingDetailsLoading", { loading: false });
          resolve(resulData);
        } else {
          store.commit("updateXBillingDetailsLoading", { loading: false });
          reject(response.data.HEADER);
        }
      }
    );
  });
};

//请求未出账单查询
export const apiRequireNotOutBill = (obj) => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/CCBRCS/ccbsns/SNSService",
      {
        TXCODE: "5G1002",
        params: {
          Svc_ID: 8,
          // CrCrd_CardNo: "4367450115264992", //信用卡卡号
          Cst_ID: "091190000103383912", //客户编号
          REC_IN_PAGE: store.state.XUnbilled.current_page_num, //当前页配置数据条数
          PAGE_JUMP: store.state.XUnbilled.page, //当前页
        },
      },
      null,
      response => {
        if (
          response.data.HEADER.retcode == "000000" ||
          response.data.HEADER.retcode == "000000000000"
        ) {
          console.log("if 1");
          let resulData = response.data.BODY;
          if(store.state.XUnbilled.page >= response.data.BODY.TOTAL_PAGE) {
            store.state.XUnbilled.isLoadMore = false;
            store.state.XUnbilled.page = 0;
          }else{
            store.state.XUnbilled.isLoadMore = true;
          }
          store.state.XUnbilled.page++;
          store.commit("updateXBillingDetailsLoading", { loading: false });
          resolve(resulData);
        } else {
          reject(response.data.HEADER);
        }
      }
    );
  });
};

//请求历史账单查询
export const apiRequireHisBill = (obj) => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/CCBRCS/ccbsns/SNSService",
      {
        TXCODE: "5G1001",
        params: {
          Svc_ID: 2,
          // CrCrd_CardNo: "oLbh2XKDLeaiOUx6Kn0K/a+wEG4yi59A", //信用卡卡号
          Cst_ID: "091190000103383912", //客户编号
          // CrCrd_Acg_Setl_Dt: store.state.XHisBill.yearMonthDay, //结束时间
          CrCrd_Acg_Setl_Dt: store.state.XHisBill.eDate, //结束时间
          Prd_Num: store.state.XHisBill.qishu, //期数
          REC_IN_PAGE: store.state.XHisBill.current_page_num, //当前页配置数据条数
          PAGE_JUMP: store.state.XHisBill.page, //当前页
        },
      },
      null,
      response => {
        if (
          response.data.HEADER.retcode == "000000" ||
          response.data.HEADER.retcode == "000000000000"
        ) {
          let resulData = response.data.BODY;
          console.log("xxx1",resulData)
          if(store.state.XHisBill.page >= response.data.BODY.TOTAL_PAGE) {
            store.commit("updateXbill",{isLoadMore: false,page: 0});
            // store.state.XHisBill.isLoadMore = false;
            // store.state.XHisBill.page = 0;
          }else{
            // store.state.XHisBill.isLoadMore = true;
            store.commit("updateXbill",{isLoadMore: true,page: store.state.XHisBill.page});
          }
          // store.state.XHisBill.page++;
          let page = store.state.XHisBill.page;
          page++;
          store.commit("updateXbill",{isLoadMore: store.state.XHisBill.isLoadMore,page: page});
          store.commit("updateXBillingDetailsLoading", { loading: false });
          resolve(resulData);
        } else {
          store.commit("updateXBillingDetailsLoading", { loading: false });
          console.log("xxxx2历史账单查询", response.data)
          reject(response.data.HEADER);
        }
        // if (
        //   response.data.HEADER.retcode == "000000" ||
        //   response.data.HEADER.retcode == "000000000000"
        // ) {
        //   let resulData = response.data.BODY;
        //   resolve(resulData);
        // } else {
        //   reject(response.data.HEADER);
        // }
      }
    );
  });
};

//请求本期账单查询 0215
export const apiRequireCurrBill = (obj) => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/CCBRCS/ccbsns/SNSService",
      {
        TXCODE: "5G1001",
        params: {
          Svc_ID: 2,
          // CrCrd_CardNo: "DRAmaGHgJk/suA6mobBmLHdUAvzQP+ud", //信用卡卡号
          REC_IN_PAGE: store.state.XCurrBilling.current_page_num, //当前页配置数据条数
          PAGE_JUMP: store.state.XCurrBilling.page, //当前页
          Cst_ID: "091190000103383912", //客户号
          CrCrd_Acg_Setl_Dt: obj, //信用卡账务结算日期
          Prd_Num: "1" //期数
        },
      },
      null,
      response => {
        if (
          response.data.HEADER.retcode == "000000" ||
          response.data.HEADER.retcode == "000000000000"
        ) {
          console.log("本地账单查询 response", response);
          let resulData = response.data.BODY;
          if(store.state.XCurrBilling.page >= response.data.BODY.TOTAL_PAGE) {
            store.commit("updateXCurrBilling",{isLoadMore: true,page: 0});
            // store.state.XCurrBilling.isLoadMore = false;
            // store.state.XCurrBilling.page = 0;
          }else{
            // store.state.XCurrBilling.isLoadMore = true;
            store.commit("updateXCurrBilling",{isLoadMore: true,page: store.state.XCurrBilling.page});
          }
          // store.state.XCurrBilling.page++;
          let page = store.state.XCurrBilling.page;
          page++;
          store.commit("updateXCurrBilling",{isLoadMore: store.state.XCurrBilling.isLoadMore,page: page});
          store.commit("updateXBillingDetailsLoading", { loading: false });
          resolve(resulData);
        } else {
          store.commit("updateXBillingDetailsLoading", { loading: false });
          console.log("xxxx3本期账单查询",response.data)
          reject(response.data.HEADER);
        }
        // if (
        //   response.data.HEADER.retcode == "000000" ||
        //   response.data.HEADER.retcode == "000000000000"
        // ) {
        //   let resulData = response.data.BODY;
        //   resolve(resulData);
        // } else {
        //   reject(response.data.HEADER);
        // }
      }
    );
  });
};

// 查询所有信用卡
export const apiRequireAllCard = (obj) => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/CCBRCS/ccbsns/SNSService",
      {
        TXCODE: "5G1003",
        params: {
          Svc_ID: 1,
          Cst_ID: "091190000103383912", //客户号
          REC_IN_PAGE: store.state.XHisDetails.current_page_num, //当前页配置数据条数
          PAGE_JUMP: store.state.XHisDetails.page, //当前页
        },
      },
      null,
      response => {
        if (
          response.data.HEADER.retcode == "000000" ||
          response.data.HEADER.retcode == "000000000000"
        ) {
          let resulData = response.data.BODY;
          resolve(resulData);
        } else {
          reject(response.data.HEADER);
        }
      }
    );
  });
};

// 请求5G1000拿到客户需要的账单时间 0268
export const apiRequire5000 = (obj) => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/CCBRCS/ccbsns/SNSService",
      {
        TXCODE: "5G1000",
        params: {
          Svc_ID: 2,
          Cst_ID: "091190000103383912", //客户号
          Prmt_Cyc_Num: 24,  //允许周期数量
          // EdDt: store.state.XHisBill.dateInfo //结束日期
        }
      },
      null,
      response => {
        if (
          response.data.HEADER.retcode == "000000" ||
          response.data.HEADER.retcode == "000000000000"
        ) {
          let resulData = response.data.BODY.LIST1[0].EdDt;
          resolve(resulData);
        } else {
          reject(response.data.HEADER);
        }
      }
    );
  });
};

// 为本期账单提交结束时间的交易
export const apiRequireCurr500 = (obj) => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/CCBRCS/ccbsns/SNSService",
      {
        TXCODE: "5G1000",
        params: {
          Svc_ID: 2,
          Cst_ID: "091190000103383912", //客户号
          Prmt_Cyc_Num: 1,  //允许周期数量
          // EdDt: store.state.XHisBill.dateInfo //结束日期
        }
      },
      null,
      response => {
        if (
          response.data.HEADER.retcode == "000000" ||
          response.data.HEADER.retcode == "000000000000"
        ) {
          let resulData = response.data.BODY.LIST1[0].EdDt;
          resolve(resulData);
        } else {
          reject(response.data.HEADER);
        }
      }
    );
  });
};

// 为本期账单提交结束时间的交易
export const apiRequireHis5000 = (obj) => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/CCBRCS/ccbsns/SNSService",
      {
        TXCODE: "5G1000",
        params: {
          Svc_ID: 2,
          Cst_ID: "091190000103383912", //客户号
          Prmt_Cyc_Num: 24,  //允许周期数量
          // EdDt: store.state.XHisBill.dateInfo //结束日期
        }
      },
      null,
      response => {
        if (
          response.data.HEADER.retcode == "000000" ||
          response.data.HEADER.retcode == "000000000000"
        ) {
          let resulData = response.data.BODY.LIST1;
          resolve(resulData);
        } else {
          reject(response.data.HEADER);
        }
      }
    );
  });
};