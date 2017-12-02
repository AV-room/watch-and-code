// V11: DESTROY ALL FOR LOOPS
// todoList.toggleAll() should use forEach
// view.displayTodos should use forEach

//now only contains todo list data and methods to change that data
var todoList = {
  todos: [],
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
    
    this.todos.forEach(function(todo){
        if(todo.completed) {
            completedTodos++;
        } 
    });
      
    this.todos.forEach(function(todo){
        //case 1: if everything's true, make everything false
        if(completedTodos === totalTodos){
            todo.completed = false;
        } 
        //case 2: otherwise, make everything true
        else {
            todo.completed = true;
        }
    });
    
  }
}

// reorganise handler functions into a single object
// only contains code handling user interactions 
var handlers = {
    displayTodos: function() {
        view.displayTodos();
    },
    addTodo: function() {
        var addTodoInput = document.getElementById('addText');
        
        todoList.addTodo(addTodoInput.value);
        
        addTodoInput.value = '';
        
        view.displayTodos();
    },
    deleteTodo: function(pos) {
        todoList.deleteTodo(pos);
       
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
    toggleCompleted: function(pos) {
        todoList.toggleCompleted(pos);
        
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
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
    todoList.todos.forEach(function(todo, i){
        
        //console.log('inside forEach...this = ' + this);
        
        //create and configure li element
        var liElement = document.createElement('li');
        liElement.id = i;
        liElement.textContent = createCompletedSymbol(todo.completed) + ' ' + todo.todoText;
        
        //append buttons
        liElement.appendChild(this.createToggleCompletedButton());
        liElement.appendChild(this.createDeleteButton());
        
        //add the li to the parent ul element
        ulElement.appendChild(liElement);
        
    }, this); //don't forget to pass outside reference to 'this' in with the callback function!
      
  },
  createDeleteButton: function() {
    //create button element 
    var deleteButton = document.createElement('button');
    
    //assign button text content + classname
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
      
    return deleteButton;
  },
  createToggleCompletedButton: function() {
    var toggleCompletedButton = document.createElement('button');
    toggleCompletedButton.textContent = 'Toggle Completed';
    toggleCompletedButton.className = 'toggleCompletedButton';
    return toggleCompletedButton;
  },
  setUpEventListeners: function() {
    
    //add click event listener to ul
    var ulElement = document.querySelector('ul'); //this is ok because we only have one ul on the page
    
    //check to see if element that was clicked was a delete button
    //if so, get the id of the associated li element
    //and delete that item from the todoList and update the DOM
    ulElement.addEventListener('click', function(e) {
        var elementClicked = e.target;
        
        if(elementClicked.className === 'deleteButton'){
            handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
        
        if(elementClicked.className === 'toggleCompletedButton'){
            handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
        }
    })
  }
};

// helper function
function createCompletedSymbol(completed) {
    return completed ? '(x)' : '( )';
}


view.setUpEventListeners();


/*var testUl = document.getElementById('testUl');
console.log(testUl);
testUl.addEventListener('click', function(e){
   console.log('clicked on ' + e.target + ' id: ' + e.target.id); 
});*/
