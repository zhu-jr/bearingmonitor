// pages/devicecondition/classify2/classify2.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    preprocessStatus: '未处理',
    pnu: '0%',
    classificationStatus: '未处理',
    cnu: '0%',
    startedProcessing: false
  },

  reqHelper(suburl, data) {
    return new Promise((resolv, reject) => {
      wx.request({
        url: 'https://phmlearn.com/component/upload/' + suburl,
        method: 'POST',
        data: {
          access_token: '0339e218740b4f09b2bfbbeb7e1f9d5e.ee9dd7a21ff4f7aaf7857edaf42a8b26',
          ...data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => resolv(res.data)
      })
    });
  },

  preprocess(file_name) {
    return this.reqHelper('2/444', { file_name });
  },

  classify(file_name) {
    return this.reqHelper('ML/model/156/355', { file_name });
  },

  async onSubmitTouched(e) {
    this.setData({
      startedProcessing: true
    })
    let filenames = ['M01_F10', 'M07_F04', 'M07_F10'];
    let outfiles = [];
    for (let i = 0; i < 12; i ++) {
      this.setData({
        preprocessStatus: `正在处理: ${i + 1} / 12`,
        pnu: Math.round((i+1)/12 * 100) + '%',
      });
      let res = await this.preprocess(`${i + 1}_${filenames[Math.floor(i / 4)]}_test.csv`);
      outfiles.push(res.data.file_name);
    }
    this.setData({
      preprocessStatus: '完成',
    });

    app.globalData.resultArray = [];

    let i = 0;
    for (let file of outfiles) {
      this.setData({
        classificationStatus: `正在处理: ${i + 1} / 12`,
        cnu:Math.round((i+1)/12 * 100) + '%',
      });
      i ++;
      let res = await this.classify(file);
      app.globalData.resultArray.push(res.data.predict);
    }

    this.setData({
      classificationStatus: `完成`,
    });

    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/devicecondition/result/result',
      });
    }, 2000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})