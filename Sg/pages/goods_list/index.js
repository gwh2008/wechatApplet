import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

    /**
     * 页面的初始数据
     */ 
    data: { 
        tabs: [
            {
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        //商品列表数据
        itemsList: []
    },
    queryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    totalPage: 0,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        this.queryParams.cid = options.cid;
        this.getItemList();
        /*   wx.showLoading({
              title: '加载中',
            })
            
            setTimeout(function () {
              wx.hideLoading()
            }, 5000) */
    },
    //发送请求获取商品列表数据
    async getItemList() {
        const result = await request({ url: "/goods/search", data: this.queryParams });
        var itemsList = this.data.itemsList;
        itemsList.length == 0 ? itemsList = result : itemsList.goods = itemsList.goods.concat(result.goods);
        this.setData({
            itemsList: itemsList
        });
        //关闭下拉刷新
        wx.stopPullDownRefresh();
    },
    onReachBottom() {
        console.log("触底了");
        // this.totalPage = 
        //获取当前分页的总页数
        var total = this.data.itemsList.total;
        this.totalPage = Math.ceil(total / this.queryParams.pagesize);
        //判断当前页数是否大于总页数，如果大于则显示页面已经到底，否则显示下一页
        if (this.queryParams.pagenum >= this.totalPage) {
            wx.showToast({
                title: '没有下一页数据了',
            });
        } else {
            this.queryParams.pagenum++;
            this.getItemList();
        }
    },
    //页面下拉时触发函数
    onPullDownRefresh() {
        this.setData({
            itemsList: []
        });
        this.queryParams.pagenum = 1;
        this.getItemList();
    },
    //修改导航
    handleChangeItem(e) {
        var index = e.detail;
        var tabs = this.data.tabs;
        tabs.forEach((v, i) => {
            return index == i ? v.isActive = true : v.isActive = false;
        });
        this.setData({
            tabs
        });
    }
})