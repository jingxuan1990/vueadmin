import request from '@/utils/request'

export function updateOrderSetting(data) {
  return request({
    url: '/order_setting',
    method: 'put',
    data
  })
}

export function getOrderSetting(data) {
  return request({
    url: '/order_setting/id/' + data,
    method: 'get'
  })
}
