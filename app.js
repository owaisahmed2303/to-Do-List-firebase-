import {db, collection, addDoc, getDocs, deleteDoc, doc} from "./firebaseConfig.js";

let taskInp = document.querySelector('#todo-inp');
let addBtn = document.querySelector('#btn-add');
let toDoBox = document.querySelector('.todos-box');
let fullLoader = document.querySelector('#full-loader');
let editBtn= document.querySelector('.btn-edit');



// let fetchTask= async(tid)=>{
//     try {
        
//         const getTask = await getDocs(collection(db, "toDos"))
//         getTask.forEach((task) => {
//            if(task.id == tid) {
//                renderTask(tid)
//            };
//         });
//     } 
//     catch (error) {
        
//     }

// }
window.editTask= async(tid)=>{

}
window.deleteTask= async(tid)=>{
     try {
         fullLoader.style.display = "flex";
        await deleteDoc(doc(db,"toDos",tid))
        alert("Successfully Deleted")
        renderTaskAll()
     } catch (error) {
        fullLoader.style.display = "none";
        console.error(error)
     }
}

window.renderTaskAll = async () => {
    try {
        fullLoader.style.display = "flex";
        const getTask = await getDocs(collection(db, "toDos"));
        
        toDoBox.innerHTML = "";

        getTask.forEach((task) => {
            toDoBox.innerHTML += `
               <div class="task-card"> 
                    <span class="task-data">${task.data().text}</span> 
                    <div class="task-buttons">
                        <button class="btn-edit">Edit</button> 
                        <button class="btn-del" onclick="deleteTask('${task.id}')">Delete</button>
                        <button class="btn-done">Done</button>
                    </div>
               </div>`;          
        });
        fullLoader.style.display = "none";
    } catch (error) {
        fullLoader.style.display = "none";
        console.error(error);
    }
}

let renderTask= async(tid)=>{
    try {
        const getTask = await getDocs(collection(db, "toDos"))
        getTask.forEach((task)=>{
            if(task.id == tid) {
              toDoBox.innerHTML +=`
               <div class="task-card"> 
                    <span class="task-data">${task.data().text}</span> 
                    <div class="task-buttons">
                        <button class="btn-edit" click="edit">Edit</button> 
                        <button class="btn-del">Delete</button>
                        <button class="btn-done">Done</button>
                       
                    </div>
               </div>`          
              document.getElementsByClassName('btn-del').addEventListener('click',()=> deleteTask(tid))
               
            }; 
           

        })
        
    } catch (error) {
        console.error(error)
    }

}

let addTask = async()=>{
   try {
    const docToDo = await addDoc(collection(db,"toDos"),{
        isCompleted: false,
        text: taskInp.value
    })

    
    taskInp.value =""
  alert("Document written with ID: "+ docToDo.id);
  renderTask(docToDo.id)

   } catch (error) {
    console.error(error)
   }
}

addBtn.addEventListener('click', addTask);

