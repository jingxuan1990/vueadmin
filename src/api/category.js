import request from '@/utils/request'

export function getCategoryList() {
  return request({
    url: '/category',
    method: 'get'
  })
}

export function getById(id) {
  return request({
    url: '/category/' + id,
    method: 'get'
  })
}

export function updateCategory(data) {
  return request({
    url: '/category',
    method: 'put',
    data
  })
}

export function deleteCategory(id) {
  return request({
    url: '/category/' + id,
    method: 'delete'
  })
}

export function addCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}
