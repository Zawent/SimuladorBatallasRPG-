const chalk = require('chalk');

// Lista de posibles ítems que el jugador puede recibir
const lootDisponible = [
  {
    nombre: 'Espada de Fuego',
    tipo: 'arma',
    danio: 10,
    usar: function (jugador) {
      jugador.ataque += this.danio;
      console.log(chalk.yellow(`🔥 Equipaste ${this.nombre}, tu ataque aumentó en ${this.danio}.`));
    }
  },
  {
    nombre: 'Armadura de Acero',
    tipo: 'armadura',
    defensa: 8,
    usar: function (jugador) {
      jugador.defensa = (jugador.defensa || 0) + this.defensa;
      console.log(chalk.blue(`🛡️ Equipaste ${this.nombre}, tu defensa aumentó en ${this.defensa}.`));
    }
  },
  {
    nombre: 'Poción de Curación',
    tipo: 'pocion',
    curacion: 30,
    usar: function (jugador) {
      const vidaAntes = jugador.vida;
      jugador.vida = Math.min(jugador.vida + this.curacion, jugador.vidaMax);
      console.log(chalk.green(`🧪 Usaste ${this.nombre}, recuperaste ${jugador.vida - vidaAntes} de vida.`));
    }
  }
];

// Función que da un ítem aleatorio al jugador
function aplicarLootAlPersonaje(jugador) {
  const loot = lootDisponible[Math.floor(Math.random() * lootDisponible.length)];
  jugador.inventario = jugador.inventario || [];
  jugador.inventario.push(loot);

  console.log(chalk.green(`🎁 Has obtenido un objeto: ${loot.nombre}`));
}

module.exports = {
  aplicarLootAlPersonaje
};
