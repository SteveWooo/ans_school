const app = getApp();
const request = require("../../utils/request").request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper : {
      list : []
    },
    information : {
      page : 1,
      list : []
    },
    time : {
      examTime : 1577030400000,
      lessDay : 0,
    },
    loading : false
  },

  //拿轮播图
  getImageLoop : function(callback){
    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/information/get?set_top=1"
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
      var swiper = that.data.swiper;
      for(var i=0;i<res.data.rows.length;i++){
        res.data.rows[i].cover_url = app.globalData.config.baseResUrl + "/" + res.data.rows[i].cover_url;
      }
       swiper.list = res.data.rows;
      that.setData({
        swiper : swiper
      });
      callback(res);
    })
  },
  //拿资讯列表
  getInformation : function(callback){
    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/information/get?item_per_page=10&page=" + that.data.information.page
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
      var information = that.data.information;
      for(var i=0;i<res.data.rows.length;i++){
        res.data.rows[i].cover_url = app.globalData.config.baseResUrl + "/" + res.data.rows[i].cover_url;
        information.list.push(res.data.rows[i]);
      }
      that.setData({
        information : information
      });
      callback(res);
    })
  },

  changeDate : function(e){
    var now = +new Date();
    var time = this.data.time;
    var selectedTime = e.detail.value;
    selectedTime = selectedTime.replace(/-/g, '/');
    var exam_time = +new Date(selectedTime);
    
    time.examTime = exam_time;
    time.lessDay = Math.ceil((time.examTime - now) / 60 / 60 / 24 / 1000);
    this.setData({
      time : time
    })

    var that = this;
    that.setData({
      loading : true
    })
    request({
      url : app.globalData.config.baseUrl + "/api/w/user/set_personal_data",
      headers : {
        'Content-Type' : 'Application/json'
      },
      method : 'post',
      data : {
        exam_time : exam_time
      }
    }, function resp(res){
      that.setData({
        loading : false
      })
      wx.showToast({
        title : "修改成功..."
      })
    })
  },

  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getImageLoop(function resp(res){
      that.getInformation(function resp(res){

      })
    })
    var swiper = this.data.swiper;
    var information = this.data.information;
    var userData = app.globalData.userData;
    swiper.list = [];
    information.page = 1;
    information.list = [];
    this.setData({
      information : information,
      swiper : swiper
    })

    var now = +new Date();
    var time = this.data.time;
    if(!userData.exam_time){
      time.examTime = 1577030400000;
    } else {
      time.examTime = userData.exam_time;
    }
    time.lessDay = Math.ceil((time.examTime - now) / 60 / 60 / 24 / 1000);
    this.setData({
      time : time
    })
  },
  onPullDownRefresh : function(){
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  //跳转到详情页面
  toInformation : function(e){
    var information_id = e.currentTarget.dataset.information_id;
    wx.navigateTo({
      url : "../informationDetail/informationDetailPage?information_id=" + information_id
    })
  },
  //翻页
  getMoreInformation : function(){
    var information = this.data.information;
    information.page ++;
    this.setData({
      information : information
    })

    this.getInformation(function resp(){

    })
  },

  //触底事件
  onReachBottom : function(){
    this.getMoreInformation();
  }
})