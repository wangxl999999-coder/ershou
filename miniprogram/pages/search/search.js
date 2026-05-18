const api = require('../../utils/api.js')

Page({
  data: {
    keyword: '',
    historyList: [],
    suggestList: [],
    products: [],
    hasSearched: false
  },

  onLoad() {
    this.loadHistory()
  },

  loadHistory() {
    const history = wx.getStorageSync('searchHistory') || []
    this.setData({ historyList: history })
  },

  saveHistory(keyword) {
    if (!keyword) return
    
    let history = wx.getStorageSync('searchHistory') || []
    history = history.filter(item => item !== keyword)
    history.unshift(keyword)
    history = history.slice(0, 10)
    wx.setStorageSync('searchHistory', history)
    this.setData({ historyList: history })
  },

  onInput(e) {
    const keyword = e.detail.value
    this.setData({ keyword })
    
    if (keyword) {
      this.getSuggestions(keyword)
    }
  },

  getSuggestions(keyword) {
    const suggestions = [
      keyword + ' 手机',
      keyword + ' 电脑',
      keyword + ' 衣服',
      keyword + ' 二手'
    ]
    this.setData({ suggestList: suggestions })
  },

  async onSearch() {
    const { keyword } = this.data
    if (!keyword.trim()) return
    
    this.saveHistory(keyword)
    this.setData({ hasSearched: true })
    
    const res = await api.getProducts({ keyword })
    if (res.code === 0) {
      this.setData({ products: res.data.list })
    }
  },

  searchHistory(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ keyword })
    this.onSearch()
  },

  searchSuggest(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ keyword })
    this.onSearch()
  },

  clearKeyword() {
    this.setData({
      keyword: '',
      hasSearched: false,
      products: []
    })
  },

  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('searchHistory')
          this.setData({ historyList: [] })
        }
      }
    })
  },

  goBack() {
    wx.navigateBack()
  }
})
