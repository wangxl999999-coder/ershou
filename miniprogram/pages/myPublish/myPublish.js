const api = require('../../utils/api.js')
const { showLoading, hideLoading, showToast, showModal } = require('../../utils/util.js')

Page({
  data: {
    products: [],
    currentTab: 1,
    loading: true,
    emptyText: '暂无已上架商品'
  },

  onLoad() {
    this.loadProducts()
  },

  onShow() {
    this.loadProducts()
  },

  onPullDownRefresh() {
    this.loadProducts().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  async loadProducts() {
    this.setData({ loading: true })
    showLoading()
    
    const res = await api.getMyPublish(this.data.currentTab)
    hideLoading()
    
    if (res.code === 0) {
      let emptyText = ''
      if (this.data.currentTab === 1) {
        emptyText = '暂无已上架商品'
      } else if (this.data.currentTab === 0) {
        emptyText = '暂无已下架商品'
      } else {
        emptyText = '暂无已卖出商品'
      }
      
      this.setData({
        products: res.data,
        loading: false,
        emptyText
      })
    }
  },

  switchTab(e) {
    const tab = parseInt(e.currentTarget.dataset.tab)
    this.setData({ currentTab: tab })
    this.loadProducts()
  },

  async polishProduct(e) {
    const id = e.currentTarget.dataset.id
    showLoading('擦亮中...')
    
    const res = await api.polishProduct(id)
    hideLoading()
    
    if (res.code === 0) {
      showToast('擦亮成功，曝光提升！', 'success')
      this.loadProducts()
    } else {
      showToast(res.message || '擦亮失败')
    }
  },

  async takeDownProduct(e) {
    const confirmed = await showModal('确认下架', '确定要下架该商品吗？下架后可在"已下架"列表中重新上架。')
    if (!confirmed) return
    
    const id = e.currentTarget.dataset.id
    showLoading('下架中...')
    
    const res = await api.takeDownProduct(id)
    hideLoading()
    
    if (res.code === 0) {
      showToast('下架成功', 'success')
      this.loadProducts()
    } else {
      showToast(res.message || '下架失败')
    }
  },

  async upProduct(e) {
    const id = e.currentTarget.dataset.id
    showToast('重新上架功能开发中')
  },

  async deleteProduct(e) {
    const confirmed = await showModal('确认删除', '确定要删除该商品吗？删除后无法恢复。')
    if (!confirmed) return
    
    showToast('删除功能开发中')
  },

  goPublish() {
    wx.switchTab({
      url: '/pages/publish/publish'
    })
  }
})
