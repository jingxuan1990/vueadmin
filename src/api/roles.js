import request from '@/utils/request'

export function getAllRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: '/roles/' + id,
    method: 'delete'
  })
}

export function getRoleById(id) {
  return request({
    url: '/roles/' + id,
    method: 'get'
  })
}

export function updateRole(data) {
  return request({
    url: '/roles',
    method: 'put',
    data
  })
}

