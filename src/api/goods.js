import request from '@/utils/request'

export function addGoods(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}
