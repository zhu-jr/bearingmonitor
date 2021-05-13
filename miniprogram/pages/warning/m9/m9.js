// pages/warning/m9/m9.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state_cn: ['正常','内环1级损伤','内环2级损伤','外环1级损伤','外环2级损伤']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info: JSON.parse(decodeURI(options.info)),
      // state: JSON.parse(decodeURI(options.state)),
    })
    for (let i = 0; i < this.data.info.length; i ++) {
      this.setData({
        ['info[' + i + '].state_detail']: this.data.state_cn[this.data.info[i].l9]  
      })
    }
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