//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-807938',
        traceUser: true,
      })
      this.login()
    }

  },

  login: function() {
    //调用云函数获取用户openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.openid = res.result.openid
        this.postUserInfo()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })

  },

  //查询用户信息
  getUserInfo: function(fn) {
    let db = wx.cloud.database()
    db.collection("users").where({
      _openid: this.globalData.openid
    }).get().then(res => {
      console.log("用户数量为：" + res.data.length)
      fn && fn(res.data)
    }).catch(err => {
      console.log(err)
    })
  },

  //添加用户
  addUserInfo: function() {
    let db = wx.cloud.database()
    let user = this.globalData.userInfo
    let data = {
      createtime: new Date(),
      isadmin: false,
      name: user.nickName,
    }

    db.collection("users").add({
      data: data
    }).then(res => {
      console.log(res.data)
      console.log("添加用户成功")
    }).catch(err => {
      console.log(err)
    })
  },

  //更新用户
  // updateUserInfo: function(id){
  //   let db = wx.cloud.database()
  //   let user = this.globalData.userInfo
  //   db.collection("user").doc(id).update({
  //     data:{
  //       name: user.nickName,
  //     }
  //   }).then(res => {
  //     console.log(res)
  //   })
  // },

  //提交用户信息
  postUserInfo: function() {
    let db = wx.cloud.database()
    let that = this
    let user;
    this.getUserInfo(function(data) {
      if (!data.length) {
        that.addUserInfo()
      }
    })
  },

  //封装request函数
  request: function(url, cb, data, method, errFunc) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: url || '',
      data: data || '',
      header: {
        SessionId: wx.getStorageSync('sessionId')
      },
      method: method || 'GET',
      success: (data) => {
        console.log(data)
        if (data.statusCode == '500') {
          wx.hideLoading()
          setTimeout(function() {
            wx.showToast({
              title: data.data.Msg || '500网络异常',
              icon: 'success'
            })
          }, 300)
        }
        typeof cb == "function" && cb(data)
      },
      fail: (err) => {
        console.log(err)
        if (err) {
          wx.hideLoading()
          wx.showToast({
            title: err.Msg || 'fail网络异常',
            icon: 'success'
          })
          return;
        }
      },
      complete: function(res) {

      },
    })
  },

  globalData: {
    userInfo: null,
    openid: null
  }
})