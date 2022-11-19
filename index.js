window.onload = currenttime;

function currenttime() {
    //date formatting	
    let current_datetime = new Date();
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear();
    document.getElementById("currentime").innerHTML = "Today is: " + formatted_date;
    
}