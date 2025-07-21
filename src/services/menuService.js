const inquirer = require('inquirer').default;
const chalk = require('chalk');

const {
    crearPersonaje,
    listarPersonajes,
    eliminarPersonaje,
    verInventario
} = require('./personajeService');

const { verItemsDelJuego, verItemsDePersonaje } = require('./itemService');

// Submenú para personajes
async function menuPersonajes() {
    let volver = false;

    while (!volver) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: chalk.yellowBright('Menú de Personajes'),
                choices: [
                    'Crear personaje',
                    'Listar personajes',
                    'Ver inventario de un personaje',
                    'Eliminar personaje',
                    'Volver'
                ]
            }
        ]);

        switch (opcion) {
            case 'Crear personaje':
                await crearPersonaje();
                break;
            case 'Listar personajes':
                listarPersonajes();
                break;
            case 'Ver inventario de un personaje':
                await verInventario();
                break;
            case 'Eliminar personaje':
                await eliminarPersonaje();
                break;
            case 'Volver':
                volver = true;
                break;
        }
    }
}

// Submenú para objetos
async function menuObjetos() {
    let volver = false;

    while (!volver) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: chalk.greenBright('Menú de Objetos'),
                choices: [
                    'Ver todos los ítems del juego',
                    'Ver ítems de un personaje',
                    'Volver'
                ]
            }
        ]);

        switch (opcion) {
            case 'Ver todos los ítems del juego':
                verItemsDelJuego();
                break;
            case 'Ver ítems de un personaje':
                await verItemsDePersonaje();
                break;
            case 'Volver':
                volver = true;
                break;
        }
    }
}

// Menú principal
async function mostrarMenuPrincipal() {
    let continuar = true;

    while (continuar) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: chalk.cyanBright('Selecciona una opción principal:'),
                choices: [
                    'Personajes',
                    'Objetos',
                    'Iniciar aventura',
                    'Salir'
                ]
            }
        ]);

        switch (opcion) {
            case 'Personajes':
                await menuPersonajes();
                break;
            case 'Objetos':
                await menuObjetos();
                break;
            case 'Iniciar aventura':
                console.log(chalk.magentaBright('\n🧭 ¡Aventura iniciada! (por implementar)\n'));
                break;
            case 'Salir':
                continuar = false;
                break;
        }
    }
}

module.exports = { mostrarMenuPrincipal };
