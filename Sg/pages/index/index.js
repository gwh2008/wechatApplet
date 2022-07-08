//Page Object
import {
  request,
  newRequest
} from "../../request/index"
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    //轮播图数据
    this.getSwiperList();
    this.getFloorList()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  },
  async getSwiperList () {
    newRequest({
      url: "/roleList"
    })
      .then(result => {
        this.setData({
          swiperList: result.data
        })
      })
  },
  getFloorList () {
    newRequest({ url: '/recommend'}).then(result=> {
      this.setData({
        floorList: result.data
      })
    })
  }
});