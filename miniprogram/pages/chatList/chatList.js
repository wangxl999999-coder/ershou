const api = require('../../utils/api.js')

Page({
  data: {
    chatList: []
  },

  onLoad() {
    this.loadChatList()
  },

  onShow() {
    this.loadChatList()
  },

  async loadChatList() {
    const res = await api.getChatList()
    if (res.code === 0) {
      this.setData({ chatList: res.data })
    }
  },

  goChat(e) {
    const user = e.currentTarget.dataset.user
    wx.navigateTo({
      url: `/pages/chat/chat?userId=${user.userId}&userName=${user.userName}`
    })
  }
})
