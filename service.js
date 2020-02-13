
let { JInit, JFlow, JWork, JConfig } = require('./jia/main')

let config = require('./config')
let common = require('./common')

// uid: "96170903569",
function extractDouYinWorkInfo (url) {
  let workInfo = {}
  let res = http.get(url, {
    headers: {
      'Accept-Language': 'zh-cn,zh;q=0.5',
      'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.0.0; zh-CN; MHA-AL00 Build/HUAWEIMHA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.1.4.994 Mobile Safari/537.36'
    }
  }).body.string()
  let reg = new RegExp('itemId: \"(.+?)\"');
  var result = res.match(reg);
  let itemId = result[0].match(/\d{10,}/)[0]
  workInfo.workId = itemId
  reg = new RegExp('uid: \"(.+?)\"');
  result = res.match(reg);
  itemId = result[0].match(/\d{6,}/)[0]
  workInfo.userId = itemId
  return workInfo
}
module.exports = {
  createFlow (flowName) {
    if (!config.flow[flowName]) {
      throw new Error('config.flow中没有该属性: ' + flowName)
    }
    let workConfig = config.flow[flowName].importConfiguration()
    workConfig = Object.assign(config, workConfig);
    // throw new Error('请传入 name, workList, workConfig 三个参数, 类型分别为,': 字符串, 数组, 对象')
    let workList = config.flow[flowName].workList
    let flow = new JFlow('搜索关键字', workList, workConfig)
    return flow
  },
  点击留下你的精彩评论吧 () {
    // let view = idEndsWith(config.抖音界面信息.视频播放页_底部_留下你的精彩评论吧_id).visibleToUser(true).findOne()
    let view = text('留下你的精彩评论吧').visibleToUser(true).findOne()
    common.clickView(view)
    sleep(1000)
    view = idEndsWith(config.抖音界面信息.发表评论页_右侧_发送按钮_id).visibleToUser(true).findOne()
    sleep(300)
  },
  获取评论 () {
    let commentList = ['这个好', '真秀儿', '加油']
    let comment = commentList[random(0, commentList.length - 1)]
    if (comment) {
      return comment
    } else {
      throw new Error('获取评论为空')
    }
  },
  输入评论内容 (comment) {
    let view = idEndsWith(config.抖音界面信息.发表评论页_带输入法的输入框_id).visibleToUser(true).findOne()
    view.setText(comment)
    sleep(500)
  },
  点击发送按钮 () {
    view = idEndsWith(config.抖音界面信息.发表评论页_右侧_发送按钮_id).visibleToUser(true).findOne()
    common.clickView(view)
    sleep(1000)
  },
  点击用户主页私信按钮 () {
    view = text('私信').visibleToUser(true).findOne()
    common.clickView(view)
    sleep(1000)
  },
  点击私信页输入框 () {
    view = idEndsWith(config.抖音界面信息.私信页_底部_输入框_id).visibleToUser(true).findOne()
    common.clickView(view)
    sleep(1000)
  },
  获取私信 () {
    let commentList = ['这个好', '真棒', '加油']
    let comment = commentList[random(0, commentList.length - 1)]
    if (comment) {
      return comment
    } else {
      throw new Error('获取私信为空')
    }
  },
  输入私信 (comment) {
    let view = idEndsWith(config.抖音界面信息.私信页_底部_输入框_id).visibleToUser(true).findOne()
    view.setText(comment)
    sleep(500)
  },
  点击私信页发送按钮 () {
    view = idEndsWith(config.抖音界面信息.私信页_右侧_发送按钮_id).visibleToUser(true).findOne()
    common.clickView(view)
    sleep(1000)
  },
  打开指定抖音视频 (link) {
    var workInfo = extractDouYinWorkInfo(link);
    var tmp = "snssdk1128://aweme/detail/" + workInfo.workId;
    app.startActivity({
      action: "android.intent.action.VIEW",
      data: tmp
    });
    let view = idEndsWith(config.抖音界面信息.视频播放页_底部_留下你的精彩评论吧_id).visibleToUser(true).findOne()
    sleep(2000)
    return workInfo
  },
  getPlatformTask () {
    var baseUrl = config.platformBaseUrl
    var 矿机排队url = '/api/online/list'
    var url = util.format('http://%s%s', baseUrl, 矿机排队url)
    log(url)
    r = http.postJson(url, {
      code: "84000010"
    });
    let task = r.body.json()

    if (task.data && task.data.length > 0 && task.data[0].platform === 2) {
      toastLog('有抖音任务')
      return task
    }
  },
  点击_视频页_右侧_头像 () {
    let 视频页_头像按钮_坐标 = config.抖音界面信息.视频页_头像按钮_坐标
    let x = 视频页_头像按钮_坐标.x
    let y = 视频页_头像按钮_坐标.y
    common.randomPress(x, y)
    idEndsWith(config.抖音界面信息.用户主页_关注按钮_id).visibleToUser(true).findOne()
    sleep(2000)
  },
  点击_用户主页_关注按钮 () {
    view = idEndsWith(config.抖音界面信息.用户主页_关注按钮_id).visibleToUser(true).findOne()
    common.clickView(view)
    sleep(2000)
  },
  getAppVersion (appName) {
    function getPackageVersion (packageName) {
      importPackage(android.content);
      var pckMan = context.getPackageManager();
      var packageInfo = pckMan.getPackageInfo(packageName, 0);
      return packageInfo.versionName;
    }
    var packageName = getPackageName(appName);
    return getPackageVersion(packageName);
  },
  打开指定用户主页 (userId) {
    var tmp = "snssdk1128://user/profile/" + userId;
    log(tmp);
    app.startActivity({
      data: tmp
    });
  }
}