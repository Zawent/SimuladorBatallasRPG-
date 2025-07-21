const Personaje = require('./Personaje');
const Habilidad = require('./Habilidad');

class Goblin extends Personaje {
    constructor(nivel) {
        super('Goblin', 45 + nivel * 4, 12 + nivel, 3 + nivel * 0.5);
        this.tipo = 'Enemigo';const Personaje = require('./Personaje');
        const Habilidad = require('./Habilidad');
        
        class Goblin extends Personaje {
            constructor(nivel) {
                super('Goblin', 45 + nivel * 4, 12 + nivel, 3 + nivel * 0.5);
                this.tipo = 'Enemigo';
        
                this.habilidades = [
                    new Habilidad(
                        'Puñalada',
                        'Un golpe rápido. Daño: fuerza base.',
                        (origen, objetivo) => {
                            const dmg = origen.pFuerza;
                            objetivo.recibirDmg(dmg);
                            console.log(`${origen.nombre} usó Puñalada causando ${dmg} de daño.`);
                        },
                        1
                    ),
                    new Habilidad(
                        'Ataque Sorpresa',
                        'Ataque doble con probabilidad del 50%. Daño: fuerza * 1.5.',
                        (origen, objetivo) => {
                            if (Math.random() < 0.5) {
                                const dmg = Math.floor(origen.pFuerza * 1.5);
                                objetivo.recibirDmg(dmg);
                                console.log(`${origen.nombre} usó Ataque Sorpresa causando ${dmg} de daño.`);
                            } else {
                                console.log(`${origen.nombre} falló su Ataque Sorpresa.`);
                            }
                        },
                        2
                    )
                ];
            }
        }
        
        module.exports = Goblin;
        

        this.habilidades = [
            new Habilidad(
                'Puñalada',
                'Un golpe rápido. Daño: fuerza base.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Puñalada causando ${dmg} de daño.`);
                },
                1
            ),
            new Habilidad(
                'Ataque Sorpresa',
                'Ataque doble con probabilidad del 50%. Daño: fuerza * 1.5.',
                (origen, objetivo) => {
                    if (Math.random() < 0.5) {
                        const dmg = Math.floor(origen.pFuerza * 1.5);
                        objetivo.recibirDmg(dmg);
                        console.log(`${origen.nombre} usó Ataque Sorpresa causando ${dmg} de daño.`);
                    } else {
                        console.log(`${origen.nombre} falló su Ataque Sorpresa.`);
                    }
                },
                2
            )
        ];
    }
}

module.exports = Goblin;
