const Esqueleto = require('../models/Esqueleto');
const Guerrero = require('../models/Guerrero');
const Mago = require('../models/Mago');
const Arquero = require('../models/Arquero');
const Duende = require('../models/Duende');

function generarEnemigoAleatorio(nivelJugador) {
    console.log('📦 Generando enemigo aleatorio...');
    const clases = [Mago, Guerrero, Arquero, Esqueleto, Duende];
    const ClaseAleatoria = clases[Math.floor(Math.random() * clases.length)];

    console.log('🔍 Clase seleccionada:', ClaseAleatoria.name);

    const enemigo = new ClaseAleatoria('Enemigo');
    console.log('🧪 Enemigo creado inicialmente:', enemigo);

    enemigo.nivel = nivelJugador;

    // Validaciones y ajustes defensivos
    if (typeof enemigo.pSaludMaxima !== 'number') {
        console.warn('⚠️ pSaludMaxima no es un número:', enemigo.pSaludMaxima);
        enemigo.pSaludMaxima = 100;
    }
    if (typeof enemigo.pFuerza !== 'number') {
        console.warn('⚠️ pFuerza no es un número:', enemigo.pFuerza);
        enemigo.pFuerza = 10;
    }
    if (typeof enemigo.pAgil !== 'number') {
        console.warn('⚠️ pAgil no es un número:', enemigo.pAgil);
        enemigo.pAgil = 3;
    }

    enemigo.pSaludMaxima += (nivelJugador - 1) * 10;
    enemigo.pFuerza += (nivelJugador - 1) * 2;
    enemigo.pAgil += (nivelJugador - 1);
    enemigo.pSalud = enemigo.pSaludMaxima;

    console.log('✅ Enemigo final generado:', enemigo);

    return enemigo;
}

module.exports = { generarEnemigoAleatorio };
