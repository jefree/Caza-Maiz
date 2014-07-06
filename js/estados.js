var img_perdido = new Image();
img_perdido.src = "imgs/perdiste.png"

var img_ganaste = new Image();
img_ganaste.src = "imgs/ganaste.png";

var img_inicio = new Image();
img_inicio.src = "imgs/inicio.png";

function iniciado() {
	limpiar();
	contexto.drawImage(img_inicio, 0, 0);
	
}

function jugando() {
	
	limpiar ();
	actualizarObj();
	pintarObj();

	if (pollito.vidas == 0){
		console.log("here")
		estado = "PERDIDO";	
	} else if(objetos.maices.length == 0) {
		estado = "GANADO";
		nivel_actual = (nivel_actual +1) % niveles.length;
	}
}

function ganado(){
	contexto.drawImage(img_ganaste, 44, 25);
}

function perdido() {																			
	contexto.drawImage(img_perdido, 36, 25);
	//contexto.fillText("Haz Click Para Jugar de Nuevo !!", );
}

function dibujar_texto(texto, posx, posy, color) {
	contexto.fillStyle = color;
	contexto.font = "bold 16px Arial";
	contexto.fillText(texto, posx, posy);
}

function limpiar (){
	contexto.fillStyle="green";
	contexto.fillRect(0, 0, 300, 350);
	
}	

function pintarObj (){
	objetos.pintar(contexto);
	pollito.pintar(contexto);
	vidas.pintar(contexto);


	/* Dibujar linea divisoria */ 
	contexto.strokeStyle = "black";
	contexto.beginPath();
	contexto.moveTo(0, 300);
	contexto.lineTo(300, 300);
	contexto.stroke();

	/* Dibujar texto nivel actual */
	dibujar_texto("Nivel: " + (nivel_actual+1), 210, 335, "white");
}