var pollito;
var contexto;
var canvas;
var vidas;
var objetos;

var nivel_actual;
var estado;

function main(){
	
	teclado();
	
	pollito = new Pollito();
	objetos = new Objetos();
	vidas = new Vidas(pollito);
	
	nivel_actual = 0;
	estado = "INICIADO";

	canvas = document.getElementById("canvasp");
	contexto = canvas.getContext("2d");
	
	bucleJuego ();
}

function iniciar() {

	var nivel = niveles[nivel_actual];

	objetos.cargar(nivel.objetos);
	pollito.posx = nivel.pos.x;
	pollito.posy = nivel.pos.y;

	pollito.vidas = 5;

	estado = "JUGANDO";
}

function bucleJuego(){

	canvas.addEventListener("click", function() {
		
		if(estado == "INICIADO" || estado == "PERDIDO" || estado == "GANADO") {
			iniciar();
		}
	});

	setInterval(function(){

		if (estado == "INICIADO") {
			iniciado();
		}

		if (estado == "JUGANDO") {
			jugando();
		}

		if (estado == "PERDIDO") {
			perdido();
		}

		if (estado == "GANADO") {
			ganado();
		}

	}, 1000/25);
}

function colisiones() {

	var cercas_golpeadas = [];

	for(var i=objetos.cercas.length-1; i>=0; i--) {

		if(pollito.choca(objetos.cercas[i])){
			objetos.cercas.splice(i, 1);
			pollito.restar_vida();
		}
	}

	for(var i=objetos.maices.length-1; i>=0; i--) {
		if(pollito.choca(objetos.maices[i])){
			objetos.maices.splice(i, 1);
			pollito.agregar_vida();
		}
	}

}

function actualizarObj() {
	pollito.actualizar();
	colisiones();
}

function teclado(){
	document.addEventListener("keydown",function(evento){
			var tecla=evento.keyCode;
			
			if (tecla==37){//atras
				pollito.atras();
			}
			
			if (tecla==38){//arriba
				pollito.subir();
			}
			if (tecla==39){//derecha
				pollito.correr();

			}
			if (tecla==40){//abajo
				pollito.bajar();
			}
		});
		
	document.addEventListener("keyup",function(evento){
		var tecla=evento.keyCode;
			
			if (tecla==37){//atras
				pollito.detenerHz();
			}
			
			if (tecla==38){//arriba
				pollito.detenerVer();
			}
			if (tecla==39){//derecha
				pollito.detenerHz();
			}
			if (tecla==40){//abajo
				pollito.detenerVer();
			}
		});
}
