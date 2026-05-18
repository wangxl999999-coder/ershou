const categories = [
  { id: 1, name: '数码电器', icon: '📱' },
  { id: 2, name: '服饰鞋包', icon: '👕' },
  { id: 3, name: '家居生活', icon: '🏠' },
  { id: 4, name: '美妆护肤', icon: '💄' },
  { id: 5, name: '图书文具', icon: '📚' },
  { id: 6, name: '母婴用品', icon: '👶' },
  { id: 7, name: '运动户外', icon: '⚽' },
  { id: 8, name: '其他', icon: '📦' }
]

const products = [
  {
    id: 1,
    title: 'iPhone 13 Pro 256G 95新',
    description: '自用iPhone 13 Pro，256G，远峰蓝色，电池健康89%，无拆无修，有轻微使用痕迹，配件齐全，诚心出售',
    price: 4500,
    originalPrice: 8999,
    categoryId: 1,
    categoryName: '数码电器',
    images: [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2',
      'https://picsum.photos/400/400?random=3'
    ],
    userId: 1,
    userName: '数码达人',
    userAvatar: 'https://picsum.photos/100/100?random=101',
    status: 1,
    viewCount: 328,
    polishTime: '2024-01-15 10:30',
    createTime: '2024-01-10 15:20',
    location: '北京市朝阳区',
    distance: 2.5
  },
  {
    id: 2,
    title: 'Nike Air Max 运动鞋 42码',
    description: 'Nike Air Max 97，42码，穿过几次，几乎全新，正品支持鉴定，低价转让',
    price: 599,
    originalPrice: 1299,
    categoryId: 7,
    categoryName: '运动户外',
    images: [
      'https://picsum.photos/400/400?random=4',
      'https://picsum.photos/400/400?random=5'
    ],
    userId: 2,
    userName: '运动小子',
    userAvatar: 'https://picsum.photos/100/100?random=102',
    status: 1,
    viewCount: 156,
    polishTime: '2024-01-14 09:00',
    createTime: '2024-01-08 14:30',
    location: '上海市浦东新区',
    distance: 5.8
  },
  {
    id: 3,
    title: '宜家书架 九成新',
    description: '宜家毕利书架，白色，80*28*202cm，九成新，需要自提',
    price: 299,
    originalPrice: 599,
    categoryId: 3,
    categoryName: '家居生活',
    images: [
      'https://picsum.photos/400/400?random=6'
    ],
    userId: 3,
    userName: '居家生活',
    userAvatar: 'https://picsum.photos/100/100?random=103',
    status: 1,
    viewCount: 89,
    polishTime: '2024-01-13 16:45',
    createTime: '2024-01-05 11:20',
    location: '广州市天河区',
    distance: 3.2
  },
  {
    id: 4,
    title: 'MacBook Pro 16寸 M1',
    description: 'MacBook Pro 16英寸，M1 Pro芯片，16G+512G，购买不到一年，在保，包装齐全，因换台式机出售',
    price: 12000,
    originalPrice: 18999,
    categoryId: 1,
    categoryName: '数码电器',
    images: [
      'https://picsum.photos/400/400?random=7',
      'https://picsum.photos/400/400?random=8'
    ],
    userId: 4,
    userName: '程序员小王',
    userAvatar: 'https://picsum.photos/100/100?random=104',
    status: 2,
    viewCount: 445,
    polishTime: '2024-01-12 08:30',
    createTime: '2024-01-02 10:00',
    location: '深圳市南山区',
    distance: 1.5
  },
  {
    id: 5,
    title: 'SK-II神仙水 230ml',
    description: 'SK-II神仙水230ml，日上免税店购入，仅用了几次，还有很多，保质期到2025年，诚心出',
    price: 899,
    originalPrice: 1590,
    categoryId: 4,
    categoryName: '美妆护肤',
    images: [
      'https://picsum.photos/400/400?random=9'
    ],
    userId: 5,
    userName: '美妆达人',
    userAvatar: 'https://picsum.photos/100/100?random=105',
    status: 1,
    viewCount: 267,
    polishTime: '2024-01-15 11:20',
    createTime: '2024-01-11 16:00',
    location: '杭州市西湖区',
    distance: 4.1
  }
]

const orders = [
  {
    id: 'ORD202401150001',
    productId: 1,
    product: products[0],
    buyerId: 2,
    buyerName: '运动小子',
    buyerAvatar: 'https://picsum.photos/100/100?random=102',
    sellerId: 1,
    sellerName: '数码达人',
    sellerAvatar: 'https://picsum.photos/100/100?random=101',
    price: 4500,
    status: 1,
    statusText: '待发货',
    createTime: '2024-01-15 14:30',
    payTime: '2024-01-15 14:35',
    address: {
      name: '张三',
      phone: '138****8888',
      address: '北京市朝阳区某某小区1号楼101室'
    }
  },
  {
    id: 'ORD202401140002',
    productId: 2,
    product: products[1],
    buyerId: 1,
    buyerName: '数码达人',
    buyerAvatar: 'https://picsum.photos/100/100?random=101',
    sellerId: 2,
    sellerName: '运动小子',
    sellerAvatar: 'https://picsum.photos/100/100?random=102',
    price: 599,
    status: 2,
    statusText: '待收货',
    createTime: '2024-01-14 10:20',
    payTime: '2024-01-14 10:25',
    shipTime: '2024-01-14 16:00',
    logistics: '顺丰速运 SF1234567890',
    address: {
      name: '李四',
      phone: '139****9999',
      address: '上海市浦东新区某某街道2号楼202室'
    }
  },
  {
    id: 'ORD202401100003',
    productId: 4,
    product: products[3],
    buyerId: 3,
    buyerName: '居家生活',
    buyerAvatar: 'https://picsum.photos/100/100?random=103',
    sellerId: 4,
    sellerName: '程序员小王',
    sellerAvatar: 'https://picsum.photos/100/100?random=104',
    price: 12000,
    status: 3,
    statusText: '已完成',
    createTime: '2024-01-10 09:15',
    payTime: '2024-01-10 09:20',
    shipTime: '2024-01-10 14:00',
    confirmTime: '2024-01-12 18:30',
    logistics: '京东物流 JD1234567890',
    address: {
      name: '王五',
      phone: '137****7777',
      address: '广州市天河区某某路3号楼303室'
    }
  }
]

const chatList = [
  {
    id: 1,
    userId: 2,
    userName: '运动小子',
    userAvatar: 'https://picsum.photos/100/100?random=102',
    lastMessage: '请问这个手机还能便宜点吗？',
    lastTime: '2024-01-15 16:30',
    unreadCount: 2
  },
  {
    id: 2,
    userId: 3,
    userName: '居家生活',
    userAvatar: 'https://picsum.photos/100/100?random=103',
    lastMessage: '好的，那我周末过去自提',
    lastTime: '2024-01-14 14:20',
    unreadCount: 0
  }
]

const messages = [
  {
    id: 1,
    chatId: 1,
    senderId: 2,
    content: '你好，这个手机还在吗？',
    type: 'text',
    createTime: '2024-01-15 10:00'
  },
  {
    id: 2,
    chatId: 1,
    senderId: 1,
    content: '在的，有什么问题吗？',
    type: 'text',
    createTime: '2024-01-15 10:05'
  },
  {
    id: 3,
    chatId: 1,
    senderId: 2,
    content: '请问这个手机还能便宜点吗？',
    type: 'text',
    createTime: '2024-01-15 16:30'
  }
]

const addresses = [
  {
    id: 1,
    name: '张三',
    phone: '13888888888',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    address: '某某小区1号楼101室',
    isDefault: true
  },
  {
    id: 2,
    name: '张三',
    phone: '13888888888',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
    address: '某某大厦A座2001室',
    isDefault: false
  }
]

const currentUser = {
  id: 1,
  nickname: '数码达人',
  avatar: 'https://picsum.photos/100/100?random=101',
  phone: '138****8888',
  balance: 12500.00,
  publishCount: 15,
  soldCount: 8,
  buyCount: 5
}

module.exports = {
  categories,
  products,
  orders,
  chatList,
  messages,
  addresses,
  currentUser
}
