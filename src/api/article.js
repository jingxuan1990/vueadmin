import request from '@/utils/request'

export function getUserList(query) {
  return request({
    url: '/users/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function getUser(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: {id}
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/users',
    method: 'put',
    data
  })
}
