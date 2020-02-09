module.exports = {
  example: {
    name: '第一个工作demo',
    limitTime: 1000,
    searchWidgetLimitTime: 1000,
    expectedWidgetList: [],
    action: function () {
      log('example is working !')
    },
    handleException: function () {
      log('example is handling exception !')
    }
  },
  吃饭: {
    name: '吃饭',
    limitTime: 1000,
    searchWidgetLimitTime: 1000,
    expectedWidgetList: [],
    action: function () {
      log('吃饭 is working !')
    },
    handleException: function () {
      log('吃饭 is handling exception !')
    }
  },
  睡觉: {
    name: '睡觉',
    limitTime: 5000,
    searchWidgetLimitTime: 1000,
    expectedWidgetList: [
      {
        text: 'QQ'
      },
      {
        text: 'AA'
      },
    ],
    action: function () {
      log('睡觉 is working !')
    },
    handleException: function () {
      log('睡觉 is handling exception !')
    }
  },
  打豆豆: {
    name: '打豆豆',
    limitTime: 1000,
    searchWidgetLimitTime: 1000,
    expectedWidgetList: [],
    action: function () {
      log('打豆豆 is working !')
    },
    handleException: function () {
      log('打豆豆 is handling exception !')
    }
  },
}
