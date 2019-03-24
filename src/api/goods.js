import request from '@/utils/request'

export function addGoods(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}

export function getAllGoods() {
  return request({
    url: '/goods',
    method: 'get'
  })
}
