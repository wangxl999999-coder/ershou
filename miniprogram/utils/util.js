const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatPrice = price => {
  return price.toFixed(2)
}

const formatDistance = distance => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`
  }
  return `${distance.toFixed(1)}km`
}

const showToast = (title, icon = 'none') => {
  wx.showToast({
    title,
    icon,
    duration: 2000
  })
}

const showLoading = (title = '加载中...') => {
  wx.showLoading({
    title,
    mask: true
  })
}

const hideLoading = () => {
  wx.hideLoading()
}

const showModal = (title, content, options = {}) => {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      confirmColor: '#ff6b35',
      ...options,
      success: (res) => {
        resolve(res.confirm)
      }
    })
  })
}

const chooseImage = (count = 9) => {
  return new Promise((resolve, reject) => {
    wx.chooseMedia({
      count,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        resolve(res.tempFiles.map(f => f.tempFilePath))
      },
      fail: reject
    })
  })
}

module.exports = {
  formatTime,
  formatPrice,
  formatDistance,
  showToast,
  showLoading,
  hideLoading,
  showModal,
  chooseImage
}
