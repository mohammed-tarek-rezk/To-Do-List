if(window.localStorage.tasks === undefined || window.localStorage.status === undefined){
    window.localStorage.tasks = '';
    window.localStorage.status = ''
}
let OldTasks = window.localStorage.tasks.split("**|**")
let oldStatus = window.localStorage.status.split("**|**")
let oldData = []
if(OldTasks.length === oldStatus.length && oldStatus.length > 0 && oldStatus[0] !== '')
{
    oldData = function(){
        let ob = []
        for(let i = 0; i < oldStatus.length ; i++){
            ob.push({"task": OldTasks[i] , "status": +oldStatus[i]})
        }
        return ob;
    }
    oldData = oldData()
}


//starting with form submit'
let tasks =  oldData;
let toDo = document.querySelector(".to-do")
let myForm = document.forms[0];
showTasks()

myForm.addEventListener("submit" , function(e){
    e.preventDefault();
    let task = text.value.trim();
    if(task !== '')
    {
        tasks.push({"task": task , "status": 0})
    }
    text.value = ''
    toDo.innerHTML = ''
    showTasks();
    updateLocal()
})

function showTasks(){
    toDo.innerHTML = ''
        for(let i = tasks.length -1; i >= 0 ; i--){
            let element= tasks[i]
        // crating main div
        let mainDiv = document.createElement("div")
        mainDiv.className = "task"
        // creating check box
        let checkboxSpan = document.createElement("span")
        checkboxSpan.className = element.status === 0? "not-checked": "checked"
        checkboxSpan.setAttribute("target", tasks.indexOf(element))
        mainDiv.append(checkboxSpan)
        // crating content
        let taskContent= document.createElement("p")
        taskContent.className = element.status === 0? "not-done-content": "done-content";
        let contentSpan = document.createElement("span")
        contentSpan.className = "test-write";
        contentSpan.append(element.task)
        taskContent.append(contentSpan)
        let imgSpan = document.createElement("span")
        imgSpan.className = "not-done-action"
        let editImg= document.createElement("img")
        editImg.src = "images/edit.png"
        editImg.className = "edit"
        imgSpan.append(editImg)
        let deleteImg = document.createElement("img")
        deleteImg.src = "images/delete.png"
        deleteImg.className = "delete"
        imgSpan.append(deleteImg)
        taskContent.append(imgSpan)
        mainDiv.append(taskContent)
        toDo.append(mainDiv)
        }

  
}

let editImages = document.getElementsByClassName("edit")
for(let i = 0; i < editImages.length ; i++){
    let theEditElement = editImages[i];
    theEditElement.onclick = function(){
        console.log(this.parentElement)
    }
}

document.addEventListener("click",function(e){
    if(e.target.className === "delete"){
        if(e.target.parentElement.className === "not-done-action")
        {
            e.target.parentElement.parentElement.parentElement.remove()
            let index = e.target.parentElement.parentElement.parentElement.firstElementChild.getAttribute("target")
            deleteIndex(index)
            showTasks()
        }else{
            e.target.parentElement.parentElement.parentElement.remove()
            document.querySelector(".cancle-div").style.display = "none"
            let index = e.target.parentElement.parentElement.firstElementChild.getAttribute("target")
            deleteIndex(index)
            showTasks()
        }
        updateLocal()
    }
})

document.addEventListener("click",function(e){
    if(e.target.className === "not-checked"){
        e.target.className = "checked"
        let index = + e.target.getAttribute("target");
        changeStatus(index)
        if(e.target.parentElement.className === "task"){
            e.target.nextElementSibling.className ="done-content"
        }
    }else if(e.target.className === "checked")
    {
        e.target.className = "not-checked"
        let index = + e.target.getAttribute("target");
        changeStatus(index)

        if(e.target.parentElement.className === "task"){
        e.target.nextElementSibling.className ="not-done-content"}
    }
})

document.addEventListener("click", function(e){
    if(e.target.className === "test-write"){
        if(true) {
            index= +e.target.parentElement.parentElement.firstElementChild.getAttribute("target")
            showDetails(index)
        }
    }
})

document.addEventListener("click", function(e){
    if(e.target.className === "edit"){
        if(e.target.parentElement.className === "not-done-action") {
            let index = e.target.parentElement.parentElement.parentElement.firstElementChild.getAttribute("target")
            showEdit(index)
        }else{
            let index = e.target.parentElement.parentElement.firstElementChild.getAttribute("target")
            showEdit(index)
        }
    }
})

document.addEventListener("click",function(e){
    if(e.target.className ==="cancle-div" || e.target.className ==="cancle"){
        document.querySelector(".cancle-div").style.display = "none"
        showTasks()
    }
})
document.addEventListener("click",function(e){
    if(e.target.className ==="done"){
        let index = +e.target.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute("target")
        tasks[index].task = document.getElementsByClassName("updatedContent")[0].textContent;
        document.querySelector(".cancle-div").style.display = "none"
        updateLocal()
        showTasks()
    }
})

function changeStatus(index){
    tasks[index].status = tasks[index].status === 0 ? 1 : 0;
    updateLocal()
}
function deleteIndex(index){
    tasks.splice(index,1)
}

function showDetails(index){
    let clickedDiv = document.createElement("div")
    clickedDiv.className = 'task-clicked'
    //making clicked Control
    let clickPar = document.createElement("p")
    clickPar.className = "clicked-control";
    let clicSpan = document.createElement("span")
    clicSpan.className = 'not-checked';
    clicSpan.setAttribute("target", index)
    clickPar.append(clicSpan)
    let spanImages = document.createElement("span")
    spanImages.className ="clicked-img"
    let images = ["edit", "delete", "cancle"]
    images.forEach((element)=>{
        let img = document.createElement('img')
        img.className = element;
        img.src = `images/${element}.png`
        spanImages.append(img)
    })
    clickPar.append(spanImages)
    clickedDiv.append(clickPar)
    let ContentPara = document.createElement("p")
    ContentPara.style = `padding:15px`
    let conSpan = document.createElement("span")
    conSpan.append(tasks[index].task || "there is no tasks")
    ContentPara.append(conSpan)
    clickedDiv.append(ContentPara)
    toDo.append(clickedDiv)
    document.querySelector(".cancle-div").style.display = "block"
}



function showEdit(index){
    let clickedDiv = document.createElement("div")
    clickedDiv.className = 'task-clicked'
    //making clicked Control
    let clickPar = document.createElement("p")
    clickPar.className = "clicked-control";
    let clicSpan = document.createElement("span")
    clicSpan.setAttribute("target", index)
    clickPar.append(clicSpan)
    let spanImages = document.createElement("span")
    spanImages.className ="clicked-img"
    let images = [ "cancle"]
    images.forEach((element)=>{
        let img = document.createElement('img')
        img.className = element;
        img.src = `images/${element}.png`
        spanImages.append(img)
    })
    clickPar.append(spanImages)
    clickedDiv.append(clickPar)
    let ContentPara = document.createElement("p")
    ContentPara.className ="updatedContent"
    ContentPara.style = `padding:15px`
    ContentPara.classList.add("focus:outline-2", "outline-secondary" ,"transition-all", "duration-100")
    ContentPara.setAttribute("contenteditable",'true')
    let conSpan = document.createElement("span")
    // conSpan.classList.add("text-xl")
    conSpan.append(tasks[index].task || "there is no tasks")
    ContentPara.append(conSpan)
    clickedDiv.append(ContentPara)
    let submitdiv = document.createElement("div");
    let submitBut = document.createElement("span")
    submitdiv.style =`position: sticky; bottom:-10px;background-color: white; padding:5px; text-align:right;`
    submitBut.style= `color: white; background-color: green; display: inline-block; padding:10px 20px; border-radius:10px`
    submitBut.className= "done"
    submitBut.append("done")
    submitdiv.append(submitBut)
    clickedDiv.append(submitdiv)
    toDo.append(clickedDiv)
    document.querySelector(".cancle-div").style.display = "block"
}

//check all
document.getElementsByClassName("check-all")[0].onclick = function(){
    if(tasks.length > 0){
        tasks.forEach(function(el){
            el["status"] = 1
        })
    }
    updateLocal()
    showTasks()
}
document.getElementsByClassName("uncheck-all")[0].onclick = function(){
    if(tasks.length > 0){
        tasks.forEach(function(el){
            el["status"] = 0
        })
    }
    updateLocal()
    showTasks()
}
document.getElementsByClassName("delete-all")[0].onclick = function(){
    tasks=[]
    updateLocal()
    showTasks()
}

//update local storage


function updateLocal() {
    let savedTasks = []
    let savedStatus = []
    for(let i = 0 ; i < tasks.length; i++)
    {
        let ob = tasks[i]
        savedTasks.push(ob.task)
        savedStatus.push(ob.status)
    }
    window.localStorage.status = savedStatus.join("**|**")
    window.localStorage.tasks = savedTasks.join("**|**")
}
