<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="待办事项" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"/>
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"/>
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'
import { getList, createTodo, deleteTodo, updateTodo, finishTodo } from '@/api/todo'

const STORAGE_KEY = 'todos'
const filters = {
  所有: todos => todos,
  未完成: todos => todos.filter(todo => !todo.done),
  已完成: todos => todos.filter(todo => todo.done)
}
const defaultList = []
export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      visibility: '所有',
      filters,
      todos: defaultList
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  created() {
    getList().then(result => {
      const retArray = result.data
      const tempTodo = []
      for (const ret of retArray) {
        tempTodo.push({
          text: ret.content,
          done: (ret.status === 1),
          id: ret['id']
        })
      }
      this.todos = tempTodo
    })
  },
  methods: {
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(e) {
      const text = e.target.value
      const tempTodo = {
        'content': text
      }
      createTodo(tempTodo).then(result => {
        if (result.data['affectedRows'] >= 1) {
          if (text.trim()) {
            this.todos.push({
              text,
              done: false
            })
            this.setLocalStorage()
          }
          e.target.value = ''
        }
      })
    },
    toggleTodo(val) {
      console.log('val=' + JSON.stringify(val))
      finishTodo(val).then(result => {
        if (result.data['affectedRows'] >= 1) {
          val.done = !val.done
          this.setLocalStorage()
        }
      })
    },
    deleteTodo(todo) {
      deleteTodo(todo.id).then(result => {
        if (result.data['affectedRows'] >= 1) {
          this.todos.splice(this.todos.indexOf(todo), 1)
          this.setLocalStorage()
        }
      })
    },
    editTodo({ todo, value }) {
      const tempTodo = Object.assign({}, todo)
      tempTodo['text'] = value
      updateTodo(tempTodo).then(result => {
        if (result.data['affectedRows'] >= 1) {
          todo.text = value
          this.setLocalStorage()
        }
      })
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorage()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        finishTodo(todo).then(result => {
          if (result.data['affectedRows'] >= 1) {
            todo.done = done
            this.setLocalStorage()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
