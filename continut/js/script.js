//Variabile folosite pentru canvas
var isDrawing = false;
var x = 0;
var y = 0;

//Laborator 7

function getLogin() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "continut/resurse/utilizatori.json", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            checkLogin(this);
        }
    };
    xmlhttp.send(null);
}

//Functie de verificare a casutelor de login, apelata pe buton
function checkLogin(jsonFile) {
    // Extragem valorile aflate in textboxuri
    var user_box = document.getElementById("utilizator").value;
    var password_box = document.getElementById("parola").value;
    document.getElementById("login_info").style.color = "red";

    //Parsarea textului intr-un obiect JSON
    var JSON_object = JSON.parse(jsonFile.responseText);

    //Verificam daca utilizatorul si parola corespund
    if (JSON_object.utilizator != user_box) {
        document.getElementById("login_info").innerHTML = "Numele de utilizator nu corespunde!";
        return;
    }
    if (JSON_object.parola != password_box) {
        document.getElementById("login_info").innerHTML = "Parola nu corespunde!";
        return;
    }
    document.getElementById("login_info").style.color = "green";
    document.getElementById("login_info").innerHTML = "Log in cu succes!";
}
/*
 ***Functie schimbaContinut utilizata pentru a naviga in site sub forma de single page application(SPA).
 ***Functia folosesste AJAX pentru a forma un request HTTP pentru a schimba continutul paginii web, cu cel specific paginii selectate din meniu.
 */
function schimbaContinut(resursa, jsFisier, jsFunctie) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', resursa + '.html', true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function() {
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }

    }
    xhttp.send();
}

//Laborator 5
/*
 ***Aceasta parte a a fisierului js se ocupa de scripturile din pagina Invat Js unde se initializeaza un canvas, se adauga
 ***continut nou in pagina(Sectiunea 1) si se implementeaza un mini joc.
 */


//Functie helper pentru apelarea functionalitatilor din pagina Invat JS
function changeToInvatJS() {
    initCanvas();
    getCurrentInfo();
}

//Functie ce redimensioneaza obiectele din pagina pentru a afisa cele 4 sectiuni intr-o linie
function callback4x1Button() {
    var elements = document.querySelectorAll(".section_layout");
    var canvas = document.getElementById('canvas1');

    canvas.width = "1000";
    canvas.height = "500";

    elements.forEach(element => {
        element.style.width = "70%";
        element.style.height = "20%";
    });
}

//Functie ce redimensioneaza obiectele din pagina pentru a afisa cele 4 sectiuni intr-o coloana
function callback1x4Button() {
    var elements = document.querySelectorAll(".section_layout");
    var canvas = document.getElementById('canvas1');

    canvas.width = "200";
    canvas.height = "200";

    elements.forEach(element => {
        element.style.width = "15%";
        element.style.height = "500px";
    });
}

//Functie ce redimensioneaza obiectele din pagina(sectiunile), pentru a fi afisare cate 2 pe linie
function callback2x2Button() {
    var elements = document.querySelectorAll(".section_layout");

    var canvas = document.getElementById('canvas1');

    canvas.width = "300";
    canvas.height = "200";

    elements.forEach(element => {
        element.style.width = "30%";
        element.style.height = "500px";
    });
}

//Functie ce adauga o linie noua la tabel
function addRow() {
    var table = document.getElementById("table_section4");

    var row = table.insertRow(document.getElementById("rand").value);

    row.style.backgroundColor = document.getElementById("color_table").value;

    for (i = 0; i < table.rows[0].cells.length; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = "rand nou";
    }

}

//Functie ce adauga o coloana noua tabelului
function addColumn() {
    var table = document.getElementById("table_section4");
    var table_rows = table.querySelectorAll("tr");

    table_rows.forEach(element => {
        var cell = element.insertCell(document.getElementById("coloana").value);
        cell.innerHTML = "coloana noua";
        cell.style.backgroundColor = document.getElementById("color_table").value;
    })
}

//Functie helper pentru a initializa canvasul din sectiunea 3
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

//Functie utilizata la eventimentul de mouse (mousemove), pentru a desena linii cu mouse-ul in canvas
function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = document.getElementById("color").value;
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

//Functie ce adauga in totalitate continutul sectiunii 1, afisand date despre utilizator, cat si local timezone
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


//Functie helper ce adauga in pagina la atributul time ora curenta
function getCurrentTime() {
    var d = new Date();
    document.getElementById("time").innerHTML = "<br /><br /> Ora:" + d.toLocaleTimeString();
}

//Functie helper pentru a afisa geo pozitia utilizatorului
function showPosition(position) {
    document.getElementById("section1").innerHTML += "<br /><br /><u>Location</u>" + "<br/><br /> Latitude: " + position.coords.latitude +
        "<br /><br /> Longitude: " + position.coords.longitude;
}

//Functie folosita pentru a transforma un numar zecimal intrunul hexazecimal in format string
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

//Functie de callback pentru butonul corespunator jocului lotto
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