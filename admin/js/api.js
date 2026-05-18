// Mock数据
const mockData = {
  users: [
    { id: 1, nickname: '数码达人', avatar: 'https://picsum.photos/100/100?random=101', phone: '138****8888', balance: 12500.00, publishCount: 15, soldCount: 8, buyCount: 5, status: 1, createTime: '2024-01-01 10:00:00' },
    { id: 2, nickname: '运动小子', avatar: 'https://picsum.photos/100/100?random=102', phone: '139****9999', balance: 5680.00, publishCount: 8, soldCount: 5, buyCount: 10, status: 1, createTime: '2024-01-02 14:30:00' },
    { id: 3, nickname: '居家生活', avatar: 'https://picsum.photos/100/100?random=103', phone: '137****7777', balance: 3200.50, publishCount: 6, soldCount: 3, buyCount: 4, status: 1, createTime: '2024-01-05 09:20:00' },
    { id: 4, nickname: '程序员小王', avatar: 'https://picsum.photos/100/100?random=104', phone: '136****6666', balance: 28000.00, publishCount: 12, soldCount: 10, buyCount: 8, status: 1, createTime: '2024-01-08 16:45:00' },
    { id: 5, nickname: '美妆达人', avatar: 'https://picsum.photos/100/100?random=105', phone: '135****5555', balance: 8900.00, publishCount: 20, soldCount: 15, buyCount: 12, status: 1, createTime: '2024-01-10 11:30:00' }
  ],
  orders: [
    { id: 'ORD202401150001', productId: 1, productTitle: 'iPhone 13 Pro 256G 95新', productImage: 'https://picsum.photos/100/100?random=1', buyerId: 2, buyerName: '运动小子', sellerId: 1, sellerName: '数码达人', price: 4500, status: 1, statusText: '待发货', createTime: '2024-01-15 14:30:00', payTime: '2024-01-15 14:35:00', address: '北京市朝阳区某某小区1号楼101室' },
    { id: 'ORD202401140002', productId: 2, productTitle: 'Nike Air Max 运动鞋 42码', productImage: 'https://picsum.photos/100/100?random=4', buyerId: 1, buyerName: '数码达人', sellerId: 2, sellerName: '运动小子', price: 599, status: 2, statusText: '待收货', createTime: '2024-01-14 10:20:00', payTime: '2024-01-14 10:25:00', shipTime: '2024-01-14 16:00:00', logistics: '顺丰速运 SF1234567890', address: '上海市浦东新区某某街道2号楼202室' },
    { id: 'ORD202401100003', productId: 4, productTitle: 'MacBook Pro 16寸 M1', productImage: 'https://picsum.photos/100/100?random=7', buyerId: 3, buyerName: '居家生活', sellerId: 4, sellerName: '程序员小王', price: 12000, status: 3, statusText: '已完成', createTime: '2024-01-10 09:15:00', payTime: '2024-01-10 09:20:00', shipTime: '2024-01-10 14:00:00', confirmTime: '2024-01-12 18:30:00', logistics: '京东物流 JD1234567890', address: '广州市天河区某某路3号楼303室' },
    { id: 'ORD202401080004', productId: 5, productTitle: 'SK-II神仙水 230ml', productImage: 'https://picsum.photos/100/100?random=9', buyerId: 2, buyerName: '运动小子', sellerId: 5, sellerName: '美妆达人', price: 899, status: 3, statusText: '已完成', createTime: '2024-01-08 15:40:00', payTime: '2024-01-08 15:45:00', shipTime: '2024-01-08 18:00:00', confirmTime: '2024-01-10 12:00:00', logistics: '中通快递 ZT1234567890', address: '杭州市西湖区某某小区4号楼404室' }
  ],
  products: [
    { id: 1, title: 'iPhone 13 Pro 256G 95新', description: '自用iPhone 13 Pro，256G，远峰蓝色，电池健康89%，无拆无修，有轻微使用痕迹，配件齐全，诚心出售', price: 4500, originalPrice: 8999, categoryId: 1, categoryName: '数码电器', images: ['https://picsum.photos/400/400?random=1', 'https://picsum.photos/400/400?random=2'], userId: 1, userName: '数码达人', status: 1, viewCount: 328, polishTime: '2024-01-15 10:30:00', createTime: '2024-01-10 15:20:00', location: '北京市朝阳区', distance: 2.5 },
    { id: 2, title: 'Nike Air Max 运动鞋 42码', description: 'Nike Air Max 97，42码，穿过几次，几乎全新，正品支持鉴定，低价转让', price: 599, originalPrice: 1299, categoryId: 7, categoryName: '运动户外', images: ['https://picsum.photos/400/400?random=4'], userId: 2, userName: '运动小子', status: 2, viewCount: 156, polishTime: '2024-01-14 09:00:00', createTime: '2024-01-08 14:30:00', location: '上海市浦东新区', distance: 5.8 },
    { id: 3, title: '宜家书架 九成新', description: '宜家毕利书架，白色，80*28*202cm，九成新，需要自提', price: 299, originalPrice: 599, categoryId: 3, categoryName: '家居生活', images: ['https://picsum.photos/400/400?random=6'], userId: 3, userName: '居家生活', status: 1, viewCount: 89, polishTime: '2024-01-13 16:45:00', createTime: '2024-01-05 11:20:00', location: '广州市天河区', distance: 3.2 },
    { id: 4, title: 'MacBook Pro 16寸 M1', description: 'MacBook Pro 16英寸，M1 Pro芯片，16G+512G，购买不到一年，在保，包装齐全，因换台式机出售', price: 12000, originalPrice: 18999, categoryId: 1, categoryName: '数码电器', images: ['https://picsum.photos/400/400?random=7', 'https://picsum.photos/400/400?random=8'], userId: 4, userName: '程序员小王', status: 2, viewCount: 445, polishTime: '2024-01-12 08:30:00', createTime: '2024-01-02 10:00:00', location: '深圳市南山区', distance: 1.5 },
    { id: 5, title: 'SK-II神仙水 230ml', description: 'SK-II神仙水230ml，日上免税店购入，仅用了几次，还有很多，保质期到2025年，诚心出', price: 899, originalPrice: 1590, categoryId: 4, categoryName: '美妆护肤', images: ['https://picsum.photos/400/400?random=9'], userId: 5, userName: '美妆达人', status: 2, viewCount: 267, polishTime: '2024-01-15 11:20:00', createTime: '2024-01-11 16:00:00', location: '杭州市西湖区', distance: 4.1 }
  ],
  categories: [
    { id: 1, name: '数码电器', icon: '📱', sort: 1, productCount: 45, status: 1 },
    { id: 2, name: '服饰鞋包', icon: '👕', sort: 2, productCount: 38, status: 1 },
    { id: 3, name: '家居生活', icon: '🏠', sort: 3, productCount: 26, status: 1 },
    { id: 4, name: '美妆护肤', icon: '💄', sort: 4, productCount: 52, status: 1 },
    { id: 5, name: '图书文具', icon: '📚', sort: 5, productCount: 18, status: 1 },
    { id: 6, name: '母婴用品', icon: '👶', sort: 6, productCount: 12, status: 1 },
    { id: 7, name: '运动户外', icon: '⚽', sort: 7, productCount: 30, status: 1 },
    { id: 8, name: '其他', icon: '📦', sort: 8, productCount: 15, status: 1 }
  ]
}

// API模拟
const api = {
  // 登录
  login(username, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'admin' && password === '123456') {
          resolve({ code: 0, data: { token: 'admin-token-' + Date.now() }, message: '登录成功' })
        } else {
          resolve({ code: -1, message: '用户名或密码错误' })
        }
      }, 500)
    })
  },

  // 获取统计数据
  getStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalAmount = mockData.orders.filter(o => o.status === 3).reduce((sum, o) => sum + o.price, 0)
        resolve({
          code: 0,
          data: {
            userCount: mockData.users.length,
            orderCount: mockData.orders.length,
            productCount: mockData.products.length,
            totalAmount: totalAmount.toLocaleString()
          }
        })
      }, 300)
    })
  },

  // 获取用户列表
  getUsers(params = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [...mockData.users]
        if (params.keyword) {
          list = list.filter(u => u.nickname.includes(params.keyword) || u.phone.includes(params.keyword))
        }
        const page = params.page || 1
        const pageSize = params.pageSize || 10
        const start = (page - 1) * pageSize
        const end = start + pageSize
        
        resolve({
          code: 0,
          data: {
            list: list.slice(start, end),
            total: list.length
          }
        })
      }, 300)
    })
  },

  // 切换用户状态
  toggleUserStatus(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockData.users.find(u => u.id === userId)
        if (user) {
          user.status = user.status === 1 ? 0 : 1
        }
        resolve({ code: 0, message: '操作成功' })
      }, 300)
    })
  },

  // 删除用户
  deleteUser(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockData.users.findIndex(u => u.id === userId)
        if (index > -1) {
          mockData.users.splice(index, 1)
        }
        resolve({ code: 0, message: '删除成功' })
      }, 300)
    })
  },

  // 获取订单列表
  getOrders(params = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [...mockData.orders]
        if (params.orderId) {
          list = list.filter(o => o.id.includes(params.orderId))
        }
        if (params.status !== undefined && params.status !== '') {
          list = list.filter(o => o.status === params.status)
        }
        const page = params.page || 1
        const pageSize = params.pageSize || 10
        const start = (page - 1) * pageSize
        const end = start + pageSize
        
        resolve({
          code: 0,
          data: {
            list: list.slice(start, end),
            total: list.length
          }
        })
      }, 300)
    })
  },

  // 删除订单
  deleteOrder(orderId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockData.orders.findIndex(o => o.id === orderId)
        if (index > -1) {
          mockData.orders.splice(index, 1)
        }
        resolve({ code: 0, message: '删除成功' })
      }, 300)
    })
  },

  // 获取商品列表
  getProducts(params = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [...mockData.products]
        if (params.keyword) {
          list = list.filter(p => p.title.includes(params.keyword))
        }
        if (params.categoryId) {
          list = list.filter(p => p.categoryId === params.categoryId)
        }
        if (params.status !== undefined && params.status !== '') {
          list = list.filter(p => p.status === params.status)
        }
        const page = params.page || 1
        const pageSize = params.pageSize || 10
        const start = (page - 1) * pageSize
        const end = start + pageSize
        
        resolve({
          code: 0,
          data: {
            list: list.slice(start, end),
            total: list.length
          }
        })
      }, 300)
    })
  },

  // 切换商品状态
  toggleProductStatus(productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockData.products.find(p => p.id === productId)
        if (product) {
          product.status = product.status === 1 ? 0 : 1
        }
        resolve({ code: 0, message: '操作成功' })
      }, 300)
    })
  },

  // 删除商品
  deleteProduct(productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockData.products.findIndex(p => p.id === productId)
        if (index > -1) {
          mockData.products.splice(index, 1)
        }
        resolve({ code: 0, message: '删除成功' })
      }, 300)
    })
  },

  // 获取分类列表
  getCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ code: 0, data: mockData.categories })
      }, 300)
    })
  },

  // 保存分类
  saveCategory(category) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category.id) {
          const index = mockData.categories.findIndex(c => c.id === category.id)
          if (index > -1) {
            mockData.categories[index] = { ...mockData.categories[index], ...category }
          }
        } else {
          category.id = Math.max(...mockData.categories.map(c => c.id)) + 1
          category.productCount = 0
          category.status = 1
          mockData.categories.push(category)
        }
        resolve({ code: 0, message: '保存成功' })
      }, 300)
    })
  },

  // 切换分类状态
  toggleCategoryStatus(categoryId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = mockData.categories.find(c => c.id === categoryId)
        if (category) {
          category.status = category.status === 1 ? 0 : 1
        }
        resolve({ code: 0, message: '操作成功' })
      }, 300)
    })
  },

  // 删除分类
  deleteCategory(categoryId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockData.categories.findIndex(c => c.id === categoryId)
        if (index > -1) {
          mockData.categories.splice(index, 1)
        }
        resolve({ code: 0, message: '删除成功' })
      }, 300)
    })
  },

  // 获取配置
  getConfig() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: {
            basic: {
              platformName: '二手闲置交易平台',
              logo: '',
              servicePhone: '400-888-8888',
              serviceEmail: 'service@example.com',
              description: '二手闲置交易平台，让闲置物品发挥最大价值'
            },
            trade: {
              feeRate: 2,
              minFee: 1,
              autoConfirmDays: 7,
              withdrawFeeRate: 1,
              minWithdraw: 10
            },
            other: {
              polishValidDays: 7,
              autoOfflineDays: 30,
              needRegisterAudit: false,
              needProductAudit: false,
              forbiddenWords: '色情,赌博,毒品,枪支,假币,政治敏感'
            }
          }
        })
      }, 300)
    })
  },

  // 保存配置
  saveConfig(type, config) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('保存配置', type, config)
        resolve({ code: 0, message: '保存成功' })
      }, 300)
    })
  }
}
