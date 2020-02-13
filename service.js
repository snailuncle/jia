
let { JInit, JFlow, JWork, JConfig } = require('./jia/main')

let config = require('./config')

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
  }
}