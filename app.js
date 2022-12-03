Names = $("#ipname")
job = $("#ipjob")
salary = $("#ipsalary")
let arr = [];


getarr();

$('th').on('click',function(){
    var column = $(this).data('column')
    var order = $(this).data('order')
    if(column=='salary'){
        if(order=='desc'){
            $(this).data('order',"asc")
            arr.sort((a,b)=> (a[column])>(b[column])?1:-1)
        }
        else{
            $(this).data('order',"desc");
            arr.sort((a,b)=> (a[column])<(b[column])?1:-1)
        }    
    }
    if(order=='desc'){
        $(this).data('order',"asc")
        arr.sort((a,b)=> (a[column])>(b[column])?1:-1)
    }
    else{
        $(this).data('order',"desc");
        arr.sort((a,b)=> (a[column])<(b[column])?1:-1)
    }
    display(arr)
})


Object.prototype.vishal= function(x){
    
}
$("#buttons").click(async()=>{
   if($("#buttons").html()=="search"){

        let searching_name = Names.val()
        let searching_job = job.val()
        let searching_salary = salary.val()

        let searchingobj = {Name : searching_name , job : searching_job , salary:searching_salary }
        console.log(searchingobj);
        let flag = false;
        let newarr = []

        for(let i=0;i<arr.length;i++){
            let obj1 = {Name:arr[i].Name, job : arr[i].job , salary: arr[i].salary}
            if(JSON.stringify(obj1)==JSON.stringify(searchingobj)){
                console.log("Naman");
                newarr.push(searchingobj);
                display(newarr)
                flag = true;
                $("#buttons").html("reset")
            }
            
        }
        if(!flag){
            alert("No Element Found")
                
        }
    }
    else{

        console.log("qwertyuiwertyu")
        display(arr)
        $("#buttons").html("Search")     
    }
    clear()
})

//function(data)
    
async function getarr(){
    var request = $.ajax({
        url: "http://localhost:3000/Employee",
        method: "GET",
        });

        request.done(function(msg) { 
        arr = [...msg]

        //for just checking for Asynchronous thing
        console.log("i am here at getarr");

        display(arr)
        console.log(arr)
        });

        request.fail(function(textStatus) {
        alert( "Request failed: " + textStatus );
        });

        //for just checking for Asynchronous thing

        console.log("i am second call");

}

$("#button").click(async()=>{
    if(Names.val().length==0 || job.val().length==0 || salary.val().length==0){
        alert("Enter all the fields")
    }
    else if($("#button").html() =='add'){
        let object = {Name:$("#ipname").val(),job:$("#ipjob").val(),salary:$("#ipsalary").val()} 
        console.log(object);  

        var request = $.ajax({
        url: "http://localhost:3000/Employee",
        method: "POST",
        data:object
        });

        request.done(function(msg) { 
        console.log(msg)
        });

        request.fail(function(textStatus) {
        alert( "Request failed: " + textStatus );
        });

        getarr()
        clear()
    }
    else{
        //ye tab execute hoga jb button ki html --> update hogi
        uptodate(selectedid)
        clear()
    }
})

function clear(){
    $("#ipname").val('')
    $("#ipjob").val('')
    $("#ipsalary").val('')
}

async function remove(val){
    var request = $.ajax({
        url: `http://localhost:3000/Employee/${val}`,
        method: "DELETE",
        });

        request.done(function(msg) { 
            getarr()
        });

        request.fail(function(textStatus) {
        alert( "Request failed: " + textStatus );
        });
    }

let selectedid
function update(val){
    $("#button").html('update')
    let obj = arr.find(element=>element.id==val);
    selectedid = val
    Names.val(obj.Name)
    job.val(obj.job) 
    salary.val(obj.salary)
}

async function uptodate(val){
    let object = {id:val,Name:Names.val(),job:job.val(),salary:salary.val()}
    console.log(object);

    var request = $.ajax({
        url: `http://localhost:3000/Employee/${val}`,
        method: "PUT",
        data:object,
        });
        
        request.done(function(msg) { 
            getarr()
            console.log(request);
        console.log(msg)
        });

        request.fail(function(textStatus) {
        alert( "Request failed: " + textStatus );
        });

        
        $("#button").html('add')
        clear()
}



function display(arr){
    $("#tablebody").html(arr.map(ele => {
        return `<tr><td> ${ele.Name} </td>
        <td> ${ele.job} </td>
        <td> ${ele.salary} </td>
        <td> <button  class = "btn btn-danger" onclick = "remove(${ele.id})"> Delete <i class="fa-solid fa-trash"></i> </button> <button class = "btn btn-success" onclick ="update(${ele.id})" id = "update">Update <i class="fa-solid fa-user-pen"></i></button> 
        </tr>`
} ).join(" "))
}

