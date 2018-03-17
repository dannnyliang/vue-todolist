var app = new Vue({
  el: '#app',
  data: {
    todos: [],
    todoInput: '',
    filter: 'show_all',
    temp: ''
  },

  computed: {
    getTodos: function () {  
      if (this.filter === 'show_all') {
        return this.todos
      } else if (this.filter === 'show_completed') {
        return this.todosFilter(true);
      } else { //show_incomplete
        return this.todosFilter(false);
      }
    },

    showClear: function () {
      return this.todos.some(todo => todo.isCompleted == true) ? '' : 'disabled'
    },

    showComplete: function () {
      return this.todos.some(todo => todo.isCompleted == false) ? '' : 'disabled'
    }
  },

  methods:{
    addTodo: function (todo) {
      if (this.todoInput.replace(/(^\s*)|(\s*$)/g, "").length == 0) { return }
      this.todos.push({
        content: todo,
        isCompleted: false,
        isEdit: false
      })
      this.todoInput = ''
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    completeAll: function () {
      this.todos.forEach(todo => todo.isCompleted = true)
    },

    completeClear: function () {  
      this.todos = this.todos.filter(todo => !todo.isCompleted)
    },

    editTodo: function (todo) {
      this.temp = todo.content
      todo.isEdit = true
    },

    editCancel: function (todo) {  
      todo.content = this.temp
      todo.isEdit = false
    },

    setFilter: function (filter) {  
      this.filter = filter
    },

    todosFilter: function (isCompleted) {  
      return this.todos.filter(todo => todo.isCompleted === isCompleted)
    }
  }
})