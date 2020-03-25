import socket
import os

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))

# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

while True:
    print("#########################################################################")
    # asteapta conectarea unui client la server
    print("Serverul asculta potentiali clienti.")

    # metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
    (clientsocket, address) = serversocket.accept()
    print("S-a conectat un client.")

    # se proceseaza cererea si se citeste prima linie de text
    cerere = ""
    linieDeStart = ""
    while True:
        data = clientsocket.recv(1024)
        cerere =  data.decode("utf-8")
        print("S-a citit mesajul: \n---------------------------\n" + cerere + "\n---------------------------")
        pozitie = cerere.find('\r\n')
        if (pozitie > -1):
            linieDeStart = cerere[0:pozitie]
            print("S-a citit linia de start din cerere: ##### " + linieDeStart + " #####")
            break
        else:
            print("Cerere de la client invalida.")
    print("S-a terminat cititrea.")
    # TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
    argument_list = linieDeStart.split(" ")
    raspuns = ""
    CRLF = "\r\n"

    while(os.getcwd() != "/home/gabriel/Documents/pw/proiect1-picolo190"):
        os.chdir("..")
    print(os.getcwd())
    f = open("index.html", "r")
    mesaj = f.read()
    raspuns += argument_list[2] + " 200  OK" + CRLF 
    raspuns += "Server: py_server" + CRLF
    raspuns += "Content-Type: text/html" + CRLF
    raspuns += "Content-Length: " + str(len(mesaj.encode('utf-8'))) + CRLF
    raspuns += mesaj + CRLF + CRLF
    clientsocket.sendall(raspuns.encode("utf-8"))
    f.close()

    os.chdir("continut/css")
    print(os.getcwd())
    f1 = open("stil.css", "r")
    raspuns = ""
    mesaj1 = ""
    mesaj1 = f1.read()
    raspuns = argument_list[2] + " 200  OK" + CRLF 
    raspuns += "Server: py_server" + CRLF
    raspuns += "Content-Type: text/css" + CRLF
    raspuns += "Content-Length: " + str(len(mesaj1.encode('utf-8'))) + CRLF
    raspuns += mesaj1 + CRLF + CRLF
    clientsocket.sendall(raspuns.encode("utf-8"))
    f1.close()

    clientsocket.close()
    print("S-a terminat comunicarea cu clientul.")
