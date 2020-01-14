//index.js
//获取应用实例
const app = getApp();
const setUserInfo = require("../../utils/request").setUserInfo;
const request = require("../../utils/request").request;
Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    interval : undefined
  }, 

  setTimeInterval : function(){
    var interval = this.data.interval;
    var that = this;
    interval = setInterval(function(){
      request({
        url : app.globalData.config.baseUrl + "/api/w/user/add_time",
      }, function resp(res){})
    }, 60000)
  },

  //进入主页
  goMain : function(){
    this.setTimeInterval();
    wx.switchTab({
      url: '../main/mainPage'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //不用自动获取的逻辑
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //     this.goMain();
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //       this.goMain();
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //         this.goMain();
  //       }
  //     })
  //   }
  // },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    var that = this;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    setUserInfo(app.globalData.userInfo, function resp(){
      that.goMain();
    })
  }
})
