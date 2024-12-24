import * as XLSX from 'xlsx'

export default function createXlsxDownload(data: any, name: string, type = 'json') {
  let ws
  switch (type) {
    case 'json':
      ws = XLSX.utils.json_to_sheet(data)
      break
    case 'aoa':
      ws = XLSX.utils.aoa_to_sheet(data)
      break
    default:
      ws = XLSX.utils.json_to_sheet(data)
      break
  }
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws)

  const wbout = XLSX.write(wb, { type: 'binary', bookType: 'csv' })
  function s2ab(s: any) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      /* eslint-disable-next-line */
        view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }
  const tmpDown = new Blob([s2ab(wbout).slice(3)], {
    type: 'application/octet-stream'
  })
  const outFile = document.createElement('a')
  const href = URL.createObjectURL(tmpDown)
  outFile.download = name
  outFile.href = href
  outFile.click()
}
