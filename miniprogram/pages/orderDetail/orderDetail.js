const api = require('../../utils/api.js')
const { showLoading, hideLoading, showToast, showModal } = require('../../utils/util.js')

Page({
  data: {
    order: null
  },

  onLoad(options) {
    this.loadOrderDetail(options.id)
  },

  async loadOrderDetail(id) {
    showLoading()
    const res = await api.getOrderDetail(id)
    hideLoading()
    
    if (res.code === 0) {
      this.setData({ order: res.data })
    } else {
      showToast('订单不存在')
      wx.navigateBack()
    }
  },

  goProductDetail() {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${this.data.order.product.id}`
    })
  },

  goChat() {
    const order = this.data.order
    let userId = order.buyerId === 1 ? order.sellerId : order.buyerId
    wx.navigateTo({
      url: `/pages/chat/chat?userId=${userId}`
    })
  },

  async confirmReceive() {
    const confirmed = await showModal('确认收货', '确定已收到商品吗？确认收货后款项将转入卖家账户。')
    if (!confirmed) return
    
    showLoading('确认中...')
    const res = await api.confirmReceive(this.data.order.id)
    hideLoading()
    
    if (res.code === 0) {
      showToast('确认成功', 'success')
      this.loadOrderDetail(this.data.order.id)
    } else {
      showToast(res.message || '确认失败')
    }
  },

  goShip() {
    showToast('发货功能开发中')
  }
})
