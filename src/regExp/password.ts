// 强密码正则,必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-20之间
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/