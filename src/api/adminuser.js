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
