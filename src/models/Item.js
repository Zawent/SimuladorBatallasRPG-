class Item {
    constructor(nombre, descripcion, efecto) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.efecto = efecto;
    }

    usar(personaje) {
        this.efecto(personaje);
    }
}

module.exports = Item;
