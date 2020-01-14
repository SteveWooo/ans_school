//app.js
const commonLogin = require("./utils/login.js");
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;

    // 登录
    commonLogin(this, function(result){
      var userData = result.loginRes.data.data.user;
      that.globalData.userData = userData;
    })
  },
  globalData: {
    userInfo: null,
    userData : null,
    config : {
      // baseUrl : "https://www.cybergear-cn.com",
      // baseResUrl : "https://www.cybergear-cn.com/res",
      baseUrl : "http://localhost:81",
      baseResUrl : "http://localhost:81/res"
    }
  }
})