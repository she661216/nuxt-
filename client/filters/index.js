import dayjs from 'dayjs'

export const formatDate = (value, type = 'YYYY/MM/DD HH:mm:ss') => {
  // HH:mm:ss
  return value ? dayjs(value).format(type) : '--'
}
export const sliceStr = (str, length = 10) => {
  return str ? str.length > length ? str.slice(1, length) + '...' : str : '--'
}
export const htmlDecode = htmlStr => {
  return htmlStr
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "");
};
export default {
  formatDate,
  sliceStr,
  htmlDecode
}
