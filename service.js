let { JInit, JFlow, JWork, JConfig } = require('./jia/main')
let flowConfig = require('./flowConfig')
let config = require('./config')
let lib = require('./lib')


module.exports = {
  createFlow (flowName) {
    if (!flowConfig.flow[flowName]) {
      throw new Error('flowConfig中没有该属性: ' + flowName)
    }
    let workConfig = flowConfig.flow[flowName].importConfiguration()
    workConfig = Object.assign(config, workConfig);
    // throw new Error('请传入 name, workList, workConfig 三个参数, 类型分别为,': 字符串, 数组, 对象')
    let workList = flowConfig.flow[flowName].workList
    let flow = new JFlow(flowName, workList, workConfig)
    return flow
  }
}