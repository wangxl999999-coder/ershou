const api = require('../../utils/api.js')
const { showToast } = require('../../utils/util.js')

Page({
  data: {
    user: {}
  },

  onLoad() {
    this.loadUserInfo()
  },

  async loadUserInfo() {
    const res = await api.getCurrentUser()
    if (res.code === 0) {
      this.setData({ user: res.data })
    }
  },

  editNickname() {
    wx.showModal({
      title: '修改昵称',
      editable: true,
      placeholderText: '请输入新昵称',
      success: async (res) => {
        if (res.confirm && res.content) {
          this.setData({ 'user.nickname': res.content })
          await api.updateUserInfo({ nickname: res.content })
          showToast('修改成功', 'success')
        }
      }
    })
  },

  editPhone() {
    wx.showModal({
      title: '修改手机号',
      editable: true,
      placeholderText: '请输入新手机号',
      success: async (res) => {
        if (res.confirm && res.content) {
          if (!/^1\d{10}$/.test(res.content)) {
            showToast('请输入正确的手机号')
            return
          }
          this.setData({ 'user.phone': res.content })
          await api.updateUserInfo({ phone: res.content })
          showToast('修改成功', 'success')
        }
      }
    })
  }
})
