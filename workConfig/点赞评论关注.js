

let lib = require('../lib')
// let config = require('../config')
// let app界面信息filePath = config.app界面信息filePath
// let app界面信息 = JSON.parse(files.read(app界面信息filePath))
// let appVersion = lib.getAppVersion(config.appName)
// log('app界面信息 =')
// log(app界面信息)
// app界面信息 = app界面信息['版本号' + appVersion.replace(/\./g, '_')]
// if (!app界面信息) {
//   toastAndAlert('没有该版本的app界面信息')
//   lib.stopSelf()
// }
module.exports = {
  点赞: {
    name: '点赞',
    action: function () {
      toast('点赞')
      sleep(1000)
    }
  },
  关注: {
    name: '关注',
    action: function () {
      toast('关注')
    }
  },
  评论: {
    name: '评论',
    action: function () {
      toast('评论')
      sleep(1000)
    }
  },
}
