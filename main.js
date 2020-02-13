

auto.setWindowFilter(function (window) { return true });
let service = require('./service')
let config = require('./config')
let appName = 'appName'
let r = service.getAppVersion('appName')
if (r !== config.抖音版本号) {
  let info = appName + '版本号不是' + config.抖音版本号
  toastLog(info)
  alert(info)
} else {

  // app.launchApp(config.appName)
  // sleep(3000)
  let workList = ['打开指定视频', '点赞', '评论', '关注']
  let flowName = '点赞评论关注'
  let flow = service.createFlow(flowName)
  flow.setWorkList(workList)
  flow.go()
  


  // let service = require('./service')
  // let workList = ['发表评论']
  // let flowName = '评论'
  // let flow = service.createFlow(flowName)
  // flow.setWorkList(workList)
  // flow.go()


}


