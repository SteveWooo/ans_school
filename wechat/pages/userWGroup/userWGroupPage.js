
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechatGroup : {
      nickName : 'Dinel',
      wechatNumber : 'wechat'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onCopy : function(){
    wx.setClipboardData({
      data : this.data.wechatGroup.wechatNumber,
      success : function(){
        wx.showToast({
          title : '复制成功'
        })
      }
    })
  }
})