// pages/user/index.js
Page({
  data: {
    userInfo:{}
  },
  onLoad: function (options) {
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({userInfo})
  },
  onShow(){
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({userInfo})
  }
})