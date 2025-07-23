const inquirer = require('inquirer');
const chalk = require('chalk');
const { cargarPersonajes, guardarPersonajes } = require('./personajeService');
const { generarEnemigoAleatorio } = require('../utils/enemigosUtils');
const { aplicarLootAlPersonaje } = require('./lootService');
const { calcularDanio, mostrarEstado } = require('../utils/combatUtils');

async function iniciarCombate() {
    console.log('📦 Cargando personajes...');
    const personajes = cargarPersonajes();

    if (!personajes || personajes.length === 0) {
        console.log(chalk.red('\n❌ No hay personajes disponibles. Crea uno primero.\n'));
        return;
    }

    const { nombre } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nombre',
            message: chalk.cyan('Selecciona un personaje para el combate:'),
            choices: personajes.map(p => p.nombre)
        }
    ]);

    let jugador = personajes.find(p => p.nombre === nombre);


    if (!jugador) {
        console.warn('⚠️ No se encontró el personaje seleccionado.');
        return;
    }

    // Validar vida
    if (!jugador.pSalud || jugador.pSalud <= 0) {
        jugador.pSalud = jugador.pSaludMaxima || 100;
        console.warn(`⚠️ Vida del jugador estaba mal definida. Se asigna: ${jugador.pSalud}`);
    }
    jugador.vida = jugador.pSalud;

    const enemigo = generarEnemigoAleatorio(jugador.nivel);

    if (!enemigo) {
        console.warn('⚠️ El enemigo no fue generado correctamente.');
        return;
    }

    enemigo.vida = enemigo.pSalud || enemigo.vida || 100;
    console.log(chalk.magentaBright(`\n⚔️ ¡Combate iniciado contra un ${enemigo.tipo || enemigo.nombre} nivel ${enemigo.nivel}!`));
    console.log(`➡️ Estado inicial: jugador: ${jugador.vida}/${jugador.pSaludMaxima} | enemigo: ${enemigo.vida}/${enemigo.pSaludMaxima}`);

    let turnoJugador = true;
    let contadorTurno = 1;

    while (jugador.vida > 0 && enemigo.vida > 0) {
        console.log(`\n🔁 [Turno ${contadorTurno}] Vida del jugador: ${jugador.vida}/${jugador.pSaludMaxima} | Vida del enemigo: ${enemigo.vida}/${enemigo.pSaludMaxima}`);
        mostrarEstado(jugador, enemigo);

        if (turnoJugador) {
            const { accion } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'accion',
                    message: chalk.yellow('¿Qué deseas hacer?'),
                    choices: ['⚔️ Atacar', '🧪 Usar objeto', '🏃‍♂️ Huir del combate']
                }
            ]);

            console.log('🎮 Acción seleccionada:', accion);

            if (accion === '⚔️ Atacar') {
                const habilidadesDisponibles = jugador.habilidades.filter(h => jugador.nivel >= h.nivelMinimo);

                const { habilidadSeleccionada } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'habilidadSeleccionada',
                        message: '⚔️ ¿Qué habilidad deseas usar?',
                        choices: habilidadesDisponibles.map((h, idx) => ({
                            name: `${h.nombre} - ${h.descripcion}`,
                            value: idx
                        }))
                    }
                ]);

                jugador.usarHabilidad(habilidadSeleccionada, enemigo);
            }

            else if (accion === '🧪 Usar objeto') {
                if (!jugador.inventario || jugador.inventario.length === 0) {
                    console.log(chalk.red('🚫 No tienes objetos en el inventario.'));
                } else {
                    const { itemSeleccionado } = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'itemSeleccionado',
                            message: 'Selecciona un objeto:',
                            choices: jugador.inventario.map(i => i.nombre)
                        }
                    ]);

                    const item = jugador.inventario.find(i => i.nombre === itemSeleccionado);

                    if (item) {
                        item.usar(jugador);
                        jugador.inventario = jugador.inventario.filter(i => i !== item);
                        console.log('📦 Inventario actualizado:', jugador.inventario);
                    }
                }
            }

            else if (accion === '🏃‍♂️ Huir del combate') {
                const chance = Math.random();
            
                if (chance < 0.5) {
                    console.log(chalk.green.bold('\n🏃‍♂️ ¡Lograste huir exitosamente del combate!\n'));
                    return;
                } else {
                    console.log(chalk.red.bold('\n🚫 No pudiste huir. ¡El combate continúa!\n'));
                }
            }
        } else {
            const habilidadesDisponibles = enemigo.habilidades?.filter(h => enemigo.nivel >= h.nivelMinimo) || [];

            if (habilidadesDisponibles.length > 0) {
                const habilidadAleatoria = habilidadesDisponibles[Math.floor(Math.random() * habilidadesDisponibles.length)];

                try {
                    if (typeof enemigo.usarHabilidad === 'function') {
                        const indice = enemigo.habilidades.indexOf(habilidadAleatoria);
                        enemigo.usarHabilidad(indice, jugador);
                        console.log(chalk.red(`🧟‍♂️ El ${enemigo.nombre || enemigo.tipo} usó ${habilidadAleatoria.nombre} contra ti.`));
                    } else {
                        console.log(chalk.yellow('⚠️ El enemigo no tiene método usarHabilidad definido. Se usará ataque básico.'));
                        const danio = calcularDanio(enemigo, jugador);
                        jugador.vida -= danio;
                        console.log(chalk.red(`⚔️ ${enemigo.nombre || enemigo.tipo} te atacó e hizo ${danio} de daño.`));
                    }
                } catch (err) {
                    console.log(chalk.red('❌ Error al usar habilidad enemiga:'), err.message);
                }
            } else {
                const danio = calcularDanio(enemigo, jugador);
                jugador.vida -= danio;
                console.log(chalk.red(`⚔️ ${enemigo.nombre || enemigo.tipo} te atacó e hizo ${danio} de daño.`));
            }
        }


        turnoJugador = !turnoJugador;
        contadorTurno++;
        await new Promise(res => setTimeout(res, 500));
    }

    console.log('\n🎯 Resultado final: vida jugador:', jugador.vida, 'vida enemigo:', enemigo.vida);

    if (jugador.vida <= 0) {
        console.log(chalk.red.bold('\n💀 Has sido derrotado...\n'));
    } else {
        console.log(chalk.green.bold('\n🎉 ¡Has vencido al enemigo!\n'));
        aplicarLootAlPersonaje(jugador);
        const exp = 50 + Math.floor(Math.random() * 50);
        jugador.experiencia += exp;
        console.log(chalk.cyan(`🏅 Ganaste ${exp} puntos de experiencia.`));

        if (jugador.experiencia >= jugador.nivel * 100) {
            jugador.nivel += 1;
            jugador.experiencia = 0;
            console.log(chalk.blueBright(`🔺 ¡Subiste a nivel ${jugador.nivel}!`));
        }
    }

    jugador.vida = jugador.pSaludMaxima;
    console.log('🛌 Vida del jugador restaurada a:', jugador.pSaludMaxima);
    guardarPersonajes(personajes);
    console.log('💾 Personajes guardados correctamente.');
}

module.exports = { iniciarCombate };
