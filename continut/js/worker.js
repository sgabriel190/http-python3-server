onmessage = function(e) {
    var message_response = "<tr><th>Numar</th><th>Nume produs</th><th>Cantitate</th></tr>";
    if (e != null) {
        let json_produse = JSON.parse(e.data);
        for (let i = 0; i < json_produse.length; i++) {
            message_response += "<tr><td>" + json_produse[i].id +
                "</td><td>" + json_produse[i].numeProdus +
                "</td><td>" + json_produse[i].cantitate +
                "</td></tr>";
        }
    }
    postMessage(message_response);
}