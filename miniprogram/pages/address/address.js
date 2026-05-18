const api = require('../../utils/api.js')
const { showToast, showModal } = require('../../utils/util.js')

Page({
  data: {
    addresses: []
  },

  onLoad() {
    this.loadAddresses()
  },

  onShow() {
    this.loadAddresses()
  },

  async loadAddresses() {
    const res = await api.getAddresses()
    if (res.code === 0) {
      this.setData({ addresses: res.data })
    }
  },

  selectAddress(e) {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      const prevPage = pages[pages.length - 2]
      if (prevPage.selectAddress) {
        const id = e.currentTarget.dataset.id
        const address = this.data.addresses.find(a => a.id === id)
        prevPage.selectAddress(address)
        wx.navigateBack()
      }
    }
  },

  async setDefault(e) {
    const id = e.currentTarget.dataset.id
    const address = this.data.addresses.find(a => a.id === id)
    if (address) {
      address.isDefault = true
      const res = await api.saveAddress(address)
      if (res.code === 0) {
        showToast('设置成功', 'success')
        this.loadAddresses()
      }
    }
  },

  editAddress(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/addressEdit/addressEdit?id=${id}`
    })
  },

  async deleteAddress(e) {
    const confirmed = await showModal('确认删除', '确定要删除该收货地址吗？')
    if (!confirmed) return
    
    const id = e.currentTarget.dataset.id
    const res = await api.deleteAddress(id)
    if (res.code === 0) {
      showToast('删除成功', 'success')
      this.loadAddresses()
    }
  },

  addAddress() {
    wx.navigateTo({
      url: '/pages/addressEdit/addressEdit'
    })
  }
})
