const app = getApp();
const request = require("../../utils/request").request;
const format_time = require("../../utils/util").formatTime;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information_id : "",
    information : {},
    userData : {},
    loading : false,
    comment : {
      page : 1,
      list : [],
    }
  },

  //拉评论
  getComment : function(callback){
    var that = this;
    this.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/comment/get?information_id=" + that.data.information_id
    }, function resp(res){
      that.setData({
        loading : false
      })
      if(res.status != '2000'){
        wx.showToast({
          icon : "none",
          title : res.error_message
        })
        callback(undefined);
        return ;
      }
      var comment = that.data.comment;
      comment.list = res.data.rows;
      that.setData({
        comment : comment
      })
      callback(res);
    })
  },

  getInformation : function(callback){
    var that = this;
    this.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/information/get?information_id=" + that.data.information_id
    }, function resp(res){
      that.setData({
        loading : false
      })
      if(res.status != '2000'){
        wx.showToast({
          icon : "none",
          title : res.error_message
        })
        callback(undefined);
        return ;
      }
      res.data.rows[0].create_at = format_time(new Date(parseInt(res.data.rows[0].create_at)));
      that.setData({
        information : res.data.rows[0]
      })
      callback(res);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userData = app.globalData.userData;
    var that = this;
    this.setData({
      information_id : options.information_id,
      userData : userData
    })
  },

  onShow : function(){
    var that = this;
    this.getInformation(function resp(res){
      that.getComment(function resp(res){})
    });
  },

  submitDelete : function(options){
    var comment_id = options.comment_id;
    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/comment/delete",
      headers : {
        'Content-Type' : 'Application/json'
      },
      method : 'post',
      data : {
        comment_id : comment_id
      }
    }, function resp(res){
      that.setData({
        loading : false
      })
      if(res.status == "2000"){
        wx.showToast({
          title : "删除成功..."
        })
        that.onShow();
      }
    })
  },

  onDelete : function(e){
    var that = this;
    var comment_id = e.currentTarget.dataset.comment_id;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.submitDelete({
            comment_id : comment_id
          })
        } else if (sm.cancel) {

        }
      }
    })
  },

  toComment : function(){
    var information_id = this.data.information_id;
    wx.navigateTo({
      url : "../informationComment/informationCommentPage?information_id=" + information_id
    })
  }
})