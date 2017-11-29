// There shoulld be a "display todos" button and a "toggle all" button
// Clicking the "display todos" button should run displayTodos()
// Clicking the "toggle all" button should run toggleAll()

var todoList = {
  todos: [],
  displayTodos: function() {
    if(this.todos.length === 0){
      console.log('Your todo list is empty');
    }
    else {
      console.log('My todos:');
      for(var i = 0; i < this.todos.length; i++){
        if(this.todos[i].completed){
          console.log('(x)', this.todos[i].todoText);
        }
        else{
          console.log('( )', this.todos[i].todoText);
        }
      }
    }
    
    console.log('***');
  },
  addTodo: function(newTodo) {
    this.todos.push({
      todoText: newTodo,
      completed: false
    });
    this.displayTodos();
  },
  deleteTodo: function(pos) {
    debugger;
    this.todos.splice(pos, 1);
    this.displayTodos();
  },
  changeTodo: function(pos, newVal) {
    this.todos[pos].todoText = newVal;
    this.displayTodos();
  },
  toggleCompleted: function(pos) {
    var targetTodo = this.todos[pos];
    targetTodo.completed = !targetTodo.completed;
    this.displayTodos();
  },
  toggleAll: function() {
    
    console.log('toggleAll()');
    
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    for(var i=0; i < totalTodos; i++) {
      if(this.todos[i].completed) {
        completedTodos++;
      }
    }
    
    //case 1: if everything's true, make everything false
    if(completedTodos === totalTodos) {
      for(var i=0; i<totalTodos; i++) {
        this.todos[i].completed = false;
      }
    }
    //case 2: otherwise, make everything true
    else {
      for(var i=0; i<totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
    
    this.displayTodos();
  }
}

var displayButton = document.getElementById('displayButton');
displayButton.addEventListener('click', function(){
  todoList.displayTodos();
})

var toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', function(){
  todoList.toggleAll();
})

todoList.displayTodos();
todoList.addTodo('brush teeth');
todoList.addTodo('feed dog');
todoList.addTodo('lock door');
todoList.changeTodo(1, 'feed cat');
todoList.toggleCompleted(0);
todoList.toggleCompleted(1);
todoList.toggleCompleted(2);
todoList.toggleAll();
todoList.toggleCompleted(0);
todoList.toggleAll();
todoList.deleteTodo(2);


