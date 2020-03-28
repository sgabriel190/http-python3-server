import socket
import os

CRLF = "\r\n"
os.chdir("..")
print(os.getcwd())

def myReadFile(path):
    f = open(path, "rb")
    continut = f.read()
    f.close()
    return continut

def formatHttpPacket(file, httpType, fileType):
    response = ""
    response += httpType + " 200  OK" + CRLF 
    response += "Server: py_server" + CRLF
    response += "Content-Type: " + fileType + CRLF
    response += "Content-Length: " + str(len(file.encode('utf-8'))) + CRLF
    response += file + CRLF + CRLF
    return response

def findAcceptField(packet):
    packet_split = packet.split(CRLF)
    accept_field = packet_split[3].find(',')
    accept = packet_split[3][8:accept_field]
    return accept

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
        pozitie = cerere.find(CRLF)
        accept_field = findAcceptField(cerere)
        if (pozitie > -1):
            linieDeStart = cerere[0:pozitie]
            print("S-a citit linia de start din cerere: ##### " + linieDeStart + " #####")
            break
        else:
            print("Cerere de la client invalida.")
    print("S-a terminat cititrea.")
    argument_list = linieDeStart.split(" ")
    
    response_file = myReadFile(argument_list[1][1:])
    packet = formatHttpPacket(response_file, argument_list[2], accept_field)
    
    clientsocket.sendall(packet.encode("utf-8"))

    clientsocket.close()
    print("S-a terminat comunicarea cu clientul.")
