

const hamburgerBtn = document.querySelector('.todoMenu')
const todoMain  = document.querySelector('.todoMain')
const todoMainUL =document.querySelector('.todoMain ul')
const inputTask = document.querySelector('.todoFoot input')
const addbtn = document.querySelector('.addBtn')
const task = document.querySelector('.task-name')
const todoOptions = document.querySelector('.todoOptions')
//console.log(todoMainUL)


//Events
hamburgerBtn.addEventListener("click",toggleMenu)
todoMainUL.addEventListener("click",checkDelete)
addbtn.addEventListener("click",addTask)
inputTask.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let newTask = inputTask.value.trim();
        if(newTask != ""){
        document.getElementById("myForm").submit();
        }
    }
});


//FUCNTIONS
//svgVisibility()
function addTask(event)
{   
    event.preventDefault();
    console.log(inputTask.value);
    let newTask = inputTask.value.trim();
    if(newTask != ""){
       // let todohtml = `<li><div class="checkbox"></div><p class="task-name">${newTask}</p><i class="fa fa-trash"></i></li>`
       // todoMainUL.insertAdjacentHTML("afterbegin",todohtml);
        document.getElementById("myForm").submit();
        //svgVisibility()
        inputTask.value = ""
    }  
}

function checkDelete(event)
{
  var item = event.target;
  if(item.classList[0] == 'checkbox')
  {
    //WITHOUT SEVER CODE
    //getting the parent element 
    //then  accessing the child elements using the node
    // let parent = item.parentNode
    // let task = parent.childNodes[1]
    //toggle the class for the list and task
    // item.classList.toggle('checked')
    // task.classList.toggle('done')

    //SENDING DATA TO SERVER 
    //JSON FORMAT LINK
    let link = "/todo/checktask"
    fetch_Delete_Check_task(link,item)
  }
  if(item.classList[1] ==  'fa-trash')
  {
    //sending the Json text to the server
    //link to the sever
    let link = "/todo/deletetask"
    fetch_Delete_Check_task(link,item)
  }
}

function svgVisibility()
{  
    let todoSvg =  document.querySelector('.todoSvg')
    if(todoMainUL.childElementCount == 0)
    {
        //display SVG and Blocks UL
        todoSvg.style.display = ''
        todoMainUL.style.display = 'none'
    }
    else
    {  
       //display UL and Block SVG
       todoSvg.style.display = "none";
       todoMainUL.style.display = ''
    }
}

function fetch_Delete_Check_task(link,item)
{
    let parent = item.parentNode
    //parent.remove()
    

    const newData = {task: [parent.textContent.trim()]}
    var options = {  
    method:'POST',
        body: JSON.stringify(newData),
        headers: {
            'Content-Type': 'application/json',
        }
    };
  fetch(link, options)
  .then(response => {
      console.log("DONE")
      location.reload(true)
  })
  .catch(err =>console.log(err));
}

function toggleMenu() {
    console.log(todoOptions)
    todoOptions.classList.toggle('todoOptionsFade') 
    document.querySelector('.todoFoot').classList.toggle('todoFootNone') 
}