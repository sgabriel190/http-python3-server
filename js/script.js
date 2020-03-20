function getCurrentInfo() {
    var current_date = new Date();
    var date_time = "Data:" + current_date.getDate() + "-" +
        (current_date.getMonth() + 1) + "-" +
        current_date.getFullYear() + "<br /> Ora:" +
        current_date.getHours() + ":" +
        current_date.getMinutes() + ":" +
        current_date.getSeconds();
    var current_url = "<br /> Link URL: " + window.location.href;
    document.getElementById("section1").innerHTML = document.getElementById("section1").innerHTML + date_time + current_url;
}