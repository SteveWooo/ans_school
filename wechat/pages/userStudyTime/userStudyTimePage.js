const app = getApp();
const request = require("../../utils/request").request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData : {},
    loading : false
  },

  getUserData : function(){
    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/user/get"
    }, function resp(res){
      that.setData({
        loading : false
      })
      that.setData({
        userData : res.data.rows[0]
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserData();
  }
})