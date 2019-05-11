import request from '@/utils/request'

export function getAdminRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function getAdminUserList() {
  return request({
    url: '/admin',
    method: 'get'
  })
}

export function createAdminUser(data) {
  return request({
    url: '/admin',
    method: 'post',
    data
  })
}

export function deleteAdminUser(data) {
  return request({
    url: '/admin/' + data,
    method: 'delete'
  })
}

export function updateAdminUser(data) {
  return request({
    url: '/admin',
    method: 'put',
    data
  })
}


export function queryAdminUserName(data) {
  return request({
    url: '/admin/queryname/' + data,
    method: 'get'
  })
}

export function adminLogin(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}
