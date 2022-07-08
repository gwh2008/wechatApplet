//同时发送异步代码次数
var ajaxTimes = 0 ;
export const request = (pararms) => {
     ajaxTimes++;
     //https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata
     wx.showLoading({
       title: '加载中',
       mask:true,
     });
     const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
     return new Promise((resolve, reject) => {
         wx.request({
               ...pararms,
               url: baseUrl + pararms.url,
               success: (result) => {
                    resolve(result.data.message);
               },
               fail: (error) => {
                    reject(error);
               },
               complete:()=>{
                    ajaxTimes--;
                    if(ajaxTimes === 0){
                         wx.hideLoading()
                    }
               }
          });
     });
}

export const newRequest = (pararms) => {
     ajaxTimes++;
     //https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata
     wx.showLoading({
       title: '加载中',
       mask:true,
     });
     const baseUrl = "https://springboot-aohv-2054579-1312703774.ap-shanghai.run.tcloudbase.com/api/public"
     return new Promise((resolve, reject) => {
         wx.request({
               ...pararms,
               url: baseUrl + pararms.url,
               success: (result) => {
                    resolve(result.data);
               },
               fail: (error) => {
                    reject(error);
               },
               complete:()=>{
                    ajaxTimes--;
                    if(ajaxTimes === 0){
                         wx.hideLoading()
                    }
               }
          });
     });
}