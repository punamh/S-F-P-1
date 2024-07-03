let url = "https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10";

let container=document.getElementById("container");
function displayData(arr){
    container.innerHTML="";
 arr.forEach((ele)=>{
    let data = document.createElement("div");

    let userId = document.createElement("h2")
    userId.innerText = ele.userId;

    let id= document.createElement("h3")
    id.innerText = ele.id;

    let title = document.createElement("h3")
    title.innerText = ele.title;

    let completed = document.createElement("h3")
    completed.innerText = ele.completed;

    data.append(userId,id,title,completed)
    container.append(data)

 })

}

async function todos(url,queryparems=""){
    try {
        let res = await fetch(`${url}${queryparems}`)
        pages(res.headers.get("X-Total-count"),10,queryparems)
        let data = await res.json();
        console.log(data);
        displayData(data)
    }
     catch (error) {
        console.log(error)
    }
}
todos(url)

let pagination = document.getElementById("pagination")
function pages(total,limit,queryparems){
 pagination.innerHTML="";
 let num = Math.ceil(total/limit);
for(let i=1;i<=num;i++){
    let btn = document.createElement("button")
    btn.innerText=i;
    btn.addEventListener("click",function(){
        todos(`https://jsonplaceholder.typicode.com/todos
?_page=${i}_limit=10`,queryparems)
    })
    pagination.append(btn);
}
}
pages();
