const taskInput = document.querySelector(".task-input input");
taskBox = document.querySelector(".task-box");
clearAll = document.querySelector(".clear-btn");

let editId;
let isEditedTask = false;
  //getting localstorage todo list
  let todos = JSON.parse(localStorage.getItem("todo-list"));

  function showTodo(){
      let li = "";
     if(todos){
        todos.forEach((todo, id) => {
            // if todo status is completed set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            // console.log(id, todo); data show in console
            li += `  <li class="task">
                          <label for="${id}">
                              <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                              <p class="${isCompleted}">${todo.name}</p>
                          </label>
                      <div class="settings">
                          <i onclick="showMenu(this)" class="fa fa-ellipsis-h" aria-hidden="true"></i>
                          <ul class="task-menu">
                              <li><i onclick="editTask(${id}, '${todo.name}')" class="fa fa-pencil" aria-hidden="true">Edit</i></li>
                              <li><i onclick="deleteTask(${id})" class="fa fa-trash-o" aria-hidden="true">Delete</i></li>
                          </ul>
                      </div>
              </li>`;
        });
     }
      taskBox.innerHTML = li;
 
  }
showTodo();
//show and hide edit or delete option
function showMenu(selectedTask){
   let taskMenu = selectedTask.parentElement.lastElementChild;
   taskMenu.classList.add("show");
   document.addEventListener("click", e =>{
       //removing show class from the task menu on the document click
       if(e.target.tagName != "I" || e.target != selectedTask ) {
        taskMenu.classList.remove("show");
       }
    });
}

//edit option
function editTask(taskId, taskName){
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
    // console.log(taskId,taskName);
}

//delete option
function deleteTask(deleteId){
    //removing selected task from array/todo
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}

// clearAll
clearAll.addEventListener("click", () =>{
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});
//Mark as done
 function updateStatus(selectedTask){
   //console.log(selectedTask); status update in console
   let taskName = selectedTask.parentElement.lastElementChild;
   //getting paragraph that contains task name
   if(selectedTask.checked){
          taskName.classList.add("checked");
          //updating the status of selected task to complete
          todos[selectedTask.id].status = "completed";
   }
   else{
    taskName.classList.remove("checked");
    //updating the status of selected task to pending
    todos[selectedTask.id].status = "pending";
   }
   localStorage.setItem("todo-list", JSON.stringify(todos));
 }

taskInput.addEventListener("keyup", e=>{
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){ 
        if(!isEditedTask){// if isEditedTask isn't true
            if(!todos){//if todo isn't exist, pass an empty array
                todos = [];
            }
            let taskInfo = {name: userTask, status:"pending"};
            todos.push(taskInfo);//adding new task to todos
        }else{
            isEditedTask = false;
            todos[editId].name = userTask;
        }
      
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}
});