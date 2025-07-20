class Personaje {
    constructor(nombre, pSalud, pFuerza, pAgil, nivel, exp) {
        this.nombre = nombre;
        this.pSalud = pSalud;
        this.pSaludMaxima = pSalud;
        this.pFuerza = pFuerza;
        this.pAgil = pAgil;
        this.nivel = nivel;
        this.exp = 0;
    }

    recibirDmg(cantidad) {
        this.pSalud -= cantidad;
        if(this.pSalud >= 0) this.pSalud = 0;
    }

    recibirCura(cantidad) {
        this.pSalud += cantidad;
        if (this.pSalud >= this.pSaludMaxima) this.pSalud = this.pSaludMaxima;
    }

    
}