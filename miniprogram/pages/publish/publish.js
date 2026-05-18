const api = require('../../utils/api.js')
const { showLoading, hideLoading, showToast, chooseImage } = require('../../utils/util.js')

Page({
  data: {
    images: [],
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    categories: [],
    categoryNames: [],
    categoryIndex: null,
    locations: ['北京市朝阳区', '北京市海淀区', '上海市浦东新区', '上海市黄浦区', '广州市天河区', '广州市海珠区', '深圳市南山区', '深圳市福田区'],
    locationIndex: null,
    submitting: false
  },

  onLoad() {
    this.loadCategories()
  },

  async loadCategories() {
    const res = await api.getCategories()
    if (res.code === 0) {
      const categoryNames = res.data.map(item => item.name)
      this.setData({
        categories: res.data,
        categoryNames
      })
    }
  },

  async chooseImage() {
    try {
      const tempFilePaths = await chooseImage(9 - this.data.images.length)
      this.setData({
        images: [...this.data.images, ...tempFilePaths]
      })
    } catch (e) {
      console.log('选择图片取消')
    }
  },

  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = [...this.data.images]
    images.splice(index, 1)
    this.setData({ images })
  },

  onTitleInput(e) {
    this.setData({ title: e.detail.value })
  },

  onDescriptionInput(e) {
    this.setData({ description: e.detail.value })
  },

  onPriceInput(e) {
    this.setData({ price: e.detail.value })
  },

  onOriginalPriceInput(e) {
    this.setData({ originalPrice: e.detail.value })
  },

  onCategoryChange(e) {
    this.setData({ categoryIndex: parseInt(e.detail.value) })
  },

  onLocationChange(e) {
    this.setData({ locationIndex: parseInt(e.detail.value) })
  },

  validate() {
    if (this.data.images.length === 0) {
      showToast('请上传商品图片')
      return false
    }
    if (!this.data.title.trim()) {
      showToast('请输入商品标题')
      return false
    }
    if (this.data.categoryIndex === null) {
      showToast('请选择商品分类')
      return false
    }
    if (!this.data.price || parseFloat(this.data.price) <= 0) {
      showToast('请输入正确的商品价格')
      return false
    }
    return true
  },

  async submit() {
    if (!this.validate()) return
    
    this.setData({ submitting: true })
    showLoading('发布中...')
    
    try {
      const uploadTasks = this.data.images.map(img => api.uploadImage(img))
      const uploadResults = await Promise.all(uploadTasks)
      const imageUrls = uploadResults.map(res => res.data)
      
      const productData = {
        images: imageUrls,
        title: this.data.title,
        description: this.data.description,
        price: parseFloat(this.data.price),
        originalPrice: this.data.originalPrice ? parseFloat(this.data.originalPrice) : null,
        categoryId: this.data.categories[this.data.categoryIndex].id,
        categoryName: this.data.categoryNames[this.data.categoryIndex],
        location: this.data.locationIndex !== null ? this.data.locations[this.data.locationIndex] : '未知位置'
      }
      
      const res = await api.publishProduct(productData)
      hideLoading()
      
      if (res.code === 0) {
        showToast('发布成功', 'success')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }, 1500)
      } else {
        showToast(res.message || '发布失败')
        this.setData({ submitting: false })
      }
    } catch (e) {
      hideLoading()
      showToast('发布失败，请重试')
      this.setData({ submitting: false })
    }
  }
})
