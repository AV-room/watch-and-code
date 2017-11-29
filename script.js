// V8: ADDING INTERFACE ELEMENTS FOR ALL METHODS
// It should have working controls for addTodo()
// It should have working controls for changeTodo()
// It should have working controls for deleteTodo()
// It should have working controls for toggleCompleted()

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


/*var displayButton = document.getElementById('displayButton');
displayButton.addEventListener('click', function(){
  todoList.displayTodos();
})

var toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', function(){
  todoList.toggleAll();
})*/


// reorganise handler functions into a single object
// groups all UI-related code in one place
var handlers = {
    displayTodos: function() {
        todoList.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
    },
    addTodo: function() {
        todoList.addTodo(document.getElementById('addText').value);
    },
    changeTodo: function() {
        todoList.changeTodo(document.getElementById('changePos').valueAsNumber, 
                            document.getElementById('changeText').value);
    },
    deleteTodo: function() {
        todoList.deleteTodo(document.getElementById('deletePos').valueAsNumber);
    },
    toggleCompleted: function() {
        todoList.toggleCompleted(document.getElementById('toggleCompletedPos').valueAsNumber)
    }
};

todoList.displayTodos();
todoList.addTodo('brush teeth');
todoList.addTodo('feed dog');
todoList.addTodo('lock door');


