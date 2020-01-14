const app = getApp();
const request = require("../../utils/request").request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form : {
      information_id : "",
      comment : "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var form = this.data.form;
    form.information_id = options.information_id;
    this.setData({
      form : form
    })
  },

  onSubmit : function(){
    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/comment/add",
      headers : {
        'Content-Type' : 'Application/json'
      },
      method : 'post',
      data : that.data.form
    }, function resp(res){
      that.setData({
        loading : false
      })
      wx.showToast({
        title : "提交成功..."
      })

      setTimeout(function r(){
        wx.navigateBack({});
      }, 1000)
    })
  },

  //输入
  onFormInput : function(e){
    var item = e.currentTarget.dataset.item;
    var form = this.data.form;
    form[item] = e.detail.value;
    this.setData({
      form: form
    })
  }
})