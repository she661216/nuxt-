/*手机号*/
export const regPhone = phone => /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)
/*邮箱*/
export const regEmail = email => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)
/*密码*/
export const regPass = password => /^[a-zA-Z_0-9]{6,20}$/.test(password)
/*数字*/
export const regNumber = password => /^[0-9]{6,20}$/.test(password)

// /*长度*/
// export function regArea (str, min = 0, max = 1.7976931348623157E+10308) {
//   let reg = new RegExp(`^\.{${min},${max}}$`, 'gim')
//   console.log(reg)
//   return reg.test(str)
// }

/* 大写字母*/
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
