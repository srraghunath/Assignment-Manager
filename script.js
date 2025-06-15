const form=document.getElementById("body");
const display=document.getElementById("output");
window.onload=displays;
form.addEventListener("submit",function(event){
    event.preventDefault();// it should not reload
    const sub=form.elements["subject"].value.trim();
    const date=form.elements["date"].value;
    const status=form.elements["status"].value;
    const newassignment={sub,date,status};
    const assignment=JSON.parse(localStorage.getItem("dataa")|| "[]") ;
    if(!Array.isArray(assignment)){
        assignment=[];
        localStorage.setItem("dataa",JSON.stringify([]));
    }
    assignment.push(newassignment);
    localStorage.setItem("dataa",JSON.stringify(assignment));
    form.reset();
    displays();
})
function displays(){
    const data=JSON.parse(localStorage.getItem("dataa"))||[];
    display.innerHTML="";
    if(data.length==0){
        display.innerHTML=`<h4 style="color: greenyellow;">No Assignments Left..</h4>`;
        return;
    }
   data.forEach((item,index) => {
        const sdiv=document.createElement("div");
        sdiv.innerHTML=`<p><strong>Assignment ${index + 1}</strong></p>
          <p><strong>Subject:</strong> ${item.sub}</p>
          <p><strong>Due Date:</strong> ${item.date}</p>
          <p><strong>Status:</strong> ${item.status}</p>`;
        const delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.addEventListener("click", function () {
            if(confirm("Are you sure you want to delete this assignment?")){
                deleteassignment(index);
            }
        });
        sdiv.appendChild(delBtn);
        display.appendChild(sdiv);
    });
    function deleteassignment(index){
        let data=JSON.parse(localStorage.getItem("dataa"))||[];
        data.splice(index,1);
        localStorage.setItem("dataa",JSON.stringify(data));
        displays();
    }
}