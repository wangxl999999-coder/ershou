Component({
  properties: {
    product: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onTap() {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${this.properties.product.id}`
      })
    }
  }
})
