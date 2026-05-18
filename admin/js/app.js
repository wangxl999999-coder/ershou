new Vue({
  el: '#app',
  data() {
    return {
      isLoggedIn: false,
      loginForm: {
        username: '',
        password: ''
      },
      activeMenu: 'dashboard',
      stats: {
        userCount: 0,
        orderCount: 0,
        productCount: 0,
        totalAmount: 0
      },
      recentOrders: [],
      recentProducts: [],
      
      // 用户管理
      userFilter: {
        keyword: ''
      },
      userList: [],
      userPage: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      
      // 订单管理
      orderFilter: {
        orderId: '',
        status: ''
      },
      orderList: [],
      orderPage: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      orderDetailVisible: false,
      currentOrder: null,
      
      // 商品管理
      productFilter: {
        keyword: '',
        categoryId: '',
        status: ''
      },
      productList: [],
      productPage: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      productDetailVisible: false,
      currentProduct: null,
      
      // 分类管理
      categories: [],
      categoryEditVisible: false,
      categoryForm: {},
      
      // 系统配置
      activeConfigTab: 'basic',
      basicConfig: {},
      tradeConfig: {},
      otherConfig: {}
    }
  },
  computed: {
    pageTitle() {
      const titles = {
        dashboard: '数据概览',
        user: '用户管理',
        order: '订单管理',
        product: '商品管理',
        category: '分类管理',
        config: '系统配置'
      }
      return titles[this.activeMenu] || '管理后台'
    }
  },
  created() {
    const token = localStorage.getItem('adminToken')
    if (token) {
      this.isLoggedIn = true
      this.initPage()
    }
  },
  methods: {
    // 登录
    async handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.warning('请输入用户名和密码')
        return
      }
      const res = await api.login(this.loginForm.username, this.loginForm.password)
      if (res.code === 0) {
        localStorage.setItem('adminToken', res.data.token)
        this.isLoggedIn = true
        this.$message.success('登录成功')
        this.initPage()
      } else {
        this.$message.error(res.message)
      }
    },
    
    // 退出
    handleLogout() {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('adminToken')
        this.isLoggedIn = false
        this.$message.success('已退出登录')
      }).catch(() => {})
    },
    
    // 初始化页面
    async initPage() {
      await this.loadStats()
      await this.loadRecentOrders()
      await this.loadRecentProducts()
      await this.loadCategories()
      await this.loadConfig()
    },
    
    // 加载统计数据
    async loadStats() {
      const res = await api.getStats()
      if (res.code === 0) {
        this.stats = res.data
      }
    },
    
    // 加载最近订单
    async loadRecentOrders() {
      const res = await api.getOrders({ page: 1, pageSize: 5 })
      if (res.code === 0) {
        this.recentOrders = res.data.list
      }
    },
    
    // 加载最近商品
    async loadRecentProducts() {
      const res = await api.getProducts({ page: 1, pageSize: 5 })
      if (res.code === 0) {
        this.recentProducts = res.data.list
      }
    },
    
    // ============= 用户管理 =============
    async loadUsers() {
      const res = await api.getUsers({
        ...this.userFilter,
        page: this.userPage.page,
        pageSize: this.userPage.pageSize
      })
      if (res.code === 0) {
        this.userList = res.data.list
        this.userPage.total = res.data.total
      }
    },
    searchUser() {
      this.userPage.page = 1
      this.loadUsers()
    },
    resetUserFilter() {
      this.userFilter.keyword = ''
      this.searchUser()
    },
    handleUserPageChange(page) {
      this.userPage.page = page
      this.loadUsers()
    },
    async toggleUserStatus(user) {
      const action = user.status === 1 ? '禁用' : '启用'
      this.$confirm(`确定要${action}该用户吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await api.toggleUserStatus(user.id)
        if (res.code === 0) {
          this.$message.success('操作成功')
          this.loadUsers()
        }
      }).catch(() => {})
    },
    deleteUser(user) {
      this.$confirm('确定要删除该用户吗？删除后不可恢复！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        const res = await api.deleteUser(user.id)
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.loadUsers()
          this.loadStats()
        }
      }).catch(() => {})
    },
    
    // ============= 订单管理 =============
    async loadOrders() {
      const res = await api.getOrders({
        ...this.orderFilter,
        page: this.orderPage.page,
        pageSize: this.orderPage.pageSize
      })
      if (res.code === 0) {
        this.orderList = res.data.list
        this.orderPage.total = res.data.total
      }
    },
    searchOrder() {
      this.orderPage.page = 1
      this.loadOrders()
    },
    resetOrderFilter() {
      this.orderFilter.orderId = ''
      this.orderFilter.status = ''
      this.searchOrder()
    },
    handleOrderPageChange(page) {
      this.orderPage.page = page
      this.loadOrders()
    },
    viewOrderDetail(order) {
      this.currentOrder = order
      this.orderDetailVisible = true
    },
    deleteOrder(order) {
      this.$confirm('确定要删除该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await api.deleteOrder(order.id)
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.loadOrders()
          this.loadStats()
          this.loadRecentOrders()
        }
      }).catch(() => {})
    },
    
    // ============= 商品管理 =============
    async loadProducts() {
      const res = await api.getProducts({
        ...this.productFilter,
        page: this.productPage.page,
        pageSize: this.productPage.pageSize
      })
      if (res.code === 0) {
        this.productList = res.data.list
        this.productPage.total = res.data.total
      }
    },
    searchProduct() {
      this.productPage.page = 1
      this.loadProducts()
    },
    resetProductFilter() {
      this.productFilter.keyword = ''
      this.productFilter.categoryId = ''
      this.productFilter.status = ''
      this.searchProduct()
    },
    handleProductPageChange(page) {
      this.productPage.page = page
      this.loadProducts()
    },
    viewProductDetail(product) {
      this.currentProduct = product
      this.productDetailVisible = true
    },
    async toggleProductStatus(product) {
      const action = product.status === 1 ? '下架' : '上架'
      this.$confirm(`确定要${action}该商品吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await api.toggleProductStatus(product.id)
        if (res.code === 0) {
          this.$message.success('操作成功')
          this.loadProducts()
          this.loadRecentProducts()
        }
      }).catch(() => {})
    },
    deleteProduct(product) {
      this.$confirm('确定要删除该商品吗？删除后不可恢复！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        const res = await api.deleteProduct(product.id)
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.loadProducts()
          this.loadStats()
          this.loadRecentProducts()
        }
      }).catch(() => {})
    },
    
    // ============= 分类管理 =============
    async loadCategories() {
      const res = await api.getCategories()
      if (res.code === 0) {
        this.categories = res.data
      }
    },
    addCategory() {
      this.categoryForm = {
        name: '',
        icon: '📦',
        sort: this.categories.length + 1
      }
      this.categoryEditVisible = true
    },
    editCategory(category) {
      this.categoryForm = { ...category }
      this.categoryEditVisible = true
    },
    async saveCategory() {
      if (!this.categoryForm.name.trim()) {
        this.$message.warning('请输入分类名称')
        return
      }
      const res = await api.saveCategory(this.categoryForm)
      if (res.code === 0) {
        this.$message.success('保存成功')
        this.categoryEditVisible = false
        this.loadCategories()
      }
    },
    async toggleCategoryStatus(category) {
      const action = category.status === 1 ? '禁用' : '启用'
      this.$confirm(`确定要${action}该分类吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await api.toggleCategoryStatus(category.id)
        if (res.code === 0) {
          this.$message.success('操作成功')
          this.loadCategories()
        }
      }).catch(() => {})
    },
    deleteCategory(category) {
      this.$confirm('确定要删除该分类吗？删除后不可恢复！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        const res = await api.deleteCategory(category.id)
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.loadCategories()
        }
      }).catch(() => {})
    },
    
    // ============= 系统配置 =============
    async loadConfig() {
      const res = await api.getConfig()
      if (res.code === 0) {
        this.basicConfig = res.data.basic
        this.tradeConfig = res.data.trade
        this.otherConfig = res.data.other
      }
    },
    async saveBasicConfig() {
      const res = await api.saveConfig('basic', this.basicConfig)
      if (res.code === 0) {
        this.$message.success('保存成功')
      }
    },
    async saveTradeConfig() {
      const res = await api.saveConfig('trade', this.tradeConfig)
      if (res.code === 0) {
        this.$message.success('保存成功')
      }
    },
    async saveOtherConfig() {
      const res = await api.saveConfig('other', this.otherConfig)
      if (res.code === 0) {
        this.$message.success('保存成功')
      }
    }
  },
  
  watch: {
    activeMenu(newVal) {
      if (newVal === 'user') {
        this.loadUsers()
      } else if (newVal === 'order') {
        this.loadOrders()
      } else if (newVal === 'product') {
        this.loadProducts()
      } else if (newVal === 'category') {
        this.loadCategories()
      } else if (newVal === 'config') {
        this.loadConfig()
      }
    }
  }
})
