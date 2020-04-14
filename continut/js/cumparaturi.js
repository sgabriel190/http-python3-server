var worker;
var last_lenght = 0;
class Produs {
    constructor(id, numeProdus, cantitate) {
        this.id = id;
        this.numeProdus = numeProdus;
        this.cantitate = cantitate;
    }
}

function startWorker() {
    if (window.Worker) {
        worker = new Worker("continut/js/worker.js");
        worker.onmessage = function(e) {
            document.getElementById("tabel_alimente").innerHTML = e.data;
        }
        setInterval(checkLenght, 1000);
    }
}

function checkLenght() {
    let produse = localStorage.getItem("produse");
    if (produse.length != last_lenght) {
        last_lenght = produse.length;
        worker.postMessage(localStorage.getItem("produse"));
    }
}

function adauga() {
    let numeProdus = document.getElementById("nume_aliment").value;
    let cantitate = document.getElementById("cantitate_aliment").value;

    let produse = localStorage.getItem("produse");
    if (produse == null) {
        produse = [];
    } else {
        produse = JSON.parse(produse);
    }
    let lastId = localStorage.getItem("lastId");
    if (lastId == null) {
        lastId = 1;
    } else {
        lastId = JSON.parse(lastId);
    }
    let id = lastId;
    produse.push(new Produs(id, numeProdus, cantitate));
    localStorage.setItem("produse", JSON.stringify(produse));
    localStorage.setItem("lastId", JSON.stringify(lastId + 1));
}