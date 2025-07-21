const Personaje = require('./Personaje');
const Habilidad = require('./Habilidad');

class Esqueleto extends Personaje {
    constructor(nivel) {
        super('Esqueleto', 50 + nivel * 5, 10 + nivel, 2 + nivel * 0.5);
        this.tipo = 'Enemigo';

        this.habilidades = [
            new Habilidad(
                'Golpe Óseo',
                'Un golpe débil con el hueso. Daño: fuerza base.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Golpe Óseo causando ${dmg} de daño.`);
                },
                1
            ),
            new Habilidad(
                'Lluvia de Huesos',
                'Ataque más fuerte. Daño: fuerza + 3. Requiere nivel 2.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza + 3;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Lluvia de Huesos causando ${dmg} de daño.`);
                },
                2
            )
        ];
    }
}

module.exports = Esqueleto;
