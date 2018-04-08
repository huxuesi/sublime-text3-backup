var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API_TEST: '"http://cloudapi.honsenflag.com"',    // 测试api
  BASE_WEB_TEST: '"http://cloud2.honsenflag.com"',      // 测试前端页面
  BASE_API: '"http://api.honsenflag.com"',              // 正式api
  BASE_WEB: '"http://www.honsenflag.com"',              // 正式前端页面
  BASE_API_PRIVIEW: '"http://previewapi.honsenflag.com"',       // 预发布api
  BASE_WEB_PRIVIEW: '"http://preview.honsenflag.com"'           // 预发布前端页面
})
