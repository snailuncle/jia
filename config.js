
module.exports = {
  appName: 'appName',
  link: 'https://v.douyin.com/pvyJTF/',
  appName版本号: '9.8.5',
  platformBaseUrl: 'ddt.feikeshequ.com',
  flow: {
    Q群发言: {
      name: 'Q群发言',
      workList: ['打开QQ', '点击输入框', '发言'],
      importConfiguration: function () {
        return require('./workConfig/Q群发言')
      }
    },
  },
  work: {
    default: {
      name: '匿名工作',
      limitTime: 5000,
      action: function () { return true },
      handleException: function () { return true },
      expectedWidgetList: [],
      checkStateIntervalTime: 100,
      searchWidgetLimitTime: 1000,
      execAppName: 'Auto.js Pro',
      showView: false,
      retryCount: 2,
    }
  }
}


