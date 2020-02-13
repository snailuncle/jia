
auto.setWindowFilter(function (window) { return true });
let service = require('./service')
let flowName = 'Q群发言'
let flow = service.createFlow(flowName)
flow.go()
