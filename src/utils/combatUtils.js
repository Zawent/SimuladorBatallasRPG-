const chalk = require('chalk');

function calcularDanio(atacante, defensor) {
  const poderAtaque = atacante.arma?.poder || 5;
  const defensa = defensor.armadura?.defensa || 0;
  const danio = Math.max(1, poderAtaque - defensa);
  return danio;
}

function usarPocion(personaje) {
  const index = personaje.inventario.findIndex(i => i.tipo === 'pocion');
  if (index !== -1) {
    personaje.vida = Math.min(personaje.vida + 30, personaje.vidaMax);
    personaje.inventario.splice(index, 1);
    return true;
  }
  return false;
}

function mostrarEstado(jugador, enemigo) {
  console.log(chalk.gray(`\n❤️ Tu vida: ${jugador.vida}/${jugador.vidaMax} | 🛡️ Enemigo: ${enemigo.vida}/${enemigo.vidaMax}\n`));
}

module.exports = { calcularDanio, usarPocion, mostrarEstado };
