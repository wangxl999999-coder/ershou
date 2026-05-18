const api = require('../../utils/api.js')

Page({
  data: {
    messages: [],
    inputText: '',
    userId: null,
    userName: '',
    currentUserId: 1,
    currentUserAvatar: 'https://picsum.photos/100/100?random=101',
    otherUserAvatar: 'https://picsum.photos/100/100?random=102',
    scrollToView: ''
  },

  onLoad(options) {
    const userId = parseInt(options.userId)
    const userName = options.userName || ''
    
    wx.setNavigationBarTitle({
      title: userName
    })
    
    this.setData({
      userId,
      userName,
      otherUserAvatar: `https://picsum.photos/100/100?random=${100 + userId}`
    })
    
    this.loadMessages()
  },

  async loadMessages() {
    const res = await api.getMessages(this.data.userId)
    if (res.code === 0) {
      this.setData({ messages: res.data })
      this.scrollToBottom()
    }
  },

  scrollToBottom() {
    if (this.data.messages.length > 0) {
      const lastMsg = this.data.messages[this.data.messages.length - 1]
      this.setData({ scrollToView: `msg-${lastMsg.id}` })
    }
  },

  onInput(e) {
    this.setData({ inputText: e.detail.value })
  },

  async sendMessage() {
    const content = this.data.inputText.trim()
    if (!content) return
    
    const newMessage = {
      id: Date.now(),
      chatId: this.data.userId,
      senderId: this.data.currentUserId,
      content,
      type: 'text',
      createTime: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    
    this.setData({
      messages: [...this.data.messages, newMessage],
      inputText: ''
    })
    
    this.scrollToBottom()
    
    await api.sendMessage(this.data.userId, content)
    
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        chatId: this.data.userId,
        senderId: this.data.userId,
        content: this.getRandomReply(),
        type: 'text',
        createTime: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
      
      this.setData({
        messages: [...this.data.messages, replyMessage]
      })
      
      this.scrollToBottom()
    }, 1000)
  },

  getRandomReply() {
    const replies = [
      '你好，请问有什么可以帮您的吗？',
      '好的，我知道了',
      '请问还在吗？',
      '这个价格可以再商量吗？',
      '商品还在的',
      '可以面交吗？',
      '好的，谢谢！'
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  }
})
