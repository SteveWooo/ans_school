const app = getApp();
const request = require("../../utils/request").request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab : 0,
    subject : {
      list : []
    },
    topicGroup : {
      page : 1,
      list : []
    },
    loading : false
  },

  //获取自助服务分类
  getSubject : function(callback){
    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/subject/get?item_per_page=100"
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

      //绑定数据
      var subject = that.data.subject;
      for(var i=0;i<res.data.rows.length;i++){
        subject.list.push(res.data.rows[i])
      }
      
      that.setData({
        subject : subject
      })
      callback(res);
    })
  },

  getTopicGroup : function(callback){
    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/topic_group/get?page=" + that.data.topicGroup.page +
        "&subject_id=" + that.data.subject.list[that.data.currentTab].subject_id
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

      //绑定数据
      var topicGroup = that.data.topicGroup;
      for(var i=0;i<res.data.rows.length;i++){
        topicGroup.list.push(res.data.rows[i]);
      }
      
      that.setData({
        topicGroup : topicGroup
      })
      callback(res);
    })
  },

  onLoad: function () {
    
  },

  onShow : function(){
    var that = this;

    //初始化数据：
    var subject = this.data.subject;
    var topicGroup = this.data.topicGroup;

    subject.list = [];
    topicGroup.list = [];
    topicGroup.page = 1;
    this.setData({
      subject : subject,
      topicGroup : topicGroup
    })

    this.getSubject(function resp(result){
      if(result.data.count == 0){
        return ;
      }
      that.getTopicGroup(function resp(result){

      })
    })
  },

  onPullDownRefresh : function(){
    this.onShow();
    wx.stopPullDownRefresh();
  },

  //切换tab
  switchTab : function(e){
    var current = e.currentTarget.dataset.current;
    var topicGroup = this.data.topicGroup;
    topicGroup.list = [];
    topicGroup.page = 1;
    this.setData({
      currentTab : current,
      topicGroup : topicGroup
    })
    this.getTopicGroup(function resp(res){});
  },
  //翻页
  getNextPage : function(){
    //NOT DO
  },
  //前往考试
  toTopic : function(e){
    var id = e.currentTarget.dataset.topic_group_id;
    wx.navigateTo({
      url : "../topic/topicPage?topic_group_id=" + id
    })
  },
  toReview : function(e){
    var topicGroup = e.currentTarget.dataset.topic_group;
    wx.navigateTo({
      url : '../topicReview/topicReviewPage?topic_group_id=' + topicGroup.topic_group_id
         + "&answers=" + topicGroup.user_record.answers
    })
  },

    //触底事件
  onReachBottom : function(){
    var topicGroup = this.data.topicGroup;
    topicGroup.page ++;
    this.setData({
      topicGroup : topicGroup
    })
    this.getTopicGroup(function resp(){})
  }
})