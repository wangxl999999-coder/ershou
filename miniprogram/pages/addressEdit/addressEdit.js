const api = require('../../utils/api.js')
const { showToast, showLoading, hideLoading } = require('../../utils/util.js')

Page({
  data: {
    id: null,
    formData: {
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      address: '',
      isDefault: false
    },
    regions: [
      ['北京市', '上海市', '广州市', '深圳市', '杭州市'],
      ['朝阳区', '海淀区', '东城区', '西城区'],
      ['某某街道']
    ],
    regionIndex: [0, 0, 0]
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: parseInt(options.id) })
      this.loadAddress()
    }
  },

  async loadAddress() {
    const res = await api.getAddresses()
    if (res.code === 0) {
      const address = res.data.find(a => a.id === this.data.id)
      if (address) {
        this.setData({ formData: address })
        wx.setNavigationBarTitle({
          title: '编辑地址'
        })
      }
    }
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`formData.${field}`]: value
    })
  },

  onRegionChange(e) {
    const index = e.detail.value
    const provinces = ['北京市', '上海市', '广州市', '深圳市', '杭州市']
    const cities = ['朝阳区', '海淀区', '黄浦区', '天河区', '南山区', '西湖区']
    const districts = ['某某街道', '某某路']
    
    this.setData({
      regionIndex: index,
      'formData.province': provinces[index[0] % provinces.length],
      'formData.city': cities[index[1] % cities.length],
      'formData.district': districts[index[2] % districts.length]
    })
  },

  onDefaultChange(e) {
    this.setData({
      'formData.isDefault': e.detail.value
    })
  },

  validate() {
    if (!this.data.formData.name.trim()) {
      showToast('请输入收货人姓名')
      return false
    }
    if (!this.data.formData.phone.trim()) {
      showToast('请输入手机号')
      return false
    }
    if (!/^1\d{10}$/.test(this.data.formData.phone)) {
      showToast('请输入正确的手机号')
      return false
    }
    if (!this.data.formData.province) {
      showToast('请选择所在地区')
      return false
    }
    if (!this.data.formData.address.trim()) {
      showToast('请输入详细地址')
      return false
    }
    return true
  },

  async submit() {
    if (!this.validate()) return
    
    showLoading('保存中...')
    const res = await api.saveAddress(this.data.formData)
    hideLoading()
    
    if (res.code === 0) {
      showToast('保存成功', 'success')
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    } else {
      showToast(res.message || '保存失败')
    }
  }
})
