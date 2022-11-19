window.onload = currenttime;

function currenttime() {
    //date formatting	
    let current_datetime = new Date();
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear();
    document.getElementById("currentime").innerHTML = "Today is: " + formatted_date;
    loaddata();
}

let xhr = new XMLHttpRequest();
let datastore;
xhr.open("GET", "rentalclients.json", true);
function loaddata() {
    //event listener
    document.getElementById("lastname").onkeyup = function () { searchlastname(this.value); }, false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            datastore = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}
function searchlastname(lastname) {

    if (lastname != "") {
        //Structure table to display on screen
        let fullname = "";
        let searchinformation;
        for (let i = 0; i < datastore.length; i++) {
            let obj = datastore[i];
            searchinformation = obj.last_name.toUpperCase() + "<br>";
            if (searchinformation.startsWith(lastname.toUpperCase())) {
                fullname += "<option>";
                fullname += obj.first_name + " ";
                fullname += obj.last_name + "<br>";
                fullname += "</option>";
            }
        }
        document.getElementById("displaylastname").innerHTML = fullname;
    } else {
        document.getElementById("displaylastname").innerHTML = "";
    }
}
let name = "";
let selectedName = "";
let fname = "";
let lname = "";
let address = "";
let province = "";
let email = "";
let phone = "";
function controlform() {
    editablefileds();
    let x = document.getElementById("displaylastname").value;
    for (let i = 0; i < datastore.length; i++) {
        let obj = datastore[i];
        name = obj.first_name + " " + obj.last_name;
        if (name.localeCompare(x) == 0) {
            fname = obj.first_name;
            lname = obj.last_name;
            selectedName = fname + " " +lname;
            address = obj.address;
            province = obj.state_prov;
            email = obj.email;
            phone = obj.phone;
        }
        document.getElementById("firstname").value = fname;
        document.getElementById("lname").value = lname;
        document.getElementById("address").value = address;
        document.getElementById("province").value = province;
        document.getElementById("email").value = email;
        document.getElementById("phonenumber").value = phone;
    }
}

function editablefileds() {
    document.getElementById("compact").disabled = false;
    document.getElementById("mid-size").disabled = false;
    document.getElementById("luxury").disabled = false;
    document.getElementById("van-truck").disabled = false;
    document.getElementById("option1").disabled = false;
    document.getElementById("option2").disabled = false;
    document.getElementById("option3").disabled = false;
    document.getElementById("dayofrent").disabled = false;
}
function calculaterentfee() {

    // variables
    let userchoice;
    let numerOfDays = 0;
    let rentcost = 0;
    let toppingcost1 = 0;
    let toppingcost2 = 0;
    let toppingcost3 = 0;
    let topping = "";
    let totalCost =0;
   
    let clientinformation = "<tr><th></th><th></th></tr>";
    let rentalinformation = "";
    const compact = 15;
    const mid_size = 20;
    const luxury = 35;
    const van_truck = 40;

    userchoice = document.querySelector('input[name = rentalChoice]:checked').value;
    numerOfDays = document.getElementById("dayofrent").value;
    if (userchoice == "compact") {
        rentcost = numerOfDays * compact; 
        rentalinformation += "Compact Car with rent price is $15/day";    
    }
    if (userchoice == "mid-size") {
        rentcost = numerOfDays * mid_size;    
        rentalinformation += "Mid-Size Car with rent price is $20/day";    
    }
    if (userchoice == "luxury") {
        rentcost = numerOfDays * luxury;  
        rentalinformation += "Luxury Car with rent price is $35/day";         
    }
    if (userchoice == "van-truck") {
        rentcost = numerOfDays * van_truck; 
        rentalinformation += "Van/Truck Car with rent price is $40/day";         
    }
    if (document.getElementById("option1").checked) {
        toppingcost1  = (document.getElementById("option1").value) * numerOfDays;
        if(toppingcost1>0){
            topping += "Roof Rack or Bicycle Rack extra $5/day" + "<br>";
        }         
    }
    if (document.getElementById("option2").checked) {
        toppingcost2 = parseFloat( document.getElementById("option2").value);
        if(toppingcost2 > 0) {
            topping += "GPS extra $10" +"<br>";
        }   
    }
    if (document.getElementById("option3").checked) {
        toppingcost3 = (document.getElementById("option3").value) * numerOfDays;
        if(toppingcost3 ==0){
            topping += "Child Seat free";
        }   
    }
    totalCost = rentcost + toppingcost1 +  toppingcost3 + toppingcost2;
     
    clientinformation += "<tr><td>";
    clientinformation += "Full Name ";
    clientinformation += "</td><td>";
    clientinformation += selectedName;
    clientinformation +="</td></tr>";
    clientinformation += "<tr><td>";
    clientinformation += "Address ";
    clientinformation += "</td><td>";
    clientinformation += address;
    clientinformation +="</td></tr>";
    clientinformation += "<tr><td>";
    clientinformation += "Email ";
    clientinformation += "</td><td>";
    clientinformation += email;
    clientinformation +="</td></tr>";
    clientinformation += "<tr><td>";
    clientinformation += "Phone ";
    clientinformation += "</td><td>";
    clientinformation += phone;
    clientinformation +="</td></tr>";
    document.getElementById("main").style.display = "none";
    document.getElementById("format").style.display = "block";
    document.getElementById("title").innerHTML = "CLIENT INFORMATION";
    document.getElementById("titlerental").innerHTML = "RENTAL INFORMATION";
    document.getElementById("option").innerHTML = "ADDING OPTIONAL";
    document.getElementById("rentalinformation").innerHTML = "<tr><td>Type of Car</td><td>"+ rentalinformation + "</td></tr>";
    document.getElementById("result").innerHTML = clientinformation;
    document.getElementById("topping").innerHTML = "<tr><td>Adding Optional</td><td>"+ topping + "</td></tr>";
    document.getElementById("total").innerHTML = "<tr><th>Total Cost</th><th>"+ "$" + totalCost.toFixed(2) + "</th></tr>";
    

}

function reset(){
    document.getElementById("main").style.display = "block";
    document.getElementById("hiddenreset").style.display = "none";
    document.getElementById("format").style.display = "none";
}

function exit(){
     window.location.href='index.html';
}
