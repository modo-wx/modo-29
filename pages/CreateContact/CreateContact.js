let ports = require('../../utils/ports.js');
let util = require('../../utils/util.js');
Page({
  data: {
    bgImageUrl: ports.imgUrl + 'id_card.jpg',
    flag: true,
    tempFilePaths: "",
  },

  onLoad: function(options) {

  },
  chooseimage() {
    let _this = this;
    let openId = util.getStorage("openId");
    let UserID = util.getStorage("userID");
    wx.chooseImage({
      count: 1, // 默认9  
      // 可以指定是原图还是压缩图，默认二者都有  
      sizeType: ['original', 'compressed'],
      // 可以指定来源是相册还是相机，默认二者都有
      sourceType: ['album', 'camera'],
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片   
      success: function(res) {
        console.log(res.tempFilePaths)
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
        var path = res.tempFilePaths;
        console.log(ports.modoHttp + 'API/WeChatMiniProgram/ValidIDCard');
        console.log(UserID, openId)
        wx.uploadFile({
          url: ports.modoHttp + 'API/WeChatMiniProgram/ValidIDCard', //仅为示例，非真实的接口地址
          filePath: path[0],
          name: 'file',
          formData: {
            'UserID': UserID,
            'OpenID': openId
          },
          success: function(res) {
            var data = res.data;
            console.log(data)
          }
        })
      }
    })
  }
})