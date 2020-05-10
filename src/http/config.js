/**
 * 配置不同环境接口前缀
 * 如果未配置dev为默认配置
 * @param {*} base
 * @example
 * {
 *   dev: 'dev环境配置信息',
 *   test: 'test环境配置信息',
 *   prod: '线上环境配置信息'
 * }
 */
function conf (base = {}) {
  if (process.env.NODE_ENV === 'production') { // 生产环境下
    let env = process.env.ENV_CONFIG || 'dev'
    return base[env] || base['dev']
  }
  // 开发环境
  return base['dev']
}

// PORTAL 接口
export const BASE_URL = conf({
  dev: 'http://192.168.1.4:8080',
  test: 'http://localhost:8080',
  prod: 'http://localhost:8080'
})
