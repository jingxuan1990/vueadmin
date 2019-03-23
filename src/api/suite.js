import request from '@/utils/request'

export function getSuiteList() {
  return request({
    url: '/suite',
    method: 'get'
  })
}

export function addSuite(data) {
  return request({
    url: '/suite',
    method: 'post',
    data
  })
}

export function editSuite(data) {
  return request({
    url: '/suite',
    method: 'put',
    data
  })
}

export function getSuiteById(id) {
  return request({
    url: '/suite/' + id,
    method: 'get'
  })
}

