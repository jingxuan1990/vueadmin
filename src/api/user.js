import request from '@/utils/request'

export function getUserList(query) {
  return request({
    url: '/users/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function searchUserByName(data) {
  return request({
    url: '/users/search',
    method: 'post',
    data
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/users/' + data,
    method: 'delete',
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

export function checkUniq(data) {
  return request({
    url: '/users/check',
    method: 'post',
    data
  })
}
