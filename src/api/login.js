import axios1 from "@/utils/request";

export function getLoginByPhone(phone,pwd){
  return axios1({
    method:'get',
    url: `/login/cellphone?phone=${phone}&password=${pwd}`
  })
}
export function getLoginUser(){
  return axios1({
    method:'get',
    url:'/user/account'
  })
}
export function getLoginStatus() {
  return axios1({
    method: 'get',
    url: '/login/status'
  })
}