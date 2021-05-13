import * as utils from '../../../util/util'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    machine: 1,
    time: '',
    res1:[],
    res2:[],
    res3:[],
    res4:[],
    label0:[],
    label1:[],
    timerId: null,
    currentPosFloat: 0.,
    currentValues: [],
    resultArrayRef: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      timerId: setInterval(() => {
        let cp = (this.data.currentPosFloat + 1) % 50;
        this.setData({
          time: utils.formatTime(new Date()),
          currentPosFloat: cp,
          currentValues: this.data.resultArrayRef.map(lst => lst[cp])
        });
    }, 1000),
    resultArrayRef: getApp().globalData.resultArray
  });
  },
  onUnload() {
    clearInterval(this.data.timerId);
  },
})