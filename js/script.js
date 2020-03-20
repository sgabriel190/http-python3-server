let isDrawing = false;
let x = 0;
let y = 0;

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = document.getElementById("color").value;
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function initCanvas() {
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');


    // The x and y offset of the canvas from the edge of the page
    var rect = canvas.getBoundingClientRect();

    // Add the event listeners for mousedown, mousemove, and mouseup
    canvas.addEventListener('mousedown', e => {
        rect = canvas.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top + 2;
        isDrawing = true;
    });

    canvas.addEventListener("dblclick", e => {
        var current_x = e.clientX - rect.left;
        var current_y = e.clientY - rect.top + 2;
        context.fillStyle = document.getElementById("color").value;
        context.fillRect(current_x, current_y, 200, 100);
    })

    canvas.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            var current_x = e.clientX - rect.left;
            var current_y = e.clientY - rect.top + 2;
            console.log(x + " " + y + " " + rect.left + " " + rect.top + " " + e.clientX + " " + e.clientY);
            drawLine(context, x, y, current_x, current_y);
            x = current_x;
            y = current_y;
        }
    });

    window.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            var current_x = e.clientX - rect.left;
            var current_y = e.clientY - rect.top + 2;
            drawLine(context, x, y, current_x, current_y);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });
}

function getCurrentTime() {
    var d = new Date();
    document.getElementById("time").innerHTML = "<br /><br /> Ora:" + d.toLocaleTimeString();
}

function getCurrentInfo() {
    var current_date = new Date();
    var navigator_version = navigator.appVersion;
    var browser_name = navigator.appCodeName;

    //Afisarea timpului ca text prima data, apoi pornirea unui interval de refresh de 1sec
    getCurrentTime();
    setInterval(getCurrentTime, 1000);

    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

    var date_time = "Data:" + current_date.getDate() + "-" +
        (current_date.getMonth() + 1) + "-" +
        current_date.getFullYear();

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

function decimalToHexString(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    if (number < 0x10) {
        return "0" + number.toString(16).toUpperCase();
    } else {
        return number.toString(16).toUpperCase();
    }
}

function lottoGame() {
    var number_result = "";
    var number_guessed = 0;
    for (i = 0; i < 8; i++) {
        var read_value = parseInt(document.getElementById("input" + i).value);
        var generated_number = Math.floor(Math.random() * 256);
        if (read_value == generated_number) {
            number_guessed++;
        }
        number_result += decimalToHexString(generated_number) + "&emsp;";
    }
    document.getElementById("game_result").innerHTML = "Aţi ghicit " + number_guessed + " numere.<br />" +
        number_result;
}