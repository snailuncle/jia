module.exports = {
  flow: {
    点赞评论关注: {
      name: '点赞评论关注',
      workList: ['点赞', "评论", "关注"],
      importConfiguration: function () {
        return require('./workConfig/点赞评论关注')
      }
    },
  }
}