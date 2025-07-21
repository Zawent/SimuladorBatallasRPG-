import inquirer from 'inquirer';
import chalk from 'chalk';
import Guerrero from './models/Guerrero.js'; 
import Mago from './models/Mago.js'; 
import Arquero from './models/Arquero.js'; 

const personajes = [];

function mostrarMenuPrincipal() {
    console.clear();
    console.log(chalk.blue.bold('\n=== SIMULADOR RPG ==='));
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Qué deseas hacer?',
                choices: [
                    'Empezar combate',
                    'Personajes',
                    'Habilidades',
                    'Objetos',
                    'Salir'
                ]
            }
        ])
        .then(res => {
            switch (res.opcion) {
                case 'Personajes':
                    menuPersonajes();
                    break;
                case 'Habilidades':
                    menuHabilidades();
                    break;
                case 'Objetos':
                    console.log(chalk.yellow('¡Funcionalidad aún en desarrollo!'));
                    volverAlMenu();
                    break;
                case 'Empezar combate':
                    console.log(chalk.yellow('¡Combate aún en desarrollo!'));
                    volverAlMenu();
                    break;
                case 'Salir':
                    console.log(chalk.green('¡Hasta la próxima, aventurero!'));
                    process.exit();
            }
        });
}

function menuPersonajes() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'accion',
                message: 'Gestión de personajes:',
                choices: ['Crear personaje', 'Listar personajes', 'Eliminar personaje', 'Volver']
            }
        ])
        .then(res => {
            switch (res.accion) {
                case 'Crear personaje':
                    crearPersonaje();
                    break;
                case 'Listar personajes':
                    listarPersonajes();
                    break;
                case 'Eliminar personaje':
                    eliminarPersonaje();
                    break;
                case 'Volver':
                    mostrarMenuPrincipal();
            }
        });
}

function crearPersonaje() {
    inquirer
        .prompt([
            { type: 'input', name: 'nombre', message: 'Nombre del personaje:' },
            {
                type: 'list',
                name: 'clase',
                message: 'Clase del personaje:',
                choices: ['Guerrero', 'Mago', 'Arquero'] 
            }
        ])
        .then(res => {
            let nuevoPersonaje;
            if (res.clase === 'Guerrero') {
                nuevoPersonaje = new Guerrero(res.nombre);
            }else if (res.clase === 'Mago') {
                nuevoPersonaje = new Mago(res.nombre);
            }else if (res.clase === 'Arquero') {
                nuevoPersonaje = new Arquero(res.nombre);
            }
            personajes.push(nuevoPersonaje);
            console.log(chalk.green(`¡${res.nombre} ha sido creado como ${res.clase}!`));
            volverAlMenuPersonajes();
        });
}

function listarPersonajes() {
    if (personajes.length === 0) {
        console.log(chalk.red('No hay personajes creados.'));
    } else {
        console.log(chalk.cyan('\n=== Lista de Personajes ==='));
        personajes.forEach((p, i) => {
            console.log(`${i + 1}. ${p.nombre} (${p.tipo}) - Nivel ${p.nivel}`);
        });
    }
    volverAlMenuPersonajes();
}

function eliminarPersonaje() {
    if (personajes.length === 0) {
        console.log(chalk.red('No hay personajes para eliminar.'));
        return volverAlMenuPersonajes();
    }

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'aEliminar',
                message: 'Selecciona el personaje a eliminar:',
                choices: personajes.map((p, i) => ({
                    name: `${p.nombre} (${p.tipo})`,
                    value: i
                }))
            }
        ])
        .then(res => {
            const eliminado = personajes.splice(res.aEliminar, 1)[0];
            console.log(chalk.yellow(`Se eliminó a ${eliminado.nombre}.`));
            volverAlMenuPersonajes();
        });
}

function menuHabilidades() {
    if (personajes.length === 0) {
        console.log(chalk.red('Debes tener al menos un personaje para ver habilidades.'));
        return volverAlMenu();
    }

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'personaje',
                message: 'Selecciona un personaje:',
                choices: personajes.map((p, i) => ({
                    name: `${p.nombre} (${p.tipo})`,
                    value: i
                }))
            }
        ])
        .then(res => {
            const pj = personajes[res.personaje];
            console.log(chalk.magenta(`\nHabilidades de ${pj.nombre}:`));
            pj.habilidades.forEach((h, i) => {
                const desbloqueada = pj.nivel >= h.nivelMinimo;
                const estado = desbloqueada ? chalk.green('✅') : chalk.gray('🔒');
                console.log(
                    `${estado} ${i + 1}. ${h.nombre} - ${h.descripcion} (Nivel ${h.nivelMinimo})`
                );
            });
            volverAlMenu();
        });
}

function volverAlMenu() {
    inquirer.prompt([{ type: 'confirm', name: 'volver', message: 'Volver al menú principal' }])
        .then(() => mostrarMenuPrincipal());
}

function volverAlMenuPersonajes() {
    inquirer.prompt([{ type: 'confirm', name: 'volver', message: 'Volver a personajes' }])
        .then(() => menuPersonajes());
}

mostrarMenuPrincipal();
