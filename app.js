import {db, collection, addDoc, getDocs, deleteDoc,updateDoc, doc} from "./firebaseConfig.js";

let taskInp = document.querySelector('#todo-inp');
let addBtn = document.querySelector('#btn-add');
let updateBtn =document.querySelector('#btn-update')
let btnShow = document.querySelector('#btn-show');
let toDoBox = document.querySelector('.todos-box');
let fullLoader = document.querySelector('#full-loader');

// let editBtn= document.querySelector('.btn-edit');

let todos=[];

let editTask = (tasktext, taskid, btnEdit, checkbox) => {
    taskInp.value = tasktext.innerText;
    tasktext.style.color = "green";

    btnEdit.style.display = "none";
    checkbox.style.display = "none";
    addBtn.style.display = "none";
    updateBtn.style.display = "flex";

  
    updateBtn.addEventListener('click',()=> updateTask(taskid));
}

let updateTask = async (tid) => {
    try {
        if (taskInp.value.trim() == "") return;

        fullLoader.style.display = "flex";
        await updateDoc(doc(db, "toDos", tid), {
            text: taskInp.value
        });

        taskInp.value = "";
        updateBtn.style.display = "none";
        addBtn.style.display = "flex";

        await renderTaskAll();  
    } catch (error) {
        fullLoader.style.display = "none";
        console.error(error);
    }
}



let deleteTask= async(tid)=>{
     try {
         fullLoader.style.display = "flex";
        await deleteDoc(doc(db,"toDos",tid))
        alert("Successfully Deleted")
        renderTaskAll()
        fullLoader.style.display = "none";
     } catch (error) {
        fullLoader.style.display = "none";
        console.error(error)
     }
}


let renderTaskAll = async() => {
    try {
        
        fullLoader.style.display = "flex";
         const getTask = await getDocs(collection(db, "toDos"));
   
       toDoBox.innerHTML = "";
           
       getTask.forEach((task) => {
           let taskcard = document.createElement("div");
           taskcard.className = "task-card";
           taskcard.innerHTML = `
               <input type="checkbox" class="check" >
               <span class="task-text">${task.data().text}</span>
               <div class="task-buttons">
                   <button class="btn-edit">Edit</button>
                   <button class="btn-del">Delete</button>
               </div>`;

               let btnDel = taskcard.querySelector('.btn-del');
               let btnEdit = taskcard.querySelector('.btn-edit')
               let checkBox = taskcard.querySelector('.check');
               let taskText = taskcard.querySelector('.task-text');
           checkBox .addEventListener('change', () => changeStatus(taskText, checkBox.checked,task.id,btnEdit,checkBox ));
           btnEdit.addEventListener('click', () => editTask(taskText,task.id, btnEdit,checkBox));
            btnDel.addEventListener('click', () => deleteTask(task.id));
   

             if(task.data().isCompleted === true){
                 checkBox.checked = true;
                 taskText.style.textDecoration = "line-through";  
                 btnEdit.style.display='none';
                 checkBox.style.display='none' }

           toDoBox.appendChild(taskcard);

       });
         fullLoader.style.display = "none";

    } catch (error) {
       fullLoader.style.display = "none";
       console.error(error)

    }
}



// let fetchTask= async(taskText,status, taskid,btnEdit,checkbox)=>{
//    const getTask = await getDocs(collection(db, "toDos"));

//    getTask.forEach((task)=>{
//        if(task.data.isCompleted === true){
//          taskText.style.textDecoration = "line-through";  
//          btnEdit.style.display='none';
//          checkbox.style.display='none'
//        }
//    })
// }


let changeStatus= async(taskText,status, taskid,btnEdit,checkbox)=>{
try {
    taskText.style.textDecoration = "line-through";  
    btnEdit.style.display='none';
    // btnDel.style.display='none';
    checkbox.style.display='none'
    await updateDoc(doc(db, "toDos", taskid), {
    isCompleted: status});
    
} catch (error) {
    console.error(error)
}
}


let addTask = async()=>{
   try {
      fullLoader.style.display = "flex";
    const docToDo = await addDoc(collection(db,"toDos"),{
        isCompleted: false,
        text: taskInp.value
    })
  fullLoader.style.display = "none";
     todos.push({
          id:docToDo.id,
          isCompleted: false,
          text: taskInp.value
     })  

    taskInp.value =""
  alert("Document written with ID: "+ docToDo.id);
//   renderTask(docToDo.id)
    renderTaskAll()

   } catch (error) {
      fullLoader.style.display = "none";
    console.error(error)
   }
}

addBtn.addEventListener('click', addTask);

btnShow.addEventListener('click', renderTaskAll);