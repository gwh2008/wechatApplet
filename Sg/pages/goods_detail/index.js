// pages/goos_detail/index.js
import { request, newRequest } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: { 
    goodsObj:{}
  },
  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */  
  onLoad: function (options) {
    const { id } = options;
    this.getGoodsDetail(id);
  },
  async getGoodsDetail(id) {
    const goodsResult = await newRequest({ url: '/goodDetail', data: { id: id}});
    // const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsInfo = goodsResult.data
    // 后续可以做商品封面轮播图
    const firstImgArr = []
    firstImgArr.push({ firstImg: this.GoodsInfo.firstImg})
    this.GoodsInfo.pics = firstImgArr
    this.setData({
      goodsObj:{
        goods_name: this.GoodsInfo.goodName,
        goods_price: this.GoodsInfo.price,
        describe: this.GoodsInfo.describe,
        pics: firstImgArr,
        goodsImg: JSON.parse(this.GoodsInfo.goodsImg)
        //iphone 手机不识别个别 图片格式
        // goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        // pics:goodsObj.pics
      }
    })
    console.log(this.data)
  },
  //轮播图预览功能
  handlePrevewImage(e){
    const urls = this.GoodsInfo.pics.map(v =>v.firstImg )
    const current = e.currentTarget.dataset.url;
         wx.previewImage({
           //接受传递过来的url
           current,
           urls,
         })
  },   
  //购物车点击添加事件 
  handleCartAdd(e){
    //1 获取缓存中购物车数组
    let cart = wx.getStorageSync("cart")||[];
    //2 判断商品对象是否存在购物车数组中
    let index = cart.findIndex(v => v.id === this.GoodsInfo.id)
    if (index === -1){
      // 不存在     
      this.GoodsInfo.num = 1 ; 
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo); 
    }else{ 
      cart[index].num++;
    }
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title:'加入成功',
      icon:'success',
      mask:true,
    });
  }
});
