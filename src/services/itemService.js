const inquirer = require('inquirer').default;
const chalk = require('chalk');
const items = require('../data/items');
const { personajes } = require('../data/personajes');

function verItemsDelJuego() {
    console.log(chalk.greenBright('\n🧱 Ítems disponibles en el juego:\n'));
    items.forEach((item, i) => {
        console.log(`${i + 1}. ${item.nombre} - ${item.descripcion}`);
    });
}

async function verItemsDePersonaje() {
    if (personajes.length === 0) {
        console.log(chalk.red('\nNo hay personajes creados.\n'));
        return;
    }

    const { nombre } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nombre',
            message: 'Selecciona un personaje:',
            choices: personajes.map(p => p.nombre)
        }
    ]);

    const personaje = personajes.find(p => p.nombre === nombre);

    console.log(chalk.blueBright(`\n🎒 Inventario de ${personaje.nombre}:\n`));
    if (personaje.inventario.length === 0) {
        console.log('El personaje no tiene ítems en su inventario.\n');
    } else {
        personaje.inventario.forEach((item, i) => {
            console.log(`${i + 1}. ${item.nombre} - ${item.descripcion}`);
        });
    }
}

module.exports = {
    verItemsDelJuego,
    verItemsDePersonaje
};
