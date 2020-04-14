import socket
import os # pentru dimensiunea fisierului

# Accesarea directorului principal al proiectului
os.chdir("..")
CRLF = "\r\n"

# Definirea unui dictionar pentru tipurile media din raspunsull http
tipuriMedia = {
	"html": "text/html",
	"css": "text/css",
	"js": "application/js",
	"png": "image/png",
	"jpg": "image/jpeg",
	"jpeg": "image/jpeg",
	"gif": "image/gif",
	"ico": "image/x-icon",
	"xml": "application/xml",
	"json": "application/json"
}

def formatHttpResponse(tipMedia, fileStream, clientsocket):
	# se trimite raspunsul
	packet = "HTTP/1.1 200 OK" + CRLF
	packet += "Content-Length: " + str(len(fileStream)) + CRLF
	packet += "Content-Type: " + tipMedia + CRLF
	packet += "Server: My PW Server" + CRLF + CRLF
	clientsocket.sendall(packet.encode('utf-8'))
	clientsocket.sendall(fileStream)


def errorHttpResponse(clientsocket):
	msg = 'Eroare! Resursa ceruta ' + numeResursaCeruta + ' nu a putut fi gasita!'
	print(msg)
	packet = "HTTP/1.1 404 Not Found" + CRLF
	packet += "Content-Length: " + str(len(msg.encode('utf-8'))) + CRLF
	packet += "Content-Type: text/plain" + CRLF
	packet += "Server: My PW Server" + CRLF + CRLF + msg
	clientsocket.sendall(packet.encode('utf-8'))

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))

# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

while True:
	print("#########################################################################")
	print("Serverul asculta potentiali clienti.")
	# asteapta conectarea unui client la server
	# metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
	(clientsocket, address) = serversocket.accept()
	print("S-a conectat un client.")

	# se proceseaza cererea si se citeste prima linie de text
	cerere = ""
	linieDeStart = ""
	
	while True:
		buf = clientsocket.recv(1024)
		if len(buf) < 1:
			break
		cerere = cerere + buf.decode()
		print("S-a citit mesajul: \n---------------------------\n" + cerere + "\n---------------------------")
		pozitie = cerere.find(CRLF)
		if (pozitie > -1 and linieDeStart == ''):
			linieDeStart = cerere[0:pozitie]
			print("S-a citit linia de start din cerere: ##### " + linieDeStart + " #####")
			break
	print("S-a terminat cititrea.")
	if linieDeStart == '':
		clientsocket.close()
		print("S-a terminat comunicarea cu clientul - nu s-a primit niciun mesaj.")
		continue

	# interpretarea sirului de caractere `linieDeStart`
	elementeLineDeStart = linieDeStart.split(" ")
	numeResursaCeruta = elementeLineDeStart[1][1:]

	fisier = None
	if(numeResursaCeruta != "api/utilizatori"):
		try:
			# deschide fisierul pentru citire in mod binar
			fisier = open(numeResursaCeruta,"rb")
			fileStream = fisier.read()

			# extragerea tipului media din dictionar
			numeExtensie = numeResursaCeruta[numeResursaCeruta.rfind(".")+1:]
			tipMedia = tipuriMedia[numeExtensie]

			# Formarea si trimiterea raspunsului HTTP
			formatHttpResponse(tipMedia, fileStream, clientsocket)

		except IOError:
			# daca fisierul nu exista trebuie trimis un mesaj de 404 Not Found
			errorHttpResponse(clientsocket)

		finally:
			if fisier is not None:
				fisier.close()
	else:
		pass
	clientsocket.close()
	print("S-a terminat comunicarea cu clientul.")

