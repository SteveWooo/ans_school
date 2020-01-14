const app = getApp();
const request = require("../../utils/request").request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading : false,
    form : {
      content : ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //提交
  onSubmit : function(){
    var form = this.data.form;
    var that = this;

    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/user/feedback",
      data : form,
      method : 'post',
      headers : {
        'Content-Type' : 'Application/json'
      },
    }, function resp(res){
      that.setData({
        loading : false
      })
      if(res.status != '2000'){
        wx.showToast({
          icon : "none",
          title : res.error_message
        })
        return ;
      }
      wx.showToast({
        icon : "success",
        title : '提交成功'
      })
      setTimeout(function resp(){
        wx.navigateBack({})
      }, 1000);
    })
  },

  onFormInput : function(e){
    var value = e.detail.value;
    var key = e.currentTarget.dataset.item;
    var form = this.data.form;

    form[key] = value;

    this.setData({
      form : form
    })
  }
})