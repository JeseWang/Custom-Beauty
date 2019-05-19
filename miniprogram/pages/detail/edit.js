// miniprogram/pages/detail/edit.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {},
    info: {}
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.id){
      this.setData({
        id: options.id
      })
      this.loadDetail(options.id)
    }
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

  },

  loadDetail: function (id) {
    db.collection('product').doc(id).get().then(res => {
      let data = res.data
      this.setData({
        info: res.data,
        isAdmin: res.data._openid == app.globalData.openid
      })
      console.log(res)
    })
  },
  chooseImage: function(e) {
    var that = this;
    let info = this.data.info
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let path = res.tempFilePaths[0];
        let pathSplit = path.split("/");
        let name = pathSplit[pathSplit.length - 1];
        wx.cloud.uploadFile({
          cloudPath: name,
          filePath: path,
          success: data => {
            console.log(data)
            info.files = info.files.concat(data.fileID)
            that.setData({
              info: info
            });
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.info.files // 需要预览的图片http链接列表
    })
  },

  deleteImg: function(e) {
    var index = e.currentTarget.id
    let info = this.data.info
    info.files.splice(index, 1)
    this.setData({
      info: info
    })
  },

  //input绑定
  bindTitleChange: function(e){
    let info = this.data.info
    info.title = e.detail.value
    this.setData({
      info: info
    })
  },
  bindDescChange: function (e) {
    let info = this.data.info
    info.desc = e.detail.value
    this.setData({
      info: info
    })
  },
  bindFullPriceChange: function (e) {
    let info = this.data.info
    info.fullPrice = e.detail.value
    this.setData({
      info: info
    })
  },
  bindPrePriceChange: function (e) {
    let info = this.data.info
    info.prePrice = e.detail.value
    this.setData({
      info: info
    })
  },
  bindCouponPriceChange: function (e) {
    let info = this.data.info
    info.couponPrice = e.detail.value
    this.setData({
      info: info
    })
  },
  bindMaxOffChange: function (e) {
    let info = this.data.info
    info.maxOff = e.detail.value
    this.setData({
      info: info
    })
  },
  bindStartDateChange: function (e) {
    let info = this.data.info
    info.startDate = e.detail.value
    this.setData({
      info: info
    })
  },
  bindEndDateChange: function (e) {
    let info = this.data.info
    info.endDate = e.detail.value
    this.setData({
      info: info
    })
  },

  dbSuccess: function(){
    wx.showToast({
      title: '添加成功',
      success: function () {
        wx.reLaunch({
          url: '/pages/home/home',
        })
      }
    })
  },
  
  bindButton: function() {
    let info = this.data.info
    let params = {
      title: info.title,
      desc: info.desc,
      fullPrice: info.fullPrice,
      prePrice: info.prePrice,
      couponPrice: info.couponPrice,
      maxOff: info.maxOff,
      startDate: info.startDate,
      endDate: info.endDate,
      files: info.files
    }

    if (!params.title || !params.desc || !params.fullPrice ||
      !params.prePrice || !params.couponPrice || !params.maxOff ||
      !params.startDate || !params.endDate || params.files.length != 3) {
        wx.showToast({
          title: '信息不完整',
          icon: 'none'
        })
        return;
      }
      
    if (this.data.id) {
      db.collection('product').doc(this.data.id).update({ data: params }).then(this.dbSuccess)
    } else {
      db.collection('product').add({ data: params }).then(this.dbSuccess)
    }
  }
})