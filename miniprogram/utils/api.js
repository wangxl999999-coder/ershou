const mockData = require('./mockData.js')

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

const api = {
  async getCategories() {
    await delay()
    return { code: 0, data: mockData.categories }
  },

  async getProducts(params = {}) {
    await delay()
    let list = [...mockData.products].filter(p => p.status === 1)
    
    if (params.categoryId) {
      list = list.filter(p => p.categoryId === params.categoryId)
    }
    
    if (params.keyword) {
      list = list.filter(p => 
        p.title.includes(params.keyword) || 
        p.description.includes(params.keyword)
      )
    }
    
    if (params.minPrice !== undefined) {
      list = list.filter(p => p.price >= params.minPrice)
    }
    
    if (params.maxPrice !== undefined) {
      list = list.filter(p => p.price <= params.maxPrice)
    }
    
    if (params.sortBy === 'price') {
      list.sort((a, b) => params.sortOrder === 'desc' ? b.price - a.price : a.price - b.price)
    } else if (params.sortBy === 'distance') {
      list.sort((a, b) => a.distance - b.distance)
    } else {
      list.sort((a, b) => new Date(b.polishTime) - new Date(a.polishTime))
    }
    
    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize
    
    return {
      code: 0,
      data: {
        list: list.slice(start, end),
        total: list.length,
        hasMore: end < list.length
      }
    }
  },

  async getProductDetail(id) {
    await delay()
    const product = mockData.products.find(p => p.id === id)
    if (product) {
      return { code: 0, data: product }
    }
    return { code: -1, message: '商品不存在' }
  },

  async publishProduct(data) {
    await delay(1000)
    const newProduct = {
      id: Date.now(),
      ...data,
      status: 1,
      viewCount: 0,
      polishTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      createTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      userId: mockData.currentUser.id,
      userName: mockData.currentUser.nickname,
      userAvatar: mockData.currentUser.avatar,
      location: '当前位置',
      distance: 0
    }
    mockData.products.unshift(newProduct)
    return { code: 0, data: newProduct }
  },

  async polishProduct(id) {
    await delay()
    const product = mockData.products.find(p => p.id === id)
    if (product) {
      product.polishTime = new Date().toISOString().slice(0, 16).replace('T', ' ')
      product.viewCount += 10
      return { code: 0, message: '擦亮成功' }
    }
    return { code: -1, message: '商品不存在' }
  },

  async takeDownProduct(id) {
    await delay()
    const product = mockData.products.find(p => p.id === id)
    if (product) {
      product.status = 0
      return { code: 0, message: '下架成功' }
    }
    return { code: -1, message: '商品不存在' }
  },

  async getMyPublish(status) {
    await delay()
    let list = mockData.products.filter(p => p.userId === mockData.currentUser.id)
    if (status !== undefined) {
      list = list.filter(p => p.status === status)
    }
    return { code: 0, data: list }
  },

  async getChatList() {
    await delay()
    return { code: 0, data: mockData.chatList }
  },

  async getMessages(chatId) {
    await delay()
    const list = mockData.messages.filter(m => m.chatId === chatId)
    return { code: 0, data: list }
  },

  async sendMessage(chatId, content) {
    await delay()
    const newMessage = {
      id: Date.now(),
      chatId,
      senderId: mockData.currentUser.id,
      content,
      type: 'text',
      createTime: new Date().toISOString().slice(11, 16)
    }
    mockData.messages.push(newMessage)
    return { code: 0, data: newMessage }
  },

  async createOrder(productId, addressId) {
    await delay(1000)
    const product = mockData.products.find(p => p.id === productId)
    const address = mockData.addresses.find(a => a.id === addressId)
    
    if (!product || !address) {
      return { code: -1, message: '参数错误' }
    }
    
    const order = {
      id: 'ORD' + Date.now(),
      productId,
      product,
      buyerId: mockData.currentUser.id,
      buyerName: mockData.currentUser.nickname,
      buyerAvatar: mockData.currentUser.avatar,
      sellerId: product.userId,
      sellerName: product.userName,
      sellerAvatar: product.userAvatar,
      price: product.price,
      status: 1,
      statusText: '待发货',
      createTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      payTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      address: {
        name: address.name,
        phone: address.phone,
        address: `${address.province}${address.city}${address.district}${address.address}`
      }
    }
    
    mockData.orders.unshift(order)
    product.status = 2
    
    return { code: 0, data: order }
  },

  async getOrders(type) {
    await delay()
    let list = mockData.orders
    
    if (type === 'buy') {
      list = list.filter(o => o.buyerId === mockData.currentUser.id)
    } else if (type === 'sell') {
      list = list.filter(o => o.sellerId === mockData.currentUser.id)
    }
    
    return { code: 0, data: list }
  },

  async getOrderDetail(id) {
    await delay()
    const order = mockData.orders.find(o => o.id === id)
    if (order) {
      return { code: 0, data: order }
    }
    return { code: -1, message: '订单不存在' }
  },

  async shipOrder(id, logistics) {
    await delay()
    const order = mockData.orders.find(o => o.id === id)
    if (order) {
      order.status = 2
      order.statusText = '待收货'
      order.shipTime = new Date().toISOString().slice(0, 16).replace('T', ' ')
      order.logistics = logistics
      return { code: 0, message: '发货成功' }
    }
    return { code: -1, message: '订单不存在' }
  },

  async confirmReceive(id) {
    await delay()
    const order = mockData.orders.find(o => o.id === id)
    if (order) {
      order.status = 3
      order.statusText = '已完成'
      order.confirmTime = new Date().toISOString().slice(0, 16).replace('T', ' ')
      return { code: 0, message: '确认收货成功' }
    }
    return { code: -1, message: '订单不存在' }
  },

  async getAddresses() {
    await delay()
    return { code: 0, data: mockData.addresses }
  },

  async saveAddress(data) {
    await delay()
    if (data.id) {
      const index = mockData.addresses.findIndex(a => a.id === data.id)
      if (index > -1) {
        if (data.isDefault) {
          mockData.addresses.forEach(a => a.isDefault = false)
        }
        mockData.addresses[index] = data
      }
    } else {
      if (data.isDefault) {
        mockData.addresses.forEach(a => a.isDefault = false)
      }
      data.id = Date.now()
      mockData.addresses.push(data)
    }
    return { code: 0, message: '保存成功' }
  },

  async deleteAddress(id) {
    await delay()
    const index = mockData.addresses.findIndex(a => a.id === id)
    if (index > -1) {
      mockData.addresses.splice(index, 1)
      return { code: 0, message: '删除成功' }
    }
    return { code: -1, message: '地址不存在' }
  },

  async getCurrentUser() {
    await delay()
    return { code: 0, data: mockData.currentUser }
  },

  async updateUserInfo(data) {
    await delay()
    Object.assign(mockData.currentUser, data)
    return { code: 0, message: '更新成功' }
  },

  async uploadImage(filePath) {
    await delay(1000)
    return { code: 0, data: filePath }
  }
}

module.exports = api
