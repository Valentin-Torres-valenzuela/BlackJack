
(miModulo = () => {
    'use strict'
// 2C = 2 TREBOLES
// 2H = 2 CORAZONESS
// 2D = 2 DIAMANTES 
// 2S = 2 ESPADAS

let deck = [];
const tipos = ['C', 'D', 'S', 'H'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del DOM

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const smalls = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

// TODO esta funcion crea un nuevo deck
const crearDeck = () => {
    for (let i = 2; i <= 10; i++){
        // TODO El for of se va a ejecutar una vez por cada tipo
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
        // console.log(deck);
        deck = _.shuffle(deck);
        
        return deck;
}

crearDeck();

// TODO esta funcion me permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay mas cartas'
    }

    const carta = deck.pop();

    return carta;
}

// pedirCarta();

// TODO Esta funcion me permite extraer el valor de las cartas
// const valorCarta = (carta) => {
//     const valor = carta.substring(0, carta.length - 1);
//     let puntos = 0;
//     if (isNaN(valor)) {
//         puntos = (valor === 'A') ? 11 : 10;
//     } else {
//         puntos = valor * 1;
//     }
//     console.log(puntos);
// }

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
    (valor === 'A') ? 11 || 1 : 10
    : valor * 1
}

const turnoComputadora = (puntosMinimos) => {
    do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    smalls[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `Assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
        break;
    }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert ('Empate');
        } else if (puntosMinimos > 21){
            alert ('Perdiste');
        } else if (puntosComputadora > 21) {
            alert('Ganaste');
        } else {
            'Computadora gana';
        }
    }, 100);
}

// TODO eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    smalls[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.log('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if(puntosJugador === 21){
        console.log('genial')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    smalls[0].innerText = 0;
    smalls[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
});

})();

