// 模糊匹配，如果在字符串中找到了所有的字符，返回 true
export function fuzzyMatch(str: string, target: string): boolean {
  let j = 0
  while (j < target.length) {
    if (str.indexOf(target[j]) > -1) {
      j++
      continue
    }
    break
  }
  return j === target.length
}
