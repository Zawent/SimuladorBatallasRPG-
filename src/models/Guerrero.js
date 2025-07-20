const Personaje = require('./Personaje');
const Habilidad = require('./Habilidad');

class Guerrero extends Personaje {
    constructor(nombre) {
        super(nombre, 120, 15, 5);
        this.tipo = 'Guerrero';

        this.habilidades = [
            new Habilidad(
                'Ataque Básico',
                'Golpe directo con fuerza base + nivel.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza + origen.nivel;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Ataque Básico causando ${dmg} de daño a ${objetivo.nombre}`);
                },
                1
            ),
            new Habilidad(
                'Ataque Fuerte',
                'Ataque poderoso con 75% de probabilidad de acierto. Daño: fuerza * 2.',
                (origen, objetivo) => {
                    const acierto = Math.random() < 0.75;
                    if (acierto) {
                        const dmg = origen.pFuerza * 2;
                        objetivo.recibirDmg(dmg);
                        console.log(`${origen.nombre} usó Ataque Fuerte causando ${dmg} de daño a ${objetivo.nombre}`);
                    } else {
                        console.log(`${origen.nombre} falló su Ataque Fuerte.`);
                    }
                },
                1
            ),
            new Habilidad(
                'Corte Giratorio',
                'Ataque a todos los enemigos. Requiere nivel 3.',
                (origen, objetivo) => {
                    const dmg = origen.pFuerza + 5;
                    objetivo.recibirDmg(dmg);
                    console.log(`${origen.nombre} usó Corte Giratorio causando ${dmg} de daño a ${objetivo.nombre}`);
                },
                3
            ),
            new Habilidad(
                'Grito de Guerra',
                'Aumenta la fuerza del guerrero en +5 por 3 turnos. Requiere nivel 5.',
                (origen, objetivo) => {
                    origen.pFuerza += 5;
                    console.log(`${origen.nombre} usó Grito de Guerra y aumentó su fuerza en +5 por 3 turnos.`);
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

module.exports = Guerrero;
