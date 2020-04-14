function incarcaPersoane() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "continut/resurse/persoane.xml", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("loading_message").innerHTML = "Se încarcă. Vă rugăm aşteptaţi...";
            parseXML(this);
        }
    };
    xmlhttp.send();
}

function parseXML(xmldoc) {
    var xml_file = xmldoc.responseXML;
    var table = "<tr><th>Nume</th><th>Prenume</th><th>Vârstă</th><th colspan=\"5\">Adresă</th></tr>";
    var xml_array = xml_file.getElementsByTagName("persoana");
    var adresa = xml_file.getElementsByTagName("adresa");
    for (var i = 0; i < xml_array.length; i++) {
        table += "<tr><td>" +
            xml_array[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
            "</td><td>" +
            xml_array[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue +
            "</td><td>" +
            xml_array[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue +
            "</td><td>Strada: " +
            adresa[i].getElementsByTagName("strada")[0].childNodes[0].nodeValue +
            "</td><td>Număr: " +
            adresa[i].getElementsByTagName("numar")[0].childNodes[0].nodeValue +
            "</td><td>Localitate: " +
            adresa[i].getElementsByTagName("localitate")[0].childNodes[0].nodeValue +
            "</td><td>Judeţ: " +
            adresa[i].getElementsByTagName("judet")[0].childNodes[0].nodeValue +
            "</td><td>Ţara: " +
            adresa[i].getElementsByTagName("tara")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    document.getElementById("loading_message").innerHTML = "";
    document.getElementById("table_persoane").innerHTML = table;
}