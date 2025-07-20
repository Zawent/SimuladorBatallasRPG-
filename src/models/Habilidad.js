class Habilidad {
    constructor(nombre, descripcion, efecto, nivelMinimo = 1) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.efecto = efecto;
        this.nivelMinimo = nivelMinimo;
    }

    usar(origen, objetivo) {
        this.efecto(origen, objetivo);
    }
}

module.exports = Habilidad;
