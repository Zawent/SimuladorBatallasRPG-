class Personaje {
    constructor(nombre, pSalud, pFuerza, pAgil, nivel = 1, exp = 0) {
        this.nombre = nombre;
        this.pSalud = pSalud;
        this.pSaludMaxima = pSalud;
        this.pFuerza = pFuerza;
        this.pAgil = pAgil;
        this.nivel = nivel;
        this.exp = exp;
    }

    recibirDmg(cantidad) {
        this.pSalud -= cantidad;
        if (this.pSalud < 0) this.pSalud = 0;
    }

    recibirCura(cantidad) {
        this.pSalud += cantidad;
        if (this.pSalud > this.pSaludMaxima) {
            this.pSalud = this.pSaludMaxima;
        }
    }

    subirNivel() {
        this.nivel++;
        this.exp = 0;
        this.pFuerza += 2;
        this.pAgil += 1;
        this.pSaludMaxima += 10;
        this.pSalud = this.pSaludMaxima;
    }

    ganarExperiencia(expGanada) {
        this.exp += expGanada;
        if (this.exp >= 100) {
            this.subirNivel();
        }
    }
}

module.exports = Personaje