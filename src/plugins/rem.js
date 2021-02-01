// 设计稿以750px为宽度，而把页面宽度设计为10rem的情况下
//wangyi
//如果设计稿基于iphone6，横向分辨率为750，body的width为750 / 100 = 7.5rem
//如果设计稿基于iphone4/5，横向分辨率为640，body的width为640 / 100 = 6.4rem
function setRem() {
  // 实际设备页面宽度和设计稿的比值
  let deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 750) deviceWidth = 750;
  document.documentElement.style.fontSize = deviceWidth / 3.75 + "px";
  //   let deviceWidth = document.documentElement.clientWidth;//taobao
  //   if (deviceWidth > 750) deviceWidth = 750;
  //   let scale = 1 / devicePixelRatio;
  //   document
  //     .querySelector('meta[name="viewport"]')
  //     .setAttribute(
  //       "content",
  //       "initial-scale=" +
  //         scale +
  //         ", maximum-scale=" +
  //         scale +
  //         ", minimum-scale=" +
  //         scale +
  //         ", user-scalable=no"
  //     );
  //   // 计算实际的rem值并赋予给html的font-size
  //   document.documentElement.style.fontSize = deviceWidth / 10 + "px";
}
setRem();
window.addEventListener("resize", () => {
  setRem();
});
