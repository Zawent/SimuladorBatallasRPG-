const Personaje = require('./Personaje');
const Habilidad = require('./Habilidad');
const Item = require('./Item');
const items = require('../data/items'); 

class Goblin extends Personaje {
    constructor(nivel) {
        super(`Goblin Nv${nivel}`, 70, 12, 8);
        this.tipo = 'Goblin';

        // Habilidades (mismo estilo que Guerrero)
        this.habilidades = [
            new Habilidad(
                'Ataque Rápido',
                'Un ataque veloz que hace poco daño.',
                (origen, objetivo) => {
                    const dmg = 10 + origen.nivel;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Ataque Rápido causando ${dmg} de daño a ${objetivo.nombre}`);
                },
                0
            ),
            new Habilidad(
                'Golpe Bajo',
                'Un ataque sucio que ignora parte de la defensa.',
                (origen, objetivo) => {
                    const dmg = 12 + origen.nivel;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Golpe Bajo causando ${dmg} de daño a ${objetivo.nombre}`);
                },
                2
            )
        ];

        // Obtener ítems predefinidos
        const pocion = items.find(i => i.nombre === 'Poción de Vida');

        // Crear ítem personalizado si no existe
        const daga = new Item(`Daga de Goblin`, `Un cuchillo oxidado que inflige ${8 + nivel} de daño.`, p => {
            p.pFuerza += 8 + nivel;
            console.log(`${p.nombre} usa la Daga de Goblin.`);
        });

        // Inventario y equipo
        this.inventario = [pocion, pocion];
        this.equipo = {
            arma: daga,
            armadura: null
        };
    }

    usarHabilidad(index, objetivo) {
        const habilidad = this.habilidades[index];
        if (!habilidad) return;
        if (this.nivel < habilidad.nivelMinimo) return;
        habilidad.usar(this, objetivo);
    }
}

module.exports = Goblin;
