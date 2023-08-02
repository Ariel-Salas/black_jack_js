// 2C= Two of clubs
// 2D= two of diaminds
// 2H= two of hearts
// 2S= two of spades


let deck        =[];
const tipos     =['C', 'D', 'H', 'S'];
const especiales=['A','J','Q','K'];

let puntosJugador     = 0;
    puntosComputadora = 0;


//referencias de HTML

const btnPedir= document.querySelector('#btnPedir');
const btnDetener= document.querySelector('#btnDetener');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#Computadora-cartas');

let puntosHTML =document.querySelectorAll('small');




//console.log(btnPedir);

//Esta función crea un nuevo deck
const crearDeck= ()=> {
    for(let i=2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo)
        }
    }

    //console.log(deck)
    deck=_.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//Esta funcion permite tomar carta
const pedirCarta= ()=> {
    const carta =deck.pop();

    if(deck.length===0){
        throw 'No hay cartas en el deck';
    }

    //console.log(carta);
    //console.log(deck);
    return carta;
}

//Esta funcion obtiene el valor de la carta
const valorCarta= (carta)=>{
    const valor =  carta.substring(0, carta.length-1);
    //operadores ternarios anidados 
    return (isNaN(valor))? ((valor==='A')? 11:10):valor*1;


    //const valor =  carta.substring(0, carta.length-1);
    // if(isNaN(valor)){
    //    puntos =(valor==='A') ? 11: 10;
    // } else{
    //     puntos= valor*1;
    // }
}

//Turno de la computadora

const turnoComputadora=(puntosJugador)=> {

     do{

    const carta=pedirCarta();
    puntosComputadora=puntosComputadora+valorCarta(carta);
    //console.log(puntosJugador);
    puntosHTML[1].innerText=puntosComputadora;
    const imgCarta= document.createElement('img');
    imgCarta.src  = `assets/cartas/${carta}.png`;
    divCartasComputadora.append(imgCarta);
    imgCarta.classList.add('carta');

        if(puntosJugador > 21 ){
            break;
        }
    }while( (puntosComputadora < puntosJugador)&& (puntosJugador<=21));

    setTimeout(() => {
        
    
        if(puntosComputadora===puntosJugador){
            alert('Nadie gana');
        }else if (puntosJugador> 21 ){
            alert('Computadora gana')
        }else if (puntosComputadora>21){
            alert('Jugador gana')
        } else {
            alert('Computadora gana')
        }

    }, 100);
    
}
const valor = valorCarta(pedirCarta());
//console.log({valor});

//Eventos, si se quiere escuchar algun evento debe ser como la siguiente sintaxis

btnPedir.addEventListener('click', ()=>{
    const carta=pedirCarta();
    puntosJugador=puntosJugador+valorCarta(carta);
    //console.log(puntosJugador);
    puntosHTML[0].innerText=puntosJugador;
    const imgCarta= document.createElement('img');
    imgCarta.src  = `assets/cartas/${carta}.png`;
    divCartasJugador.append(imgCarta);
    imgCarta.classList.add('carta');
    

    if(puntosJugador> 21 ){

        console.warn('Perdiste');
        btnPedir.disabled=true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    }else if (puntosJugador===21){
        console.warn('21!')
        btnPedir.disabled=true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);


    }



});



btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    
    turnoComputadora(puntosJugador);

});


// turnoComputadora(21);