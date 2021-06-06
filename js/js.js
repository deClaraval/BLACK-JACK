// JavaScript Document
// Author: Bernardo Castán Martínez
// Declaración de variables y elementos de juego:
const BlackJack = false;
const valores = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10,"J","Q","K"];
const palos = ["P","D","C","T"];

// Barajas trucadas
// Los siguientes settings de valores del mazo de la baraja fueron establecidos sólo a efectos de comprobación y testeo !!
// Desbloquear estos mazos puede hacer que la ejecución puede resulte inestable
// Si se desbloquea alguno de ellos, recuerde comentar el mazo principal de la linea superior!!!!
// const valores = ["K", "A", "K", "A", "K", "A", "K", "A", "K", "A", "K", "A", "K"];
// const valores = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"];

var naipe = [0,0];

//variable para los mensajes y normas de la mesa
let msg ="";

// Declaro que hay una Mesa
const mesa = document.getElementById('mesa');

// Declaro el lugar del mazo de cartas
const Mazo = document.getElementById('Mazo');

// Declaro la posición original del naipe del Mazo
const izquierda = 760;
const altura = 70;

// Declaro los arrays para los jugadores; la banca ocupará indice 0 en todo momento:
let jugadores=['asiento0',];
let creditos=[0,];
let apuestas=[0,];
let statusJugador=[0,];
let conteoJugador=[0,];
let conteoJugador1=[0,];
let menuJugador=[0,];
let MenuDivideMano=[0,];

// flags para saber, en caso de separar la mano, en cual de ellas se ha podido plantar:
let mano1 = false;
let mano2 = false;

//Array para guardar los naipes de la mano de de la banca:
let asiento0 = [];

// Arrays para guardar los naipes de la mano de cada jugadores
let asiento1 = [];
let asiento11 = [];

let asiento2 = [];
let asiento21 = [];

let asiento3 = [];
let asiento31 = [];

let asiento4 = [];
let asiento41 = [];

let asiento5 = [];
let asiento51 = [];

let asiento6 = [];
let asiento61 = [];

// Identificador del Jugador actual, variables para conteo y guías de los bancos de cartas:
let indiceJugadorActual = null;

let sumaBase = 0;
let sumaTotal = 0;

//variables para el conteo de los valores en caso de dividir la mano:
let sumaBase1 = 0;
let sumaTotal1 = 0;

let bancoDeCartas1 = 2;

// este banco de cartas es por si el jugador separa la mano
let bancoDeCartas2 = 1;
let asesEnLaBaza = 0;
let asesEnLaBaza2 = 0;

// ---------------------------------------- Funciones de Juego ----------------------------------------------------
//                            Iniciamos con unas instrucciones preliminares:

// De inicio, los botones para abandonar el juego estan desactivados
for (var i=1;i<7;i++){
	document.getElementById('cfpJ'+i).disabled=true;
}

// Hay elementos que al principio sobran:
document.getElementById('Mazo').style.display = 'none';
document.getElementById('InicioPartida').hidden=true;
document.getElementById('MenuOpciones').hidden= true;
document.getElementById('MenuDivideMano').hidden= true;

// Tambien dejamos inactivos pero visibles los botones para unirse al juego
for (var i=1;i<7;i++){
	document.getElementById('cipJ'+i).disabled=true;
}
// Verificamos las casilla de apuestas iniciales y habilitamos el boton unirse en su caso:

function validarInput(campoApuesta, boton) {
	document.getElementById(boton).disabled = !document.getElementById(campoApuesta).value.length;
  }

// ------------------------------------------------------------------------------------------------

// Informamos con el Status para que se puedan unir a la mesa:
msg= "<path id='ruta1' d='M20,65 C200,365 512,365 712,65' stroke='transparent' stroke-width=1 fill='transparent'/><text id='textoMensaje' fill='white' dominant-baseline='central' x='19%' textLength='730' font-family='Verdana' font-size='25'><textPath xlink:href='#ruta1'>Los jugadores pueden unirse a la mesa o salir!</textPath></text>";
document.getElementById('mensajes').innerHTML = msg ;

function habilita(){
	if(jugadores.length<2){ 
		document.getElementById('InicioPartida').hidden=true; 
	}

	if(jugadores.length>=2){ 
		document.getElementById('InicioPartida').hidden=false; 
	}
}

// Función para incorporar Jugadores al juego:
function unirse(asiento){

	var i = asiento.substr(-1);
	var apuesta = 0;

	jugadores.push(asiento);
	// Aqui seteamos el crédito Inicial por defecto al jugador
	creditos.push(500);

	// Seteamos la apuesta inicial que ha realizado (Beat1)
	apuesta = document.getElementById("Beat"+i).value;
	apuestas.push(apuesta);

	// Seteamos el estatus del jugador para tener en cuenta su decisión durante el juego
	statusJugador.push(0);
	conteoJugador.push(0);
	menuJugador.push('MenuOpciones'+i);
	MenuDivideMano.push('MenuDivideMano'+i);

	// Ocultamos o deshabilitamos los controles pertinentes en este momento
	document.getElementById('cfpJ'+i).disabled=false;
	document.getElementById('cfpJ'+i).hidden=false;
	document.getElementById('cipJ'+i).disabled=true;
	document.getElementById('cipJ'+i).hidden=true;

	var direccion = "url('imgs/J"+(jugadores.length-1)+".png')";
	document.getElementById(asiento).style.backgroundImage = direccion ;
	// document.getElementById('CashJ'+i).innerHTML = "Cash: 500" ;

	habilita();
}

// Funcion para sacar (eliminar) los jugadores que decidan irse del juego:
function acabar(asiento){

	var j = asiento.substr(-1);
	document.getElementById('cfpJ'+j).disabled=true;
	document.getElementById('cfpJ'+j).hidden=true;
	document.getElementById('cipJ'+j).disabled=false;
	document.getElementById('cipJ'+j).hidden=false;
	var direccion = "url('imgs/sitioLibre.png')";
	document.getElementById(asiento).style.backgroundImage = direccion ;
	document.getElementById('CashJ'+j).innerHTML ="" ;

	// veamos que jugador tenía este asiento para borrarlo:
	for (var i=1;i<jugadores.length ;i++){
		if (jugadores[i]==asiento){
			creditos.splice(i, 1);
			apuestas.splice(i, 1);
			jugadores.splice(i, 1);
			statusJugador.splice(i, 1);
			conteoJugador.splice(i, 1);
			menuJugador.splice(i, 1);
		}
	}
	// Rehubicamos graficamente el turno de los jugadores:
	for (var i=1;i<jugadores.length ;i++){
		direccion="url('imgs/J"+i+".png')";
		document.getElementById(jugadores[i]).style.backgroundImage = direccion ;
	}

	habilita();
}

// --------------------------------------- Iniciamos la Partida !!! -------------------------------------------------------
function IniciarPartida(){
	
	//document.getElementById("InicioPartida").disabled = true;
	document.getElementById("InicioPartida").hidden = true;
	document.getElementById('Mazo').style.display = 'inline';

	msg= "<path id='ruta1' d='M20,65 C200,365 512,365 712,65' stroke='transparent' stroke-width=1 fill='transparent'/><text id='textoMensaje' fill='white' dominant-baseline='central' x='45%' textLength='730' font-family='Verdana' font-size='25'><textPath xlink:href='#ruta1'>Partida en curso!</textPath></text>";
	document.getElementById("mensajes").innerHTML= msg;

	// Desactivamos los controles de entrada / salida hasta que la partida actual finalice
	for (i=0; i<6; i++){
		document.getElementsByClassName("controles")[i].style.display = 'none';
	}
	// Restamos del Cash la apuesta de entrada (lo que haya puesto el jugador)
	// A tener en cuenta : ApuestaJ5 CashJ5 asiento5
	for (var i=1; i<jugadores.length;i++){
		creditos[i]=creditos[i]-apuestas[i];
	}



	repartePrimeraMano();
	pintaCartasPrimeraMano();

	indiceJugadorActual = 1;
	
	cuentaCartas();
	// Ahora vamos turno a turno con lo que decida cada jugador:
	setTimeout(function(){ 
		muestramenu();
	}, 3000);
	
}

function repartePrimeraMano(){

	// Comenzamos repartiendo dos cartas a cada jugador

	for (var i=0; i<jugadores.length;i++){

		for (var j=0; j<2; j++){

			var valor = Math.floor(Math.random()*13);
			var palo = Math.floor(Math.random()*4);
			
			naipe[j] = valores[valor] + "-" + palos[palo];
		}
		
		switch (jugadores[i]) {
			case 'asiento0':
				asiento0.push(naipe[0]);
				console.log("La carta de la casa es: " + naipe[0] )
			  	break;
			case 'asiento1':
				asiento1.push(naipe[0]);
				asiento1.push(naipe[1]);
			  	break;
			case 'asiento2':
				asiento2.push(naipe[0]);
				asiento2.push(naipe[1]);
			  	break;
			case 'asiento3':
				asiento3.push(naipe[0]);
				asiento3.push(naipe[1]);
			  	break;
			case 'asiento4':
				asiento4.push(naipe[0]);
				asiento4.push(naipe[1]);
			  	break;
			case 'asiento5':
				asiento5.push(naipe[0]);
				asiento5.push(naipe[1]);
			  	break;
			case 'asiento6':
				asiento6.push(naipe[0]);
				asiento6.push(naipe[1]);
			  	break;
			default:
			  console.log('Oooopsss! Algo ha ido mal.');
		}

	}

}

function pintaCartasPrimeraMano(){

	// Pintamos las cartas de los jugadores y se las mandamos:
	for (var i=0; i<jugadores.length; i++){
		// Formato coordenadas: top left
		switch (jugadores[i]) {
			case 'asiento0':
				pintaCarta(asiento0[0],0,1);
				  break;
			case 'asiento1':
				pintaCarta(asiento1[0],1,1);
				pintaCarta(asiento1[1],1,2);
				  break;
			case 'asiento2':
				pintaCarta(asiento2[0],2,1);
				pintaCarta(asiento2[1],2,2);
				  break;
			case 'asiento3':
				pintaCarta(asiento3[0],3,1);
				pintaCarta(asiento3[1],3,2);
				  break;
			case 'asiento4':
				pintaCarta(asiento4[0],4,1);
				pintaCarta(asiento4[1],4,2);
				  break;
			case 'asiento5':
				pintaCarta(asiento5[0],5,1);
				pintaCarta(asiento5[1],5,2);
				  break;
			case 'asiento6':
				pintaCarta(asiento6[0],6,1);
				pintaCarta(asiento6[1],6,2);
				  break;
			default:
			  console.log('Oooopsss! Algo ha ido mal.');
		}
	}
}

function pideCarta(vienedeFuncion){

	var naipe = "";
	var longitudArrayCartas = "";
	var valor = Math.floor(Math.random()*13);
	var palo = Math.floor(Math.random()*4);
			
	naipe = valores[valor] + "-" + palos[palo];

	switch (jugadores[indiceJugadorActual]) {
		case 'asiento0':
			asiento0.push(naipe);
			  break;
		case 'asiento1':
			asiento1.push(naipe);
			  break;
		case 'asiento2':
			asiento2.push(naipe);
			  break;
		case 'asiento3':
			asiento3.push(naipe);
			  break;
		case 'asiento4':
			asiento4.push(naipe);
			  break;
		case 'asiento5':
			asiento5.push(naipe);
			  break;
		case 'asiento6':
			asiento6.push(naipe);
			  break;
		default:
		  console.log('Oooopsss! Algo ha ido mal.');
	}

	// bancoDeCartas1 y bancoDeCartas2 guarda la siguiente posición libre para la carta que pueda pedir
	bancoDeCartas1 = bancoDeCartas1 + 1;

	console.log("Banco de cartas "+ bancoDeCartas1)

	switch (jugadores[indiceJugadorActual]) {
		case 'asiento1':
			pintaCarta(naipe,1,bancoDeCartas1);
			  break;
		case 'asiento2':
			pintaCarta(naipe,2,bancoDeCartas1);
			  break;
		case 'asiento3':
			pintaCarta(naipe,3,bancoDeCartas1);
			  break;
		case 'asiento4':
			pintaCarta(naipe,4,bancoDeCartas1);
			  break;
		case 'asiento5':
			pintaCarta(naipe,5,bancoDeCartas1);
			  break;
		case 'asiento6':
			pintaCarta(naipe,6,bancoDeCartas1);
			  break;
		default:
		  console.log('Oooopsss! Algo ha ido mal.');
	}

	/*  ------------------------------------------------------- aun seguimos */


		let carta1 = "";
		let separador = "-";

		// Vamos a ver que acaba de sacar el jugador :
		switch (jugadores[indiceJugadorActual]) {

			case 'asiento1':
				carta1 = asiento1[asiento1.length-1].split(separador);
				  break;
			case 'asiento2':
				carta1 = asiento2[asiento2.length-1].split(separador);
				  break;
			case 'asiento3':
				carta1 = asiento3[asiento3.length-1].split(separador);
				  break;
			case 'asiento4':
				carta1 = asiento4[asiento4.length-1].split(separador);
				  break;
			case 'asiento5':
				carta1 = asiento5[asiento5.length-1].split(separador);
				  break;
			case 'asiento6':
				carta1 = asiento6[asiento6.length-1].split(separador);
				  break;
			default:
			  console.log('Oooopsss! Algo ha ido mal.');
		}
		
		console.log("Carta nueva : " + carta1);
	
		// Establecemos en 10 el valor de J Q y K
		if(carta1[0]=="J" || carta1[0]=="Q" || carta1[0]=="K" ) { carta1[0] = 10; }
	
		
		// Cada As que encontramos lo anotamos como 1 y damos opciones al jugador de cambiar el valor
		if(carta1[0]=="A") { 
			asesEnLaBaza++; 
			carta1[0]=1 ; 
			casoAs(asesEnLaBaza, carta1[1]);  
		}else{ 
			carta1[0] = Number.parseInt(carta1[0],10);
		}
			sumaBase += carta1[0]; 
			sumaTotal += carta1[0]; 
			
		// Mostramos el conteo en el menu del jugador:
		document.getElementById('cuentaCartas').innerHTML = " - Suma : " + sumaTotal;

		if(vienedeFuncion=='Jpidecarta'){
			if (sumaTotal > 21){
				grabaValorCartas();
				statusJugador[indiceJugadorActual] = "Pasa";
				console.log("Status: " + statusJugador[indiceJugadorActual]);
				pintaresultadoEnPuesto('pasa');
				bancoDeCartas1 = 2;
    			bancoDeCartas2 = 2;
				turnos() ;
			}	
		}
}

function pintaCarta(carta, Y, X){

	console.log("Estamos pintando la animación de la carta: " + carta)
	let img = document.createElement('img');
	img.className = 'carta';
	img.id = carta;
	img.src = "imgs/reversoNaipe.png";
	/* img.style.zIndex = "1"; */
	img.style.marginRight="auto";
	img.style.marginLeft="auto";
	img.style.top="auto";
	img.style.animationName = "lanzaCarta_Asiento_" + Y + "_" + X; // !! Actualizar según valor entrante
	console.log("lanzaCarta_Asiento_" + Y + "_" + X);
	img.style.animationDuration = "2s";
	img.style.animationIterationCount = "1";
	// nomenclatura: #div_0_1
	indice = "div_" + Y + "_" + X;
	document.getElementById(indice).appendChild(img);

	setTimeout(function(){ 
		
		img.style.animationName = "descubre1";
		img.style.animationDuration = "1s";
		img.style.animationIterationCount = "1";
		img.src = "imgs/" + carta +".png";
		img.style.animationName = "descubre2";
		img.style.animationDuration = "1s";
		img.style.animationIterationCount = "1";

	}, 2000);
	
}


function muestramenu(){

	// if( indiceJugadorActual==null ){ indiceJugadorActual = 1;}

		div = document.getElementById('MenuOpciones');
		div.hidden = false;
		div.className = menuJugador[indiceJugadorActual];
		console.log(div.className);
		console.log(indiceJugadorActual);
		console.log(menuJugador[indiceJugadorActual]);
		document.getElementById('info').innerHTML = "Beat: " + apuestas[indiceJugadorActual] + " - Cash: " + creditos[indiceJugadorActual];
	
}

function turnos(){

	if (indiceJugadorActual < jugadores.length-1){
		indiceJugadorActual++ ;
		bancoDeCartas1 = 2 ;
		bancoDeCartas2 = 2 ;
		document.getElementById("valordeAs").innerHTML = "";
		
		cuentaCartas();
		muestramenu();
		
	}else{
		div = document.getElementById('MenuOpciones');
		div.hidden = true;
		turnoBanca();
	}

}

function cuentaCartas(){
	let carta1;
	let carta2;
	let separador = "-";
	// Vamos a ver qué tiene el jugador hasta ahora:
	switch (jugadores[indiceJugadorActual]) {
		case 'asiento1':
			carta1=asiento1[0].split(separador);
			carta2=asiento1[1].split(separador);
			  break;
		case 'asiento2':
			carta1=asiento2[0].split(separador);
			carta2=asiento2[1].split(separador);
			  break;
		case 'asiento3':
			carta1=asiento3[0].split(separador);
			carta2=asiento3[1].split(separador);
			  break;
		case 'asiento4':
			carta1=asiento4[0].split(separador);
			carta2=asiento4[1].split(separador);
			  break;
		case 'asiento5':
			carta1=asiento5[0].split(separador);
			carta2=asiento5[1].split(separador);
			  break;
		case 'asiento6':
			carta1=asiento6[0].split(separador);
			carta2=asiento6[1].split(separador);
			  break;
		default:
		  console.log('Oooopsss! Algo ha ido mal.');
	}
	
	// Establecemos en 10 el valor de J Q y K
	if(carta1[0]=="J" || carta1[0]=="Q" || carta1[0]=="K" ) { carta1[0] = 10; }
	if(carta2[0]=="J" || carta2[0]=="Q" || carta2[0]=="K" ) { carta2[0] = 10; }
	console.log(carta1[0] + " y " + carta2[0]);

	// Si tiene Black Jack directamente lo anotamos
	if ( (carta1[0]=="A" && carta2[0]==10 ) || (carta1[0]==10 && carta2[0]=="A" ) ){
		console.log("Black - Jack !!!");
		statusJugador[indiceJugadorActual] = "BlackJack";
		console.log(statusJugador[indiceJugadorActual]);
		sumaBase = 21;
		sumaTotal = sumaBase;
		conteoJugador[indiceJugadorActual] = sumaTotal;
		pintaresultadoEnPuesto('blackjack');
		turnos();
	
	}else{
	
		// Cada As que encontramos lo anotamos como 1 y damos opciones al jugador de cambiar el valor
		asesEnLaBaza = 0 ;
		if(carta1[0]=="A") { 
			asesEnLaBaza++; 
			carta1[0]=1 ; 
			sumaBase = carta1[0]; 
			sumaTotal = sumaBase;
			casoAs(asesEnLaBaza, carta1[1]);
		}else{ 
			carta1[0] = Number.parseInt(carta1[0],10);
			sumaBase = carta1[0]; sumaTotal = sumaBase; 
		}
		
		if(carta2[0]=="A") { 
			asesEnLaBaza++; 
			carta2[0]=1 ;
			sumaBase += carta2[0]; 
			sumaTotal = sumaBase; 
			casoAs(asesEnLaBaza, carta2[1]); 
		}else{ 
			carta2[0] = Number.parseInt(carta2[0],10);
			sumaBase = sumaBase + carta2[0]; sumaTotal = sumaBase; 
		}

		console.log(carta1[0] + " y " + carta2[0]);
		console.log("Suma Base: "+ sumaBase + " Suma Total: " + sumaTotal);
		
		// Mostramos el conteo en el menu del jugador:
		document.getElementById('cuentaCartas').innerHTML = " - Suma : " + sumaTotal;

		// Habilitamos o deshabilitamos el botón para separa la mano:

		if ( carta1[0] == carta2[0] ) {  
			document.getElementById('separar').disabled = false;
		}else{
			document.getElementById('separar').disabled = true;
		}

		document.getElementById('separar')

		// Habilitamos o deshabilitamos el botón de doblar:

		if ( (sumaTotal> 8) && (sumaTotal<12) ) {  
			document.getElementById('doblar').disabled = false;
		}else{
			document.getElementById('doblar').disabled = true;
		}

		// Habilitar el botón de apostar en seguro
		let separador = "-";
		let cartaCasa = asiento0[0].split(separador);
		if (cartaCasa[0] == "A") {
			document.getElementById('seguro').disabled = false;
		}else{
			document.getElementById('seguro').disabled = true;
		}

	}
}

function chequeo(idcheckbox){
	console.log(idcheckbox)
	var isChecked = document.getElementById(idcheckbox).checked;
	
	if(isChecked){
		sumaTotal = sumaTotal + 10;
	}else{
		sumaTotal = sumaTotal - 10;
	}

	document.getElementById('cuentaCartas').innerHTML = " - Suma : " + sumaTotal;
}

function casoAs(As, tipoAs){
	console.log(" Tipo As para div de checkbox: " + tipoAs );

	let inputcheckbox = document.createElement('input');
	//inputcheckbox.className = 'inputChkbx';
	inputcheckbox.className = tipoAs;
	inputcheckbox.type = "checkbox";
	inputcheckbox.id = "A" + As + "-1";

	indice = "valordeAs";
	
	document.getElementById(indice).appendChild(inputcheckbox);
		
	document.getElementById(inputcheckbox.id).addEventListener("click", function(){ 
	
		chequeo("A" + As + "-1");
		console.log("Check - A" + As + "-1")
	});

} 

function grabaValorCartas(){ 
	conteoJugador[indiceJugadorActual] = sumaTotal;
	sumaBase = 0 ;
	sumaTotal = 0 ;

	// actualizamos los punteros de los zocalos de naipes
	bancoDeCartas1 = 2;
    bancoDeCartas2 = 2;

}


function setearArraysCero(){
	// Ponemos a cero los arrays de las cartas y los jugadores para una nueva baza
}

/* --------------------------------------- Acciones asociadas a eventos ------------------------------------------------ */
/* ------------------------------------------------ Listeners ------------------------------------------------------------------- */

/* pedircarta doblar plantarse separar seguro */

document.getElementById('pedircarta').addEventListener("click", function(){
	document.getElementById('separar').disabled = true;
	pideCarta('Jpidecarta');
});

document.getElementById('retirarse').addEventListener("click", function(){ 
	
	statusJugador[indiceJugadorActual] = "Retirado";
	apuestas[indiceJugadorActual] = apuestas[indiceJugadorActual] / 2;
	creditos[indiceJugadorActual] += apuestas[indiceJugadorActual];
	pintaresultadoEnPuesto('retirado');
	bancoDeCartas1 = 2;
    bancoDeCartas2 = 2;
	turnos() ;
});

document.getElementById('doblar').addEventListener("click", function(){ 
	pideCarta();
	let descuento = apuestas[indiceJugadorActual];
	creditos[indiceJugadorActual] = creditos[indiceJugadorActual] - apuestas[indiceJugadorActual];
	apuestas[indiceJugadorActual] *= 2;
	document.getElementById('info').innerHTML = "Beat: " + apuestas[indiceJugadorActual] + " - Cash: " + creditos[indiceJugadorActual];

	if (sumaTotal > 21){
		grabaValorCartas();
		statusJugador[indiceJugadorActual] = "Pasa";
		console.log("Status: " + statusJugador[indiceJugadorActual]);
		pintaresultadoEnPuesto('pasa');	
		bancoDeCartas1 = 2;
    	bancoDeCartas2 = 2;
		turnos() ;
	}

	grabaValorCartas();
	bancoDeCartas1 = 2;
    bancoDeCartas2 = 2;
	turnos(); 
});

document.getElementById('plantarse').addEventListener("click", function(){ 
	conteoJugador[indiceJugadorActual] = sumaTotal;
	statusJugador[indiceJugadorActual] = "Plantado";
	pintaresultadoEnPuesto('planta');	
	grabaValorCartas();
	bancoDeCartas1 = 2;
    bancoDeCartas2 = 2;
	turnos(); 
});

document.getElementById('seguro').addEventListener("click", function(){
	
	let seguro = Number.parseInt(apuestas[indiceJugadorActual] / 2);
	creditos[indiceJugadorActual] = Number.parseInt(creditos[indiceJugadorActual] - seguro);
	apuestas[indiceJugadorActual] = Number.parseInt(apuestas[indiceJugadorActual]);
	apuestas[indiceJugadorActual] = Number.parseInt(apuestas[indiceJugadorActual] + seguro);
	document.getElementById('info').innerHTML = "Beat: " + apuestas[indiceJugadorActual] + " - Cash: " + creditos[indiceJugadorActual] + "<br>Seguro! ("+seguro+") - ";
	document.getElementById('seguro').disabled = true;
});

/* --------------------------------- TURNO DE LA BANCA ---------------------------------------- */

function turnoBanca(){

	indiceJugadorActual = 0;
	console.log("Ha llegado el turno de la banca");
	// Veamos que tenemos de valor:
	let carta1 = "";
	let carta2 = "";
	let separador = "-";
	bancoDeCartas1 = 2;
	var naipe = "";
	var limiteBanca = false;
	sumaBase = 0;
	sumaTotal = 0;
	var casilla = "";

	var valor = Math.floor(Math.random()*13);
	var palo = Math.floor(Math.random()*4);
			
	naipe = valores[valor] + "-" + palos[palo];
	asiento0.push(naipe);
	pintaCarta(naipe,0,bancoDeCartas1);
	console.log("Pinta el naipe : " + naipe + " En el banco de cartas: " + bancoDeCartas1 );
	
	carta1 = asiento0[0].split(separador);
	carta2 = asiento0[1].split(separador);

	if(carta1[0]=="J" || carta1[0]=="Q" || carta1[0]=="K" ) { carta1[0] = 10; }
	if(carta2[0]=="J" || carta2[0]=="Q" || carta2[0]=="K" ) { carta2[0] = 10; }

	if(carta1[0]=="A" && carta2[0]=="A") { sumaBase = 2; sumaTotal = sumaBase; }

	if(carta1[0]=="A" && carta2[0]!="A") { sumaBase = 11 + Number.parseInt(carta2[0]); sumaTotal = sumaBase; }

	if(carta1[0]!="A" && carta2[0]=="A") { sumaBase = 11 + Number.parseInt(carta1[0]); sumaTotal = sumaBase; }
	
	if(carta1[0]!="A" && carta2[0]!="A") { sumaTotal = Number.parseInt(carta2[0]) + Number.parseInt(carta1[0]); }

	console.log("La suma antes del bucle es : " + sumaTotal);
	
	// Si tiene Black Jack directamente lo anotamos
	if ( (carta1[0]=="A" && carta2[0]==10 ) || (carta1[0]==10 && carta2[0]=="A" ) ){
		console.log("Black - Jack !!!");
		statusJugador[indiceJugadorActual] = 'BlackJack';
		sumaBase = 21;
		sumaTotal = sumaBase;
		pintaresultadoEnPuesto('blackjack');

	}else{
		// Si no tiene Black Jack, Repetir proceso hasta el límite permitido:
		console.log("Suma de la Banca AQUI: " + sumaTotal);

		do{

			if (sumaTotal<17){

				bancoDeCartas1++;
				valor = Math.floor(Math.random()*13);
				palo = Math.floor(Math.random()*4);
				
				naipe = valores[valor] + "-" + palos[palo];
				asiento0.push(naipe);
				pintaCarta(naipe,0,bancoDeCartas1);
				console.log("Pinta el naipe : " + naipe + " En el banco de cartas: " + bancoDeCartas1 );
		
				carta1 = asiento0[bancoDeCartas1-1].split(separador);

				if(carta1[0]=="J" || carta1[0]=="Q" || carta1[0]=="K" ) { carta1[0] = 10; }
				if(carta1[0]=="A") { carta1[0] = 1; }

				sumaTotal += Number.parseInt(carta1[0]);
				console.log("Suma de la Banca: " + sumaTotal);

			}else{
				if (sumaTotal>21){ 
					pintaresultadoEnPuesto('pasa'); 
					statusJugador[0] = "Pasa"; 
				} else { 
					pintaresultadoEnPuesto('planta'); 
					statusJugador[0] = "Plantado"; 
				}
				limiteBanca = true;
				conteoJugador[0] = sumaTotal;
			}

		}while(!limiteBanca);
		console.log("Baza de la banca realizada");
		
	}

	msg= "<path id='ruta1' d='M20,65 C200,365 512,365 712,65' stroke='transparent' stroke-width=1 fill='transparent'/><text id='textoMensaje' fill='midnightblue' dominant-baseline='central' x='13%' textLength='730' font-family='Verdana' font-size='25'><textPath xlink:href='#ruta1'>Partida finalizada! Click en el MAZO comienza nueva</textPath></text>";
	document.getElementById('mensajes').innerHTML = msg ;

	console.log("Vamos al recuento de la partida");
	console.log("Status Jugadores: " + statusJugador);

	recuentoPartida();

}

function recuentoPartida(){

	/*
		A tener en cuenta :
		jugadores=['asiento0',];
		creditos=[0,];
		apuestas=[0,];
		statusJugador=[0,];
		conteoJugador=[0,];
	*/
	console.log(statusJugador[0]);
	// Verificamos el estatus de la banca y lo comparamos con el resto
	if (statusJugador[0]=='BlackJack'){
		for(let i=1; i<jugadores.length; i++) {
			// como mucho puede haber empate con algun jugador; se le restituye la apuesta:
			if(statusJugador[i]=='BlackJack'){
				creditos[i] =  Number.parseInt(creditos[i] + apuestas[i]);

				casilla = jugadores[i].charAt(jugadores[i].length-1);
				document.getElementById('CashJ'+casilla).innerHTML = creditos[i] ;
				document.getElementById('ApuestaJ'+casilla).innerHTML = " Suma:  " + conteoJugador[i] ;
			}
		}
		
	}

	if (statusJugador[0]=='Pasa'){
		// Si la banca se ha pasado se pagan las apuestas correspondientes:
		for(i=1; i<jugadores.length;i++){

			switch(statusJugador[i]) {
				case 'BlackJack':
					// Se paga 3 a 2
					creditos[i] =  Number.parseInt(creditos[i] + (apuestas[i]*3));

					casilla = jugadores[i].charAt(jugadores[i].length-1);
					document.getElementById('CashJ'+casilla).innerHTML = creditos[i] ;
					document.getElementById('ApuestaJ'+casilla).innerHTML = " Suma:  " + conteoJugador[i] ;
	
				  break;
				case 'Pasa':
					// ¿te has pasado? pues nada, adios perrillas!!
					document.getElementById('CashJ'+i).innerHTML = creditos[i] ;

					casilla = jugadores[i].charAt(jugadores[i].length-1);
					document.getElementById('CashJ'+casilla).innerHTML = creditos[i] ;
					document.getElementById('ApuestaJ'+casilla).innerHTML = " Suma:  " + conteoJugador[i] ;
				
				  break;
				case 'Plantado':
					
					creditos[i] =  Number.parseInt(creditos[i] + (apuestas[i]*2));

					casilla = jugadores[i].charAt(jugadores[i].length-1);
					document.getElementById('CashJ'+casilla).innerHTML = creditos[i] ;
					document.getElementById('ApuestaJ'+casilla).innerHTML = " Suma:  " + conteoJugador[i] ;
				  break;
				default:
				  // code block
			}
		}
	}

	if (statusJugador[0]=='Plantado'){
		
		for(i=1; i<jugadores.length;i++){

			switch(statusJugador[i]) {

				case 'BlackJack':
					// Se paga 3 a 2
					creditos[i] =  Number.parseInt(creditos[i] + (apuestas[i]*3));
					casilla = jugadores[i].charAt(jugadores[i].length-1);
					document.getElementById('CashJ'+casilla).innerHTML = creditos[i] ;
					document.getElementById('ApuestaJ'+casilla).innerHTML = " Suma:  " + conteoJugador[i] ;
				  break;

				case 'Pasa':
					// ¿te has pasado? pues nada, adios perrillas!!
					casilla = jugadores[i].charAt(jugadores[i].length-1);
					document.getElementById('CashJ'+casilla).innerHTML = creditos[i] ;
					document.getElementById('ApuestaJ'+casilla).innerHTML = " Suma:  " + conteoJugador[i] ;
				  break;

				case 'Retirado':
					// ¿te has retirado? Ciao!!
					// En este caso ya esta todo resuelto desde hace un rato
				  break;

				case 'Plantado':
					//comparamos marcadores para pagar la apuesta o bien restituirla
					if(conteoJugador[i]>conteoJugador[0]){
						
						creditos[i] = Number.parseInt(creditos[i] + (apuestas[i]*2));

						casilla = jugadores[i].charAt(jugadores[i].length-1);
						document.getElementById('CashJ'+casilla).innerHTML = creditos[i] ;
						document.getElementById('ApuestaJ'+casilla).innerHTML = " Suma:  " + conteoJugador[i] ;
					}
					
					if(conteoJugador[i]==conteoJugador[0]){
						
						apuestas[i] = Number.parseInt(apuestas[i]);
						creditos[i] =  creditos[i] + apuestas[i];

						casilla = jugadores[i].charAt(jugadores[i].length-1);
						document.getElementById('CashJ'+casilla).innerHTML = creditos[i] ;
						document.getElementById('ApuestaJ'+casilla).innerHTML = " Suma:  " + conteoJugador[i] ;
					}
				  break;

				default:
				  // code block
			  }

		}

	}

}

// Si la situación es clara, pintamos el resultado en el puesto :

function pintaresultadoEnPuesto(resultado){

	let img = document.createElement('img');
	if (resultado=='pasa'){ img.src = "imgs/pasa.png"; }
	if (resultado=='blackjack'){ img.src = "imgs/blackjack.png"; }
	if (resultado=='retirado'){ img.src = "imgs/retirado.png"; }
	if (resultado=='planta'){ img.src = "imgs/planta.png"; }
	img.className = 'resultado';
	img.id = "divResultado"+resultado;
	img.style.zIndex = "100000000"; 
	document.getElementById(jugadores[indiceJugadorActual]).appendChild(img);
	bancoDeCartas1 = 2;
    bancoDeCartas2 = 2;
}

/* ---------- Separar la mano XD ------ XD ------------------------------------------------------- */

document.getElementById('separar').addEventListener("click", function(){ 

	/*
	asiento1 = [];
	asiento11 = [];
	*/
	bancoDeCartas1 = 1;
    bancoDeCartas2 = 1;

	// Conteo de credito disponible y apuestas actualizados : 
	creditos[indiceJugadorActual] = creditos[indiceJugadorActual] - apuestas[indiceJugadorActual];
	apuestas[indiceJugadorActual] = apuestas[indiceJugadorActual] *2;

	// Standart europeo. Si en la mano inicial ha recibido dos cartas del mismo valor, esto estará disponible
	// A efectos de poder tenerlo en cuenta para el conteo de las manos, Actualizamos el Status del Jugador:
	statusJugador[indiceJugadorActual]='SeparaMano';

	document.getElementById('MenuOpciones').hidden= true;

	div = document.getElementById('MenuDivideMano');
	div.hidden = false;

	div.className = MenuDivideMano[indiceJugadorActual];
	console.log(div.className);
	console.log(indiceJugadorActual);
	console.log(menuJugador[indiceJugadorActual]);
	document.getElementById('info').innerHTML = "Beat: " + apuestas[indiceJugadorActual] + " - Cash: " + creditos[indiceJugadorActual];
	 
	 
	 console.log("MANO SEPARADA por el jugador: " + indiceJugadorActual);

	 // Como vamos a contar sobre dos Arrays, Pasamos su segundo naipe a la primera posición del segundo array:
	
	 let cartaParaRehubicar = "";

	 switch (jugadores[indiceJugadorActual]){
		case 'asiento1':
			asiento11[0] = asiento1[1]; asiento1.pop();
			console.log(asiento11 + " - " + asiento1);
			cartaParaRehubicar = asiento11[0];
			  break;
		case 'asiento2':
			asiento21[0] = asiento2[1]; asiento2.pop();
			console.log(asiento21 + " - " + asiento2);
			cartaParaRehubicar = asiento21[0];
			  break;
		case 'asiento3':
			asiento31[0] = asiento3[1]; asiento3.pop();
			console.log(asiento31 + " - " + asiento3);
			cartaParaRehubicar = asiento31[0];
			  break;
		case 'asiento4':
			asiento41[0] = asiento4[1]; asiento4.pop();
			console.log(asiento41 + " - " + asiento4);
			cartaParaRehubicar = asiento41[0];
			  break;
		case 'asiento5':
			asiento51[0] = asiento5[1]; asiento5.pop();
			console.log(asiento51 + " - " + asiento5);
			cartaParaRehubicar = asiento51[0];
			  break;
		case 'asiento6':
			asiento61[0] = asiento6[1]; asiento6.pop();
			console.log(asiento61 + " - " + asiento6);
			cartaParaRehubicar = asiento61[0];
			  break;
		default:
		  console.log('Oooopsss! Algo ha ido mal.');
	 }
	 
	// Y rehubicamos la carta en su correspondiente zocalo:

	switch (jugadores[indiceJugadorActual]) {
		case 'asiento1':
			document.getElementById('div_1_2').innerHTML='';	
			pintaCarta(cartaParaRehubicar,11,1);
			  break;
		case 'asiento2':
			document.getElementById('div_2_2').innerHTML='';
			pintaCarta(cartaParaRehubicar,22,1);
			  break;
		case 'asiento3':
			document.getElementById('div_3_2').innerHTML='';
			pintaCarta(cartaParaRehubicar,33,1);
			  break;
		case 'asiento4':
			document.getElementById('div_4_2').innerHTML='';
			pintaCarta(cartaParaRehubicar,44,1);
			  break;
		case 'asiento5':
			document.getElementById('div_5_2').innerHTML='';
			pintaCarta(cartaParaRehubicar,55,1);
			  break;
		case 'asiento6':
			document.getElementById('div_6_2').innerHTML='';
			pintaCarta(cartaParaRehubicar,66,1);
			  break;
		default:
		  console.log('Oooopsss! Algo ha ido mal.');
	}

	// Ocultamos el primer menú y mostramos el menú para cada mano de este jugador:

	 div = document.getElementById('MenuOpciones');
	 div.hidden = true;

	 div = document.getElementById('MenuDivideMano');
	 div.hidden = false;

	 div.className = menuJugador[indiceJugadorActual];
			console.log(div.className);
			console.log(indiceJugadorActual);
			console.log(menuJugador[indiceJugadorActual]);
	 document.getElementById('info1').innerHTML = "Beat: " + apuestas[indiceJugadorActual] + " - Cash: " + creditos[indiceJugadorActual];

	 console.log("Conteo jugador " + jugadores[indiceJugadorActual] + " 1: " + conteoJugador[indiceJugadorActual]);
	 console.log("Conteo jugador " + jugadores[indiceJugadorActual] + " 2: " + conteoJugador1[indiceJugadorActual]);

	// vamos guardando los valores obtenidos por las cartas en cada mano.
	// tendremos en cuenta las variables: conteoJugador=[0,]; conteoJugador1=[0,];
	// y sobre todo, sumaBase = 0; sumaTotal = 0; || sumaBase1 = 0; sumaTotal1 = 0;


	// pideCartaManoSeparada(true, true);

});

function pideCartaManoSeparada(mano1, mano2){

	// A tener en cuenta: conteoJugador=[0,]; conteoJugador1=[0,];

	var naipe = "";
	var longitudArrayCartas = "";
	var valor = Math.floor(Math.random()*13);
	var palo = Math.floor(Math.random()*4);
			
	naipe = valores[valor] + "-" + palos[palo];

	switch (jugadores[indiceJugadorActual]) {
		case 'asiento0':
			asiento0.push(naipe);
			  break;
		case 'asiento1':
			asiento1.push(naipe);
			  break;
		case 'asiento2':
			asiento2.push(naipe);
			  break;
		case 'asiento3':
			asiento3.push(naipe);
			  break;
		case 'asiento4':
			asiento4.push(naipe);
			  break;
		case 'asiento5':
			asiento5.push(naipe);
			  break;
		case 'asiento6':
			asiento6.push(naipe);
			  break;
		default:
		  console.log('Oooopsss! Algo ha ido mal.');
	}

	// bancoDeCartas1 y bancoDeCartas2 guarda la siguiente posición libre para la carta que pueda pedir
	bancoDeCartas1 = bancoDeCartas1 + 1;

	console.log("Banco de cartas "+ bancoDeCartas1)

	switch (jugadores[indiceJugadorActual]) {
		case 'asiento1':
			pintaCarta(naipe,1,bancoDeCartas1);
			  break;
		case 'asiento2':
			pintaCarta(naipe,2,bancoDeCartas1);
			  break;
		case 'asiento3':
			pintaCarta(naipe,3,bancoDeCartas1);
			  break;
		case 'asiento4':
			pintaCarta(naipe,4,bancoDeCartas1);
			  break;
		case 'asiento5':
			pintaCarta(naipe,5,bancoDeCartas1);
			  break;
		case 'asiento6':
			pintaCarta(naipe,6,bancoDeCartas1);
			  break;
		default:
		  console.log('Oooopsss! Algo ha ido mal.');
	}

	/*  ------------------------------------------------------- aun seguimos */


		let carta1 = "";
		let separador = "-";

		// Vamos a ver que acaba de sacar el jugador :
		switch (jugadores[indiceJugadorActual]) {

			case 'asiento1':
				carta1 = asiento1[asiento1.length-1].split(separador);
				  break;
			case 'asiento2':
				carta1 = asiento2[asiento2.length-1].split(separador);
				  break;
			case 'asiento3':
				carta1 = asiento3[asiento3.length-1].split(separador);
				  break;
			case 'asiento4':
				carta1 = asiento4[asiento4.length-1].split(separador);
				  break;
			case 'asiento5':
				carta1 = asiento5[asiento5.length-1].split(separador);
				  break;
			case 'asiento6':
				carta1 = asiento6[asiento6.length-1].split(separador);
				  break;
			default:
			  console.log('Oooopsss! Algo ha ido mal.');
		}
		
		console.log("Carta nueva : " + carta1);
	
		// Establecemos en 10 el valor de J Q y K
		if(carta1[0]=="J" || carta1[0]=="Q" || carta1[0]=="K" ) { carta1[0] = 10; }
	
		
		// Cada As que encontramos lo anotamos como 1 y damos opciones al jugador de cambiar el valor
		if(carta1[0]=="A") { 
			asesEnLaBaza++; 
			carta1[0]=1 ; 
			casoAs(asesEnLaBaza, carta1[1]);  
		}else{ 
			carta1[0] = Number.parseInt(carta1[0],10);
		}
			sumaBase += carta1[0]; 
			sumaTotal += carta1[0]; 
			
		// Mostramos el conteo en el menu del jugador:
		document.getElementById('cuentaCartas').innerHTML = " - Suma : " + sumaTotal;

		if(vienedeFuncion=='Jpidecarta'){
			if (sumaTotal > 21){
				grabaValorCartas();
				statusJugador[indiceJugadorActual] = "Pasa";
				console.log("Status: " + statusJugador[indiceJugadorActual]);
				pintaresultadoEnPuesto('pasa');
				bancoDeCartas1 = 2;
    			bancoDeCartas2 = 2;
				turnos() ;
			}	
		}
}