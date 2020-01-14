const app = getApp();
const request = require("../../utils/request").request;
Page({
  data: {
    topic_group_id : "",
    topic : {
      count : 0,
      item : {},
      current : 0,
    },
    result : {
      answers : []
    },
    interval : undefined,
    loading : false
  },

  //拉题目，一次拉一题
  getTopics : function(callback){
    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/topic/get?item_per_page=1&page=" + (this.data.topic.current + 1) + 
        "&topic_group_id=" + this.data.topic_group_id
    }, function resp(res){
      that.setData({
        loading : false
      })
      var topic = that.data.topic;
      for(var i=0;i<res.data.rows.length;i++){
        res.data.rows[i].content = JSON.parse(res.data.rows[i].content);
      }

      topic.item = res.data.rows[0];
      topic.count = res.data.count;
      that.setData({
        topic : topic
      })

      callback(res);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var result = this.data.result;
    var that = this;
    this.setData({
      topic_group_id : options.topic_group_id
    })

    this.getTopics(function resp(res){
      for(var i=0;i<res.data.count;i++){
        result.answers[i] = 0;
      }

      that.setData({
        result : result
      })
    })
  },

  //选择事件
  onChoose : function(e){
    var topic = this.data.topic;
    var result = this.data.result;

    var targetOption = e.currentTarget.dataset.option;

    result.answers[topic.current] = targetOption;
    this.setData({
      result : result
    })
  },

  toLastTopic : function(){
    var topic = this.data.topic;
    //第一题了
    if(topic.current == 0){
      return ;
    }
    topic.current --;
    this.setData({
      topic : topic
    })

    this.getTopics(function resp(){})
  },

  //前往下一题
  toNextTopic : function(){
    var topic = this.data.topic;
    //最后一题了
    if(topic.current == topic.count-1){
      return ;
    }
    topic.current ++;
    this.setData({
      topic : topic
    })

    this.getTopics(function resp(){})

  },

  //交卷
  onSubmit : function(){
    var result = this.data.result;
    var topic_group_id = this.data.topic_group_id;

    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/record/add",
      headers : {
        'Content-Type' : 'Application/json'
      },
      method : 'post',
      data : {
        topic_group_id : topic_group_id,
        answers : result.answers.join("")
      }
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
  }
})