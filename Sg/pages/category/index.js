
import { newRequest } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    letfMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
    //判读数据是否存储在小程序
    // const Cates = wx.getStorageSync("Cates");
    // // this.getCates()
    // if (!Cates) {
    //   this.getCates();
    // } else {
    //   //有旧的数据
    //   if (Date.now() - Cates.time > 1000 * 10) {
    //     this.getCates();
    //   } else {
    //     this.Cates = Cates.data;
    //     let letfMenuList = this.Cates.map((v) => v.cat_name);
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       letfMenuList,
    //       rightContent,
    //     });
    //   }
    // }
  },
  //获取分类
  async getCates() {
    const result = await newRequest({ url: '/typeName'})
    this.Cates = result.data;
    //左侧的大数据
    wx.setStorageSync("Cates", { time: Date.now(), data: this.Cates });
    let letfMenuList = this.Cates.map((v) => { return { id: v.id,  typeName: v.typeName } });
    const rightResult = await newRequest({ url: '/goodFirstImg', data: { typeId: letfMenuList[0].id } })
    let rightContent = rightResult.data;
    //右侧的大数据
    // let rightContent = this.Cates[0].children;
    this.setData({
      letfMenuList,
      rightContent,
    })
  },
  async handleItemTap(e) {
    console.log(e);
    const { index, id } = e.currentTarget.dataset;
    const rightResult = await newRequest({ url: '/goodFirstImg', data: { typeId: id } })
    let rightContent = rightResult.data;
     this.setData({
       currentIndex: index,
       rightContent,
       scrollTop: 0
    })

  },
});
