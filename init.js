let config = require('./config')
let lib = require('./lib')

var init = function () {
  auto.setWindowFilter(function (window) { return true });
  // let url = config.app界面信息url
  // let path = config.app界面信息filePath
  // lib.downloadFile(url, path)
  // let app界面信息 = JSON.parse(files.read(path))
  // log(app界面信息)
  // let currentAppVersion = lib.getAppVersion(config.appName)
  // let 适配版本号列表 = app界面信息.适配版本号列表
  // if (适配版本号列表.indexOf(currentAppVersion) === -1) {
  //   let info = util.format('%s当前版本号是: %s, 不在已经适配的列表中: %j', config.appName, currentAppVersion, 适配版本号列表)
  //   toastAndAlert(info)
  //   lib.stopSelf()
  // }
}
module.exports = init