// pages/cart/index.js
// import {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js";
// import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data:{
     address:{},
     cart:[],
     allChecked:false,
     totalPrice:0,
     totalNum:0
  },
  onLoad(){
    //获取收货地址信息
    const address = wx.getStorageSync("address");
    //获取购物车加载的数据
    const cart = wx.getStorageSync("cart")||[];
    console.log(cart)
    //计算全选 every数组方法会遍历接受一个回调函数 每一个函数都返回true  这个结果就是true
    // const allChecked =cart.length?cart.every(v=>v.checked):false;
    this.setData({
      address
    })
    this.setCart(cart)
  },
  onShow(){
    // 1 获取缓存地址
     const address = wx.getStorageSync("address");
     //获取购物车加载的数据
     const cart = wx.getStorageSync("cart")
     //给data赋值
     this.setData({
       address,
       cart
     })
     this.setData({
      address
    })
    this.setCart(cart)
  },

  //点击 收货地址的点击事件
  handleChooseAddress() {
    //1先获取 权限状态
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result1) => {
              wx.setStorageSync('address', result1)
             
            },
          });
        } else {
          // 用户拒绝过授权页面
          wx.openSetting({
            success: (result2) => {
              //直接调用收货收取代码
              wx.chooseAddress({
                success: (result3) => {
                  console.log(result3);
                },
              });
            },
          });
        }
      },
    });
    // //权限
    // const res1 = await getSetting();
    // const scopeAddress = res1.authSetting["scope.address"];
    // //判断权限状态
    // if (scopeAddress === true || scopeAddress === undefined) {
    //       const res2 = await chooseAddress();
    //       console.log(res2);
    // }else{
    //     const res2 =  await openSetting();
    //      const res2 = await chooseAddress()
    //      console.log(res2)
    // }

  },
  //商品的选中
  handeItemChange(e){
     const goods_id = e.currentTarget.dataset.id;
     //获取购物车数组
     let {cart} = this.data;
     //获取被修改的对象
     let index= cart.findIndex(v=>v.goods_id === goods_id);
     cart[index].checked = !cart[index].checked;
     this.setCart(cart);
    },
    //设置购物车状态 重新计算 全选
    setCart(cart){
       let allChecked = true;
       let totalPrice = 0 ;
       let totalNum = 0 ;
       cart.forEach(v=>{
         if(v.checked){
           totalPrice += v.num*v.price;
           totalNum+=v.num;
         }else{
           allChecked = false;
         }
       })
       allChecked = cart.length!=0?allChecked:false;
       this.setData({
        cart,
        totalPrice,
        totalNum,
        allChecked
       });
       wx.setStorageSync('cart', cart)
    } ,
    //商品的全选功能
    handleItemAllCheck(){
         let {cart,allChecked} = this.data;
         allChecked =!allChecked;
         cart.forEach(v=>
           v.checked=allChecked
         )
         this.setCart(cart)
    },
    //商品数量编辑功能
    handleItemNumEdit(e){
      
         const {operation,id} = e.currentTarget.dataset;
         let {cart} = this.data;
         const index = cart.findIndex(v =>v.goods_id === id);
           
         //判断是否执行删除
         if(cart[index].num ===1 &&operation ===-1){
           //进行弹窗提示
           wx.showModal({
             title:'提示',
             content:"您是否要删除",
             success:(res)=>{
                 if(res.confirm){
                   cart.splice(index,1);
                   this.setCart(cart)
                 }else if(res.cancel){
                   console.log("点击取消")
                 }
             }
           })
         }else{
          cart[index].num+=operation;
          this.setCart(cart)
         }
         
    },
    //点击结算
    handlePay(){
      const {address,totalNum} = this.data;
      if(!address.userName){
        wx.showToast({
          title: '您还没有选择收货地址',
        })
        return
      }
      if(totalNum ===0){
        wx.showToast({
          title: '没有选择商品',
        })
        return
      }
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    }
});
