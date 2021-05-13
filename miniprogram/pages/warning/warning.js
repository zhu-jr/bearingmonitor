import * as utils from '../../util/util'
const app = getApp();

//定义l1函数，对数组中的值进行遍历，如果出现非0值，则输出bool值1；全为0值，则输出bool值0。
Array.prototype.l1 = function() {
  return this.some(i => i.l1);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    machine: 1,
    time: '',
    logs:[],
    logsSome: [],
    // res1: [],
    // res2: [],
    // res3: [],
    // res4: [],
    // label0: [],
    // label1: [],
    timerId: null,
    currentPosFloat: 0.,
    currentValues: [],
 
    // currentValues: [1,0,0,1,0,3,2,0,3,2,4,0],

    resultArrayRef: null,
  },

//定义一个时钟。利用map函数返回当前时刻轴承的运行状况。
  onShow() {
    console.log('onShow() called')
    this.setData({
      timerId: setInterval(() => {
        let cp = (this.data.currentPosFloat + 1) % 50;
        let logs = this.data.logs;
        let l1 = this.data.l1;
        this.setData({
          time: utils.formatTime(new Date()),
          currentPosFloat: cp,
          currentValues: this.data.resultArrayRef.map(lst => lst[cp]), //bt 
          // currentValues: [1,0,0,1,0,3,2,0,3,2,4,0],
          
          //app.globalData.resultArray.push(res.data.predict)
        });
//使用logs.unshift函数将需要的值赋给定义的数组中。
        // if (this.data.currentValues[0] != 0) {
          logs.unshift({
            logdate: utils.formatTime(new Date),
            l1: this.data.currentValues[0],
            l5: this.data.currentValues[4],
            l9:this.data.currentValues[8]
          })

        // }
        // logs.unshift({
        //   logdate: utils.formatTime(new Date)
        // })
//每一个轴承均有一个id。
        let logsSome = [];
        [1, 9].forEach(id => {
          logsSome[id] = logs.some(_ => _['l' + id]);          
        });

        this.setData({
          logs,
          logsSome
        })
        // console.log(logsSome)

      }, 1000),
      resultArrayRef: getApp().globalData.resultArray
    });
    //resultArrayRef: getApp().globalData.resultArray
  },
//bind函数，实现按钮功能，并将需要的数据进行编码后传给指定页面。
  GotoM1(e) {
    console.log(e.target.id)
    wx.navigateTo({
      url: '../warning/m1/m1?info=' + encodeURI(JSON.stringify(this.data.logs))
      //  + '&state=' + encodeURI(JSON.stringify(this.data.l1)),
     
      // url: '../warning/m1/m1',
    })
  },

  GotoM5(e) {
    console.log(e.target.id)
    wx.navigateTo({
      url: '../warning/m5/m5?info=' + encodeURI(JSON.stringify(this.data.logs))
      //  + '&state=' + encodeURI(JSON.stringify(this.data.l1)),
     
      // url: '../warning/m1/m1',
    })
  },

  GotoM9(e) {
    console.log(e.target.id)
    wx.navigateTo({
      url: '../warning/m9/m9?info=' + encodeURI(JSON.stringify(this.data.logs))
      //  + '&state=' + encodeURI(JSON.stringify(this.data.l1)),
     
      // url: '../warning/m1/m1',
    })
  },

  onHide() {
    clearInterval(this.data.timerId);
    this.setData({
      timerId: null
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload called")
  },
  onUnload() {
    clearInterval(this.data.timerId);
  },

})
