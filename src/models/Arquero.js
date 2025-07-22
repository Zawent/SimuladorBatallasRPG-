const Personaje = require('./Personaje');
const Habilidad = require('./Habilidad');
const items = require('../data/items');

class Arquero extends Personaje {
    constructor(nombre) {
        super(nombre, 100, 12, 4); // Buen balance entre ataque y defensa
        this.tipo = 'Arquero';

        this.inventario = [
            items.find(i => i.nombre === 'Arco de Roble'),
            items.find(i => i.nombre === 'Traje de Cazador'),
            items.find(i => i.nombre === 'Poción de Vida'),
            items.find(i => i.nombre === 'Poción de Vida')
        ];

        this.habilidades = [
            new Habilidad(
                'Disparo Preciso',
                'Flecha con alta precisión, daño: fuerza + 3.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza + 3;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Disparo Preciso causando ${dmg} de daño a ${objetivo.nombre}`);
                },
                1
            ),
            new Habilidad(
                'Lluvia de Flechas',
                'Ataque a múltiples enemigos. Daño reducido. Requiere nivel 2.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} lanzó Lluvia de Flechas causando ${dmg} de daño a ${objetivo.nombre}`);
                },
                2
            ),
            new Habilidad(
                'Trampa de Cuerda',
                'Inmoviliza al enemigo (reduce su fuerza a la mitad por 2 turnos). Requiere nivel 3.',
                (origen, objetivo) => {
                    objetivo.pFuerza = Math.floor(objetivo.pFuerza / 2);
                    console.log(`${origen.nombre} atrapó a ${objetivo.nombre} con una cuerda. Fuerza reducida a la mitad.`);
                },
                3
            ),
            new Habilidad(
                'Flecha Explosiva',
                'Daño masivo con posibilidad de fallar (60% acierto). Requiere nivel 5.',
                (origen, objetivo) => {
                    const acierto = Math.random() < 0.6;
                    if (acierto) {
                        const dmg = origen.pFuerza * 2 + 5;
                        objetivo.recibirDmg(dmg);
                        console.log(`${origen.nombre} disparó una Flecha Explosiva causando ${dmg} de daño a ${objetivo.nombre}`);
                    } else {
                        console.log(`${origen.nombre} falló la Flecha Explosiva.`);
                    }
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
}

module.exports = Arquero;
