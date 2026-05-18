const api = require('../../utils/api.js')

Page({
  data: {
    user: {}
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserInfo()
  },

  async loadUserInfo() {
    const res = await api.getCurrentUser()
    if (res.code === 0) {
      this.setData({ user: res.data })
    }
  },

  goProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    })
  },

  goMyOrder(e) {
    const type = e.currentTarget.dataset.type || 'buy'
    const status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: `/pages/myOrder/myOrder?type=${type}&status=${status || ''}`
    })
  },

  goMyPublish() {
    wx.navigateTo({
      url: '/pages/myPublish/myPublish'
    })
  },

  goAddress() {
    wx.navigateTo({
      url: '/pages/address/address'
    })
  }
})
