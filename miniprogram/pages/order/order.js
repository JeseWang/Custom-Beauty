// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    orderClass: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '待确认'
      },
      {
        id: 2,
        name: '预约中'
      },
      {
        id: 3,
        name: '已完成'
      }
    ],
    orderClassIdx: 0
  },

  bindchangeOrderSwiper: function(e) {
    this.setData({
      orderClassIdx: e.detail.current
    })
  },

  bindchangehOrderClass: function(e){
    this.setData({
      orderClassIdx: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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