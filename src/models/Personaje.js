class Personaje {
    constructor(nombre, pSalud, pFuerza, pAgil, nivel = 1, exp = 0) {
        if (new.target === Personaje) {
            throw new Error("No se puede instanciar la clase abstracta 'Personaje'. Usa una subclase como Guerrero, Mago o Arquero.");
        }

        this.nombre = nombre;
        this.pSalud = pSalud;
        this.pSaludMaxima = pSalud;
        this.pFuerza = pFuerza;
        this.pAgil = pAgil;
        this.nivel = nivel;
        this.exp = exp;
        this.inventario = []; // 👈 Aquí va el inventario
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

    usarHabilidadEspecial() {
        throw new Error("Debes implementar 'usarHabilidadEspecial()' en la subclase.");
    }

    // 📦 Inventario
    agregarItem(item) {
        this.inventario.push(item);
        console.log(`🔹 ${this.nombre} obtuvo: ${item.nombre}`);
    }

    eliminarItem(nombreItem) {
        const index = this.inventario.findIndex(item => item.nombre === nombreItem);
        if (index !== -1) {
            const eliminado = this.inventario.splice(index, 1)[0];
            console.log(`❌ ${this.nombre} eliminó el ítem: ${eliminado.nombre}`);
        } else {
            console.log(`⚠️ El ítem "${nombreItem}" no está en el inventario.`);
        }
    }

    mostrarInventario() {
        console.log(`📦 Inventario de ${this.nombre}:`);
        if (this.inventario.length === 0) {
            console.log(' (vacío)');
        } else {
            this.inventario.forEach((item, i) => {
                console.log(` ${i + 1}. ${item.nombre} - ${item.descripcion}`);
            });
        }
    }
}
