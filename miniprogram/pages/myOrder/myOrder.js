const api = require('../../utils/api.js')
const { showLoading, hideLoading, showToast, showModal } = require('../../utils/util.js')

Page({
  data: {
    orders: [],
    currentType: 'buy',
    status: '',
    loading: true
  },

  onLoad(options) {
    const type = options.type || 'buy'
    const status = options.status || ''
    this.setData({ 
      currentType: type,
      status
    })
    this.loadOrders()
  },

  onShow() {
    this.loadOrders()
  },

  async loadOrders() {
    this.setData({ loading: true })
    showLoading()
    
    const res = await api.getOrders(this.data.currentType)
    hideLoading()
    
    if (res.code === 0) {
      let orders = res.data
      if (this.data.status) {
        orders = orders.filter(o => o.status === parseInt(this.data.status))
      }
      this.setData({ 
        orders,
        loading: false 
      })
    }
  },

  switchType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({ 
      currentType: type,
      status: ''
    })
    this.loadOrders()
  },

  goOrderDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?id=${id}`
    })
  },

  async confirmReceive(e) {
    const confirmed = await showModal('确认收货', '确定已收到商品吗？确认收货后款项将转入卖家账户。')
    if (!confirmed) return
    
    const id = e.currentTarget.dataset.id
    showLoading('确认中...')
    
    const res = await api.confirmReceive(id)
    hideLoading()
    
    if (res.code === 0) {
      showToast('确认成功', 'success')
      this.loadOrders()
    } else {
      showToast(res.message || '确认失败')
    }
  },

  goShip(e) {
    const id = e.currentTarget.dataset.id
    showToast('发货功能开发中')
  },

  goChat(e) {
    const order = this.data.orders.find(o => o.id === e.currentTarget.dataset.id)
    if (!order) return
    
    let userId
    if (this.data.currentType === 'buy') {
      userId = order.sellerId
    } else {
      userId = order.buyerId
    }
    
    wx.navigateTo({
      url: `/pages/chat/chat?userId=${userId}`
    })
  }
})
