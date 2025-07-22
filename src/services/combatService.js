const inquirer = require('inquirer');
const chalk = require('chalk');
const { cargarPersonajes, guardarPersonajes } = require('./personajeService');
const { generarEnemigoAleatorio } = require('../utils/enemigosUtils');
const { aplicarLootAlPersonaje } = require('./lootService');
const { calcularDanio, mostrarEstado } = require('../utils/combatUtils');

async function iniciarCombate() {
    console.log('📦 Cargando personajes...');
    const personajes = cargarPersonajes();
    console.log('📦 Personajes cargados:', personajes);

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

    const jugador = personajes.find(p => p.nombre === nombre);
    console.log('👤 Personaje seleccionado:', jugador);

    if (!jugador) {
        console.warn('⚠️ No se encontró el personaje seleccionado.');
        return;
    }

    // Validar vida del jugador
    if (!jugador.vida || jugador.vida <= 0) {
        jugador.vida = jugador.vidaMax || 100; // Valor por defecto si no existe
        console.warn(`⚠️ Vida del jugador estaba mal definida. Se asigna: ${jugador.vida}`);
    }

    const enemigo = generarEnemigoAleatorio(jugador.nivel);
    console.log('👾 Enemigo generado:', enemigo);

    if (!enemigo) {
        console.warn('⚠️ El enemigo no fue generado correctamente.');
        return;
    }

    enemigo.vida = enemigo.pSalud || enemigo.vida || 100;
    console.log(`🔧 Vida del enemigo establecida a ${enemigo.vida}`);

    console.log(chalk.magentaBright(`\n⚔️ ¡Combate iniciado contra un ${enemigo.tipo || enemigo.nombre} nivel ${enemigo.nivel}!`));
    console.log('➡️ Estado inicial: jugador:', jugador.vida, '| enemigo:', enemigo.vida);

    let turnoJugador = true;
    let contadorTurno = 1;

    while (jugador.vida > 0 && enemigo.vida > 0) {
        console.log(`\n🔁 [Turno ${contadorTurno}] Vida del jugador: ${jugador.vida} | Vida del enemigo: ${enemigo.vida}`);
        mostrarEstado(jugador, enemigo);

        if (turnoJugador) {
            const { accion } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'accion',
                    message: chalk.yellow('¿Qué deseas hacer?'),
                    choices: ['⚔️ Atacar', '🧪 Usar objeto', '✨ Habilidad especial']
                }
            ]);

            console.log('🎮 Acción seleccionada:', accion);

            if (accion === '⚔️ Atacar') {
                const habilidadesDisponibles = jugador.habilidades.filter(h => jugador.nivel >= h.nivelMinimo);

                const { habilidadSeleccionada } = await prompt([
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
                    console.log('🧪 Objeto seleccionado:', item);

                    if (item) {
                        item.usar(jugador);
                        jugador.inventario = jugador.inventario.filter(i => i !== item);
                        console.log('📦 Inventario actualizado:', jugador.inventario);
                    }
                }
            }

            else if (accion === '✨ Habilidad especial') {
                try {
                    const dmg = jugador.usarHabilidadEspecial();
                    enemigo.vida -= dmg;
                    console.log('✨ Daño de habilidad especial:', dmg);
                    console.log('🩸 Vida del enemigo tras habilidad:', enemigo.vida);
                    console.log(chalk.magenta(`✨ Usaste tu habilidad especial e hiciste ${dmg} de daño.`));
                } catch (err) {
                    console.log(chalk.red('❌ Error al usar habilidad especial: ' + err.message));
                }
            }
        } else {
            const danio = calcularDanio(enemigo, jugador);
            console.log('💢 Enemigo ataca. Daño:', danio);
            jugador.vida -= danio;
            console.log('🩸 Vida del jugador tras recibir daño:', jugador.vida);
            console.log(chalk.red(`⚔️ ${enemigo.nombre || enemigo.tipo} te atacó e hizo ${danio} de daño.`));
        }

        turnoJugador = !turnoJugador;
        contadorTurno++;
        console.log('🔄 Cambio de turno. Siguiente turno es del:', turnoJugador ? 'Jugador' : 'Enemigo');

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

    jugador.vida = jugador.vidaMax;
    console.log('🛌 Vida del jugador restaurada a:', jugador.vidaMax);
    guardarPersonajes(personajes);
    console.log('💾 Personajes guardados correctamente.');
}

module.exports = { iniciarCombate };
