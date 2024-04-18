/**
 * 补充 url 参数
 * @param url url
 * @param params 键值对的参数列表
 * @returns 补充参数后的 url
 */
export default function formatUrl(url: string, params: Record<string, number | string | boolean>) {
  const keys = Object.keys(params)
  const validKeyValue: string[] = []
  keys.forEach(key => {
    if (params[key] !== undefined && params[key] !== '' && params[key] !== null) {
      validKeyValue.push(`${key}=${params[key]}`)
    }
  })
  if (validKeyValue.length === 0) {
    return url
  }
  const query = validKeyValue.join('&')
  if (url.indexOf('?') > -1) {
    return url + '&' + query
  }
  return url + '?' + query
}
