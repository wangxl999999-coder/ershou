const api = require('../../utils/api.js')
const { showLoading, hideLoading } = require('../../utils/util.js')

Page({
  data: {
    categories: [],
    products: [],
    currentCategory: 0,
    sortBy: 'default',
    sortOrder: 'desc',
    minPrice: '',
    maxPrice: '',
    showPriceModal: false,
    loading: true,
    page: 1
  },

  onLoad() {
    this.loadCategories()
    this.loadProducts()
  },

  onPullDownRefresh() {
    this.setData({ page: 1 })
    this.loadProducts().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  onReachBottom() {
    this.loadMore()
  },

  async loadCategories() {
    const res = await api.getCategories()
    if (res.code === 0) {
      this.setData({ categories: res.data })
    }
  },

  async loadProducts() {
    this.setData({ loading: true })
    showLoading()
    
    const params = {
      page: this.data.page,
      sortBy: this.data.sortBy,
      sortOrder: this.data.sortOrder,
      categoryId: this.data.currentCategory || undefined,
      minPrice: this.data.minPrice ? parseFloat(this.data.minPrice) : undefined,
      maxPrice: this.data.maxPrice ? parseFloat(this.data.maxPrice) : undefined
    }
    
    const res = await api.getProducts(params)
    hideLoading()
    
    if (res.code === 0) {
      this.setData({
        products: res.data.list,
        loading: false
      })
    }
  },

  async loadMore() {
    const params = {
      page: this.data.page + 1,
      sortBy: this.data.sortBy,
      sortOrder: this.data.sortOrder,
      categoryId: this.data.currentCategory || undefined,
      minPrice: this.data.minPrice ? parseFloat(this.data.minPrice) : undefined,
      maxPrice: this.data.maxPrice ? parseFloat(this.data.maxPrice) : undefined
    }
    
    const res = await api.getProducts(params)
    
    if (res.code === 0 && res.data.hasMore) {
      this.setData({
        page: params.page,
        products: [...this.data.products, ...res.data.list]
      })
    }
  },

  selectCategory(e) {
    const categoryId = parseInt(e.currentTarget.dataset.id)
    this.setData({
      currentCategory: categoryId,
      page: 1
    })
    this.loadProducts()
  },

  sortByDefault() {
    this.setData({
      sortBy: 'default',
      sortOrder: 'desc',
      page: 1
    })
    this.loadProducts()
  },

  sortByPrice() {
    const newOrder = this.data.sortOrder === 'asc' ? 'desc' : 'asc'
    this.setData({
      sortBy: 'price',
      sortOrder: newOrder,
      page: 1
    })
    this.loadProducts()
  },

  sortByDistance() {
    this.setData({
      sortBy: 'distance',
      sortOrder: 'asc',
      page: 1
    })
    this.loadProducts()
  },

  showPriceFilter() {
    this.setData({ showPriceModal: true })
  },

  hidePriceFilter() {
    this.setData({ showPriceModal: false })
  },

  onMinPriceInput(e) {
    this.setData({ minPrice: e.detail.value })
  },

  onMaxPriceInput(e) {
    this.setData({ maxPrice: e.detail.value })
  },

  resetPriceFilter() {
    this.setData({
      minPrice: '',
      maxPrice: '',
      showPriceModal: false,
      page: 1
    })
    this.loadProducts()
  },

  confirmPriceFilter() {
    this.setData({
      showPriceModal: false,
      page: 1
    })
    this.loadProducts()
  },

  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  }
})
