let { JInit, JFlow, JWork, JConfig } = require('./jia/main')

// 这里导入所有配置并合并, 
let config = require('./config')
let workConfig = require('./workConfig/Q群发言')

workConfig = Object.assign(config, workConfig);



let workList = ['打开QQ', '点击输入框', '发言']
// throw new Error('请传入 name, workList, workConfig 三个参数, 类型分别为: 字符串, 数组, 对象')
let flow = new JFlow('Q群发言', workList, workConfig)
flow.go()
