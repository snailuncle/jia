// workList: ['点击评论按钮', '随机观看评论', '发表评论', '点击返回键'],


let 评论按钮坐标;
let 视频页_头像按钮_坐标;

if (device.model === 'MI 8') {
  评论按钮坐标 = {
    x: 994, y: 1428
  }
  视频页_头像按钮_坐标 = {
    x: 994, y: 999
  }
} else if (device.model === 'M5 Note') {
  评论按钮坐标 = {
    x: 986, y: 1116
  }
  视频页_头像按钮_坐标 = {
    x: 982, y: 659
  }
} else {
  let info = '该类型手机暂未适配'
  alert(info)
  throw new Error(info)
}




module.exports = {
  appName: 'appName',
  link:'https://v.douyin.com/pvyJTF/',
  appName版本号: '9.8.5',
  platformBaseUrl: 'ddt.feikeshequ.com',
  flow: {
    关注私信: {
      name: '关注私信',
      workList: ['关注', '私信'],
      importConfiguration: function () {
        return require('./workConfig/关注私信')
      }
    },
    点赞评论关注: {
      name: '点赞评论关注',
      workList: ['点赞', '评论', '关注'],
      importConfiguration: function () {
        return require('./workConfig/点赞评论关注')
      }
    },
    评论: {
      name: '评论',
      workList: ['点击评论按钮', '随机观看评论', '发表评论', '点击返回键'],
      importConfiguration: function () {
        return require('./workConfig/评论')
      }
    },

    搜索关键字: {
      name: '评论',
      workList: ['点击右上角搜索按钮', '输入关键字', '点击关键字'],
      importConfiguration: function () {
        return require('./workConfig/评论')
      }
    },
    音乐收藏: {
      name: '音乐收藏',
      workList: ['点击右下角音乐按钮', '点击收藏'],
      importConfiguration: function () {
        return require('./workConfig/音乐收藏')
      }
    },
    作品数量关注数量喜欢数量: {
      name: '作品数量关注数量喜欢数量',
      workList: ['点击获赞', '点击关注', '点击粉丝'],
      importConfiguration: function () {
        return require('./workConfig/作品数量关注数量喜欢数量')
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
  },
  appName界面信息: {
    视频播放页_底部_留下你的精彩评论吧_id: 'p_',
    发表评论页_右侧_发送按钮_id: 'a6z',
    发表评论页_带输入法的输入框_id: 'a6i',
    首页_右侧_加号关注按钮_id: 'b0x',
    首页_右侧_头像按钮_id: 'emq',
    用户主页_关注按钮_id: 'dbb',
    私信页_底部_输入框_id: 'cnt',
    私信页_右侧_发送按钮_id: 'dyg',
    用户主页_关注数量按钮_id: 'b1l',
    用户主页_粉丝数量按钮_id: 'b1g',
    视频播放页_右下角_音乐按钮_id: 'cy0',
    首页_右上角_搜索按钮_id: 'az9',
    搜索页_顶部_输入框_id: 'ahw',
    搜索页_搜索结果列表_item_id: 'ffx',
    视频完播时间基准: 15000,
    评论按钮坐标: 评论按钮坐标,
    视频页_头像按钮_坐标: 视频页_头像按钮_坐标,
    观看评论时间范围: {
      min: 10000,
      max: 30000
    }
  }
}


