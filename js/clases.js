
/* Clase para los objetos y personajes del juego */
var Actor = function(img) {
	this.posx = 0;
	this.posy = 0;

	this.img = img;

	this.pintar= function(contexto) {
		contexto.drawImage(this.img, this.posx, this.posy);
	};

	this.choca=function(otro_actor){

		if (this.posx < otro_actor.posx+otro_actor.img.width &&
			this.posx+this.img.width > otro_actor.posx	&&
			this.posy < otro_actor.posy+otro_actor.img.height &&
			this.posy+this.img.height > otro_actor.posy){

			return true;
		}

		return false;

	};
};

/* Representa al pollito hereda de Actor */
var Pollito = function() {
	
	/* Inicializamos los atributos del pollito */

	this.img = new Image();
	this.img.src = "imgs/pollito.png";

	this.vidas=3;
	
	this.velhz=0;
	this.velver=0;

	/* LLamamos al constructor de la clase padre */
	Actor.call(this, this.img);
	
	/* Metodo de la clase Pollito */

	this.agregar_vida = function(){
		if (this.vidas < 3){
			this.vidas += 1;
		}
	}

	this.restar_vida = function(){
		if (this.vidas > 0){
			this.vidas -= 1;
		}
	}

	this.correr= function(){
		this.velhz=3;
		
	};

	this.detenerHz= function(){
		this.velhz=0;

	};

	this.subir= function(){
		this.velver=-3;
		
	};
	
	this.detenerVer= function(){
		this.velver=0;
		
	};

	this.bajar=function(){
		this.velver=3;
	};
	 
	this.atras=function(){
		this.velhz=-3;
	};
	
	this.actualizar=function(){
		if (this.velhz<0 && this.posx>0){
			this.posx+=this.velhz;
			}
			
		if (this.velhz>0 && this.posx+this.img.width<300){
			this.posx+=this.velhz;
			}
		if(this.velver<0 && this.posy>0){
			this.posy+=this.velver;
			}
		if (this.velver>0 && this.posy+this.img.height<300){
			this.posy+=this.velver;
			}
	};
};
Pollito.prototype = new Actor;

var Objetos = function() {
	
	/* Imagenes para los objetos del juego */
	this.img_cerca = new Image();
	this.img_cerca.src = "imgs/cerca.png";

	this.img_maiz = new Image();
	this.img_maiz.src = "imgs/maiz.png";


	/* Arreglos para los objetos del juego */
	this.maices = [];
	this.cercas = [];

	this.cargar=function(matriz_nivel) {

		this.maices = [];
		this.cercas = [];

		for(var f=0; f<10; f++) {
			for(var c=0; c<10; c++) {
				if (matriz_nivel[f][c] == 1) {
					
					var nueva_cerca = new Actor(this.img_cerca);
					
					nueva_cerca.posx = c*nueva_cerca.img.width;
					nueva_cerca.posy = f*nueva_cerca.img.height;
					
					this.cercas.push(nueva_cerca);

				}

				if (matriz_nivel[f][c] == 2) {
					var nuevo_maiz = new Actor(this.img_maiz);
					
					nuevo_maiz.posx = c*(nuevo_maiz.img.width + 10) ;
					nuevo_maiz.posy = f*nuevo_maiz.img.height;
					
					this.maices.push(nuevo_maiz);
				}
			}
		}

	};

	this.pintar = function(contexto){

		for(var cerca in this.cercas){
			this.cercas[cerca].pintar(contexto);
		}

		for(var maiz in this.maices){
			this.maices[maiz].pintar(contexto);
		}
	};

};

var Vidas = function(pollito){

	this.pollito = pollito;

	this.img_huevo = new Image();
	this.img_huevo.src = "imgs/huevo.png"

	this.pintar = function(contexto){

		for (var i=0; i<this.pollito.vidas; i++) {
			contexto.drawImage(this.img_huevo, (10+this.img_huevo.width)*i, 345 - this.img_huevo.height );
		}
	}
}
