const api = require('../../utils/api.js')
const { showLoading, hideLoading, showToast, showModal } = require('../../utils/util.js')

Page({
  data: {
    product: null,
    addresses: [],
    selectedAddressId: null,
    showAddressModal: false
  },

  onLoad(options) {
    this.loadProduct(options.id)
    this.loadAddresses()
  },

  async loadProduct(id) {
    showLoading()
    const res = await api.getProductDetail(parseInt(id))
    hideLoading()
    
    if (res.code === 0) {
      this.setData({ product: res.data })
    } else {
      showToast('商品不存在')
      wx.navigateBack()
    }
  },

  async loadAddresses() {
    const res = await api.getAddresses()
    if (res.code === 0) {
      const addresses = res.data
      let selectedAddressId = null
      
      const defaultAddress = addresses.find(a => a.isDefault)
      if (defaultAddress) {
        selectedAddressId = defaultAddress.id
      } else if (addresses.length > 0) {
        selectedAddressId = addresses[0].id
      }
      
      this.setData({ addresses, selectedAddressId })
    }
  },

  goChat() {
    wx.navigateTo({
      url: `/pages/chat/chat?userId=${this.data.product.userId}&userName=${this.data.product.userName}`
    })
  },

  goBuy() {
    if (this.data.addresses.length === 0) {
      showToast('请先添加收货地址')
      setTimeout(() => {
        this.goAddAddress()
      }, 1500)
      return
    }
    this.setData({ showAddressModal: true })
  },

  hideAddressModal() {
    this.setData({ showAddressModal: false })
  },

  selectAddress(e) {
    const addressId = parseInt(e.currentTarget.dataset.id)
    this.setData({ selectedAddressId: addressId })
  },

  goAddAddress() {
    this.setData({ showAddressModal: false })
    wx.navigateTo({
      url: '/pages/addressEdit/addressEdit'
    })
  },

  async confirmOrder() {
    const confirmed = await showModal('确认下单', '是否确认购买该商品？款项将由平台托管，确认收货后将转入卖家账户。')
    if (!confirmed) return
    
    showLoading('下单中...')
    const res = await api.createOrder(this.data.product.id, this.data.selectedAddressId)
    hideLoading()
    
    if (res.code === 0) {
      showToast('下单成功', 'success')
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/orderDetail/orderDetail?id=${res.data.id}`
        })
      }, 1500)
    } else {
      showToast(res.message || '下单失败')
    }
  },

  onShow() {
    if (this.data.showAddressModal) {
      this.loadAddresses()
    }
  }
})
