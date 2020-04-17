//针对localstorage的操作
let KEY = 'DEFAULT_KEY'
export default {
  getVal(key) {
    if(key && key !== ''){
      KEY = key
    }
    let val = localStorage.getItem(KEY)
    //反序列化
    return JSON.parse(val)
  },
  setVal(key, val) {
    if(key && key !== ''){
      KEY = key
    }
    //序列化
    val = JSON.stringify(val)
    return localStorage.setItem(KEY, val)
  }
}
