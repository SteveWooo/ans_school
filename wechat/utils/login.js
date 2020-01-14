module.exports = function(app, callback){
  wx.login({
    success: res => {
      var that = app;
      wx.request({
        url: that.globalData.config.baseUrl + "/api/w/user/login?js_code=" + res.code,
        success: function (loginRes) {
          if (loginRes.data.status != "2000" || !loginRes.data.data.swc_session) {
            wx.showToast({
              title: '服务异常',
              icon: "none",
              duration: 1000
            });
            return ;
          }
          wx.setStorage({
            key: 'swc_session',
            data: loginRes.data.data.swc_session,
          })

          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: res => {
                    that.globalData.userInfo = res.userInfo
                    if (that.userInfoReadyCallback) {
                      that.userInfoReadyCallback(res)
                    }
                  }
                })
              }

              callback({
                loginRes : loginRes
              });
            }
          })

        }
      })
    }
  })
}