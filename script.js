// V9: ESCAPE FROM THE CONSOLE (DOM MANIPULATION)
// There should be an li element for every todo
// Each li element should contain todoText
// Each li element should show completed indicator

//now only contains todo list data and methods to change that data
var todoList = {
  todos: [{
          todoText: 'brush hair',
          completed: false
      }, 
      {
          todoText: 'eat waffles',
          completed: false
      },
      {
          todoText: 'feed giraffe',
          completed: false
      }],
  addTodo: function(newTodo) {
    this.todos.push({
      todoText: newTodo,
      completed: false
    });
  },
  deleteTodo: function(pos) {
    this.todos.splice(pos, 1);
  },
  changeTodo: function(pos, newVal) {
    this.todos[pos].todoText = newVal;
  },
  toggleCompleted: function(pos) {
    var targetTodo = this.todos[pos];
    targetTodo.completed = !targetTodo.completed;
  },
  toggleAll: function() {
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
    
  }
}

// reorganise handler functions into a single object
// only contains code handling user interactions 
var handlers = {
    displayTodos: function() {
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },
    addTodo: function() {
        var addTodoInput = document.getElementById('addText');
        
        todoList.addTodo(addTodoInput.value);
        
        addTodoInput.value = '';
        
        view.displayTodos();
    },
    changeTodo: function() {
        var changePosInput = document.getElementById('changePos');
        var changeTextInput = document.getElementById('changeText');
        
        todoList.changeTodo(changePosInput.valueAsNumber, changeTextInput.value);
        
        changePosInput.value = '';
        changeTextInput.value = '';
        
        view.displayTodos();
    },
    deleteTodo: function() {
        var deletePosInput = document.getElementById('deletePos');
        
        todoList.deleteTodo(deletePosInput.valueAsNumber);
        
        deletePosInput.value = '';
        
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedPosInput = document.getElementById('toggleCompletedPos');
        
        todoList.toggleCompleted(toggleCompletedPosInput.valueAsNumber);
        
        toggleCompletedPosInput.value = '';
        
        view.displayTodos();
    }
};

// only shows people what todo list looks like
var view = {
  displayTodos: function() {
    
    //select ul element and reset to empty
    var ulElement = document.querySelector('ul');
    ulElement.innerHTML = '';
      
    //create an li element for each item in todo list and append to ul element
    for(var i=0; i<todoList.todos.length; i++) {
        var liElement = document.createElement('li');
        var currentTodo = todoList.todos[i]; 
        liElement.textContent = createCompletedSymbol(currentTodo.completed) + ' ' + currentTodo.todoText;
        ulElement.appendChild(liElement);
    }
      
  }  
};

function createCompletedSymbol(completed) {
    return completed ? '(x)' : '( )';
}
