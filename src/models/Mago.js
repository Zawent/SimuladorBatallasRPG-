const Personaje = require('./Personaje');
const Habilidad = require('./Habilidad');
const items = require('../data/items');

class Mago extends Personaje {
    constructor(nombre) {
        super(nombre, 80, 10, 3);
        this.tipo = 'Mago';

        this.inventario = [
            items.find(i => i.nombre === 'Báculo de Madera'),
            items.find(i => i.nombre === 'Túnica Arcana'),
            items.find(i => i.nombre === 'Poción de Vida'),
            items.find(i => i.nombre === 'Poción de Fuerza')
        ];

        this.habilidades = [
            new Habilidad(
                'Bola de Fuego',
                'Lanza una bola de fuego que causa daño: fuerza + nivel * 2.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza + origen.nivel * 2;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} lanzó Bola de Fuego causando ${dmg} de daño a ${objetivo.nombre}`);
                },
                1
            ),
            new Habilidad(
                'Rayo de Hielo',
                'Daño base y reduce fuerza del enemigo. Requiere nivel 2.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza + 5;
                    objetivo.recibirDmg(dmg);
                    objetivo.pFuerza -= 2;
                    console.log(`${origen.nombre} lanzó Rayo de Hielo causando ${dmg} de daño y reduciendo la fuerza de ${objetivo.nombre}.`);
                },
                2
            ),
            new Habilidad(
                'Escudo Mágico',
                'Aumenta la defensa en +5 durante 3 turnos. Requiere nivel 3.',
                (origen, objetivo) => {
                    origen.defensa += 5;
                    console.log(`${origen.nombre} activó Escudo Mágico. Defensa aumentada +5 por 3 turnos.`);
                },
                3
            ),
            new Habilidad(
                'Tormenta Arcana',
                'Daño masivo a todos los enemigos. Requiere nivel 5.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza * 2 + 10;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} invocó Tormenta Arcana causando ${dmg} de daño a ${objetivo.nombre}.`);
                },
                5
            )
        ];
    }

    usarHabilidad(index, objetivo) {
        const habilidad = this.habilidades[index];

        if (!habilidad) {
            return console.log(`${this.nombre} no tiene esa habilidad.`);
        }

        if (this.nivel < habilidad.nivelMinimo) {
            return console.log(`${this.nombre} aún no ha desbloqueado la habilidad "${habilidad.nombre}".`);
        }

        habilidad.usar(this, objetivo);
    }

    recibirDmg(dmg) {
        this.vida -= dmg;
        if (this.vida < 0) this.vida = 0;
    }

}

module.exports = Mago;
