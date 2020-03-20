function getCurrentInfo() {
    var current_date = new Date();
    var navigator_version = navigator.appVersion;
    var browser_name = navigator.appCodeName;

    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

    var date_time = "Data:" + current_date.getDate() + "-" +
        (current_date.getMonth() + 1) + "-" +
        current_date.getFullYear() + "<br /><br /> Ora:" +
        current_date.getHours() + ":" +
        current_date.getMinutes() + ":" +
        current_date.getSeconds();

    var current_url = "<br /><br /> Link URL: " + window.location.href;
    document.getElementById("section1").innerHTML += date_time + current_url;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    document.getElementById("section1").innerHTML += "<br /><br /> Numele browser-ului:" + browser_name +
        "<br /><br /> Versiunea browser-ului:" + navigator_version +
        "<br /><br /> Sistem de operare:" + OSName;
}

function showPosition(position) {
    document.getElementById("section1").innerHTML += "<br /><br /><u>Location</u>" + "<br/><br /> Latitude: " + position.coords.latitude +
        "<br /><br /> Longitude: " + position.coords.longitude;
}