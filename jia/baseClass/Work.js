// 具体工作内容
// 正常工作是工作, 异常处理也是工作

let widgetInspect = require('../lib/widgetInspect')
let config = require('../config')
function Work (workConfig) {
  this.workConfig = Object.assign(config, workConfig);
  this.name = workConfig.name || this.workConfig.work.default.name
  this.limitTime = workConfig.limitTime || this.workConfig.work.default.limitTime  // 每个工作的限制时间
  this.result = false;
  this.action = workConfig.action || this.workConfig.work.default.action
  this.handleException = workConfig.handleException || this.workConfig.work.default.handleException
  this.expectedWidgetList = workConfig.expectedWidgetList || this.workConfig.work.default.expectedWidgetList
  this.inspect = function () { return widgetInspect(this.expectedWidgetList, this.searchWidgetLimitTime, this.workConfig) }
}

Work.prototype.setHandleException = function (handleException) {
  this.handleException = handleException
  return true;
}
Work.prototype.setExpectedWidgetList = function (widgetList) {
  this.expectedWidgetList = widgetList
  return true;
}
Work.prototype.setAction = function (action) {
  this.action = action
  return true;
}


Work.prototype.go = function () {
  log('当前工作名字: ' + this.name + ': 执行 开始')
  this.action()
  this.result = this.inspect()
  log('当前工作名字: ' + this.name + ': 执行 结束')
}
Work.prototype.getResult = function () {
  return this.result
}

module.exports = Work
