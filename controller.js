let init = require('./init')
let service = require('./service')
init()
let controller = {
  run () {
    let workList = ['点赞', '评论']
    let flow = service.createFlow('点赞评论关注')
    flow.setWorkList(workList)
    flow.run()
  }
}

module.exports = controller