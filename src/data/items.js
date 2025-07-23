const Item = require('../models/Item');

const items = [
    new Item('Poción de Vida', 'Restaura 20 puntos de vida.', personaje => {
        personaje.vida = Math.min(personaje.vida + 20, personaje.vidaMax);
        console.log(`${personaje.nombre} recuperó 20 de vida.`);
    }),
    new Item('Poción de Fuerza', 'Aumenta la fuerza en 5 por 3 turnos.', personaje => {
        personaje.pFuerza += 5;
        console.log(`${personaje.nombre} ganó +5 de fuerza temporalmente.`);
    }),

    // Armas
    new Item('Espada de Hierro', 'Aumenta la fuerza del guerrero en 5.', personaje => {
        if (personaje.clase === 'Guerrero') {
            personaje.pFuerza += 5;
            console.log(`${personaje.nombre} empuñó la Espada de Hierro.`);
        }
    }),
    new Item('Arco de Roble', 'Aumenta la fuerza del arquero en 4.', personaje => {
        if (personaje.clase === 'Arquero') {
            personaje.pFuerza += 4;
            console.log(`${personaje.nombre} se equipó el Arco de Roble.`);
        }
    }),
    new Item('Báculo de Madera', 'Aumenta la fuerza del mago en 3.', personaje => {
        if (personaje.clase === 'Mago') {
            personaje.pFuerza += 3;
            console.log(`${personaje.nombre} blandió el Báculo de Madera.`);
        }
    }),

    // Armaduras / ropa
    new Item('Armadura de Cuero', 'Aumenta defensa del guerrero en 3.', personaje => {
        if (personaje.clase === 'Guerrero') {
            personaje.defensa += 3;
            console.log(`${personaje.nombre} se equipó la Armadura de Cuero.`);
        }
    }),
    new Item('Túnica Arcana', 'Reduce daño recibido por el mago en 2.', personaje => {
        if (personaje.clase === 'Mago') {
            personaje.defensa += 2;
            console.log(`${personaje.nombre} se cubrió con la Túnica Arcana.`);
        }
    }),
    new Item('Traje de Cazador', 'Mejora la defensa del arquero en 2.', personaje => {
        if (personaje.clase === 'Arquero') {
            personaje.defensa += 2;
            console.log(`${personaje.nombre} se puso el Traje de Cazador.`);
        }
    })
];

module.exports = items;
