const Personaje = require('./Personaje');
const Habilidad = require('./Habilidad');
const Item = require('./Item');
const items = require('../data/items');

class Esqueleto extends Personaje {
    constructor(nivel) {
        super(`Esqueleto Nv${nivel}`, nivel, 100, 22, 18);
        this.tipo = 'Esqueleto';

        // Inicializa habilidades e ítems
        this.agregarHabilidades(nivel);
        this.agregarItems(nivel);
    }

    agregarHabilidades(nivel) {
        this.habilidades = [
            new Habilidad(
                'Corte de Hueso',
                'Ataque básico del esqueleto con fuerza moderada.',
                (origen, objetivo) => {
                    const dmg = 12 + nivel;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Corte de Hueso causando ${dmg} de daño a ${objetivo.nombre}`);
                },
                0
            ),
            new Habilidad(
                'Embate Descompuesto',
                'Ataque fuerte con huesos desprendidos. Requiere nivel 2.',
                (origen, objetivo) => {
                    const dmg = 15 + nivel;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Embate Descompuesto causando ${dmg} de daño a ${objetivo.nombre}`);
                },
                2
            )
        ];
    }

    agregarItems(nivel) {
        const pocion = items.find(i => i.nombre === 'Poción de Vida');

        const espadaOxidada = new Item(
            `Espada Oxidada`,
            `Espada antigua que inflige ${10 + nivel} de daño.`,
            personaje => {
                personaje.pFuerza += 10 + nivel;
                console.log(`${personaje.nombre} empuñó la Espada Oxidada.`);
            }
        );

        this.inventario = [pocion, pocion];

        this.equipo = {
            arma: espadaOxidada,
            armadura: null
        };

        this.equipo.arma.usar(this);
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

module.exports = Esqueleto;
