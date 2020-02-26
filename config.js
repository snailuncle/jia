

let appName = 'autojs'
var storage = storages.create(appName);
let app界面信息url = "app界面信息url"
let app界面信息filePath = files.join(files.getSdcardPath(), '.app界面信息.json')
var storage = storages.create(appName);
let config = {
  appName: appName,
  app界面信息url: app界面信息url,
  app界面信息filePath: app界面信息filePath,
  storage: storage,
  work: {
    default: {
      name: '匿名工作',
      limitTime: 5000,
      searchWidgetLimitTime: 1000,
      expectedWidgetList: [],
      checkStateIntervalTime: 100,
      execAppName: 'Auto.js Pro',
      showView: false,
      retryCount: 2,
      action: function () { return true },
      handleException: function () { return true },
    }
  },
}

module.exports = config