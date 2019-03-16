import request from '@/utils/request'

export function getSuiteList() {
  return request({
    url: '/suite',
    method: 'get'
  })
}
