const app = getApp();
const setUserInfo = require("../../utils/request").setUserInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {},
    operation : {
      list : [
        {
          name : '加入学习交流群',
          router : "userWGroup/userWGroupPage",
          icon_url: app.globalData.config.baseResUrl + "/icons/group.png"
        },
        {
          name : '学习时长',
          router : "userStudyTime/userStudyTimePage",
          icon_url : app.globalData.config.baseResUrl + "/icons/study_time.png"
        }, {
          name : '意见反馈',
          router : "userFeedBack/userFeedBackPage",
          icon_url : app.globalData.config.baseResUrl + "/icons/feedback.png"
        }
      ]
    }
  },

  onShow: function () {
    this.setData({
      userInfo : app.globalData.userInfo
    })
  },

  toRouter : function(e){
    var router = e.currentTarget.dataset.router;
    wx.navigateTo({
      url : "../" + router
    })
  }
})