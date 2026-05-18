App({
  globalData: {
    userInfo: null,
    token: null,
    location: null
  },

  onLaunch() {
    this.loadUserInfo()
    this.getLocation()
  },

  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    const token = wx.getStorageSync('token')
    if (userInfo && token) {
      this.globalData.userInfo = userInfo
      this.globalData.token = token
    }
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
      },
      fail: () => {
        console.log('获取位置失败')
      }
    })
  },

  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            wx.request({
              url: 'https://api.example.com/login',
              method: 'POST',
              data: {
                code: res.code
              },
              success: (response) => {
                const { token, userInfo } = response.data
                wx.setStorageSync('token', token)
                wx.setStorageSync('userInfo', userInfo)
                this.globalData.token = token
                this.globalData.userInfo = userInfo
                resolve(userInfo)
              },
              fail: reject
            })
          }
        },
        fail: reject
      })
    })
  }
})
