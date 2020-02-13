module.exports = {

  打开QQ: {
    name: '打开QQ',
    limitTime: 5000,
    searchWidgetLimitTime: 1000,
    expectedWidgetList: [
      {
        text: 'Auto.js'
      }
    ],
    action: function () {
      launchApp('QQ')
    },
    handleException: function () {
      log('打开QQ is handling exception !')
    }
  },
  点击输入框: {
    name: '点击输入框',
    limitTime: 5000,
    searchWidgetLimitTime: 1000,
    expectedWidgetList: [
      {
        text: '八点了'
      }
    ],
    action: function () {
      id('input').click()
      sleep(1000)
      id('input').findOne().setText('八点了')
    },
    handleException: function () {
      log('点击输入框 is handling exception !')
    }
  },
  发言: {
    name: '发言',
    limitTime: 5000,
    searchWidgetLimitTime: 1000,
    expectedWidgetList: [
      {
        id: 'chat_item_content_layout',
        text: '八点了'
      }
    ],
    action: function () {
      text('发送').click()
    },
    handleException: function () {
      log('发言 is handling exception !')
    }
  },
}
