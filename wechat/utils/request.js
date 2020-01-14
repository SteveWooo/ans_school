const common_login = require("./login");
const app = getApp();

function bussiness_fun(options, callback){
  var swc_session = wx.getStorageSync("swc_session");
  if(!options.data){
    options.data = {};
  }
  options.data.swc_session = swc_session;
  wx.request({
    url: options.url,
    headers: options.headers,
    data: options.data,
    method: options.method || "get",
    success: (res) => { //业务处理
      if(res.data.status != "2000"){
        wx.showToast({
          title: res.data.error_message,
          icon : "none"
        });
      }
      callback(res.data); //直接返回业务代码
    }
  })
}

var commonRequest = function(options, callback){
  //check session
  wx.checkSession({
    success : function(){
      bussiness_fun(options, callback);
    },
    fail : function(){
      console.log("login")
      common_login(app, function(){
        bussiness_fun(options, callback);
      })
    }
  })
}

/*
* 上传微信数据到服务端
*/
var setUserInfo = function(user_info, callback){
  commonRequest({
    url : app.globalData.config.baseUrl + "/api/w/user/set_wechat_data",
    headers : {
      "Content-Type" : "application/json"
    },
    method : "post",
    data : {
      avatar_url : user_info.avatarUrl,
      nick_name : user_info.nickName
    }
  }, function(res){
    callback();
  })
}

module.exports = {
  request : commonRequest,
  setUserInfo : setUserInfo,
}