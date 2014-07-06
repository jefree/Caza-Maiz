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

	}, 1000/30);
}
	
function actualizarObj() {
	pollito.actualizar();

	var maices_cogidos = [];
	var cercas_golpeadas = [];

	console.log("nuevo ciclo");

	for (var maiz in objetos.maices){

		if(pollito.choca(objetos.maices[maiz])){
			pollito.agregar_vida();
			maices_cogidos.push(maiz);
		}
	}

	for (var cerca in objetos.cercas){

		if(pollito.choca(objetos.cercas[cerca])){
			pollito.restar_vida();
			cercas_golpeadas.push(cerca);
		}
	}

	for (var m in maices_cogidos){
		objetos.maices.splice(maices_cogidos[m], 1);
	}

	for (var c in cercas_golpeadas){
		console.log("eliminando: ", cercas_golpeadas[c]);
		objetos.cercas.splice(cercas_golpeadas[c], 1);
	}
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
