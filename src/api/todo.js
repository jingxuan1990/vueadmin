import request from '@/utils/request'

export function getList() {
  return request({
    url: '/todo/list',
    method: 'get'
  })
}

export function createTodo(data) {
  return request({
    url: '/todo',
    method: 'post',
    data
  })
}

export function deleteTodo(id) {
  return request({
    url: '/todo/' + id,
    method: 'delete'
  })
}

export function updateTodo(data) {
  return request({
    url: '/todo',
    method: 'put',
    data
  })
}

export function finishTodo(data) {
  return request({
    url: '/todo/status',
    method: 'put',
    data
  })
}
