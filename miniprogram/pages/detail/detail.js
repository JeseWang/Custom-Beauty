// miniprogram/pages/detail/detail.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isAdmin: app.globalData.userInfo.openid,
    info: {},
    isAdmin: false
  },

  loadDetail: function(id) {
    db.collection('product').doc(id).get().then(res => {
      let data = res.data
      this.setData({
        info: res.data,
        isAdmin: res.data._openid == app.globalData.openid
      })
      console.log(this.data)
    })
  },

  editDetail: function(){
    let id = this.data.id
    wx.navigateTo({
      url: '/pages/detail/edit?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.loadDetail(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})