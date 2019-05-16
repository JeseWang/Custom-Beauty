// miniprogram/pages/detail/edit.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    startDate: '',
    endDate: '',
    files: [],
    title: '',
    desc: '',
    fullPrice: 0,
    prePrice: 0,
    couponPrice: 0,
    maxOff: 0,
    params: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  

  chooseImage: function(e) {
    var that = this;
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
            that.setData({
              files: that.data.files.concat(data.fileID)
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
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  deleteImg: function(e) {
    var index = e.currentTarget.id
    var that = this
    var files = this.data.files
    files.splice(index, 1)
    this.setData({
      files: files
    })
  },

  //input绑定
  bindTitleChange: function(e){
    this.setData({
      title: e.detail.value
    })
  },
  bindDescChange: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  bindFullPriceChange: function (e) {
    this.setData({
      fullPrice: e.detail.value
    })
  },
  bindPrePriceChange: function (e) {
    this.setData({
      prePrice: e.detail.value
    })
  },
  bindCouponPriceChange: function (e) {
    this.setData({
      couponPrice: e.detail.value
    })
  },
  bindMaxOffChange: function (e) {
    this.setData({
      maxOff: e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  
  bindButton: function() {
    let params = {
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      files: this.data.files,
      title: this.data.title,
      desc: this.data.desc,
      fullPrice: this.data.fullPrice,
      prePrice: this.data.prePrice,
      couponPrice: this.data.couponPrice,
      maxOff: this.data.maxOff,
      count: this.data.count
    }

    if (params.title && params.desc && params.fullPrice &&
      params.prePrice && params.couponPrice && params.maxOff &&
      params.startDate && params.endDate && params.files.length == 3
    ) {
      db.collection('product').add({
        data: params,
        success: res => {
          wx.showToast({
            title: '添加成功',
            success: function() {
              wx.swtichTab({
                url: '/pages/home/home',
              })
            }
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '添加失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }else{
      wx.showToast({
        title: '信息不完整',
        icon: 'none'
      })
    }
  }
})