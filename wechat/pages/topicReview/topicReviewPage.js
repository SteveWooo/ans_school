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
        result.answers[i] = options.answers[i];
      }

      that.setData({
        result : result
      })
    })
  },

  toLastTopic : function(){
    var topic = this.data.topic;
    //第一题了
    if(topic.current == 0){
      return ;
    }
    topic.current --;
    topic.item = {};
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
    topic.item = {};
    this.setData({
      topic : topic
    })

    this.getTopics(function resp(){})

  }
})