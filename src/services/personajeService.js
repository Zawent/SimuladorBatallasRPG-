const inquirer = require('inquirer');
const chalk = require('chalk');
const Guerrero = require('../models/Guerrero');
const Mago = require('../models/Mago');
const Arquero = require('../models/Arquero');
const { personajes } = require('../data/personajes'); 

async function crearPersonaje() {
    const { nombre } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Nombre del personaje:'
        }
    ]);

    const { clase } = await inquirer.prompt([
        {
            type: 'list',
            name: 'clase',
            message: 'Selecciona una clase:',
            choices: ['Guerrero', 'Mago', 'Arquero']
        }
    ]);

    let nuevoPersonaje;
    switch (clase) {
        case 'Guerrero':
            nuevoPersonaje = new Guerrero(nombre);
            break;
        case 'Mago':
            nuevoPersonaje = new Mago(nombre);
            break;
        case 'Arquero':
            nuevoPersonaje = new Arquero(nombre);
            break;
    }

    personajes.push(nuevoPersonaje);
    console.log(chalk.greenBright(`\n${clase} "${nombre}" creado exitosamente.\n`));
}

function listarPersonajes() {
    if (personajes.length === 0) {
        console.log(chalk.yellow('No hay personajes creados.'));
        return;
    }

    personajes.forEach((p, i) => {
        console.log(`${i + 1}. ${p.nombre} (${p.constructor.name}) - Nivel ${p.nivel}`);
    });
}

async function eliminarPersonaje() {
    if (personajes.length === 0) {
        console.log(chalk.yellow('No hay personajes para eliminar.'));
        return;
    }

    const { index } = await inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: 'Selecciona el personaje a eliminar:',
            choices: personajes.map((p, i) => ({
                name: `${p.nombre} (${p.constructor.name})`,
                value: i
            }))
        }
    ]);

    const eliminado = personajes.splice(index, 1);
    console.log(chalk.redBright(`Personaje ${eliminado[0].nombre} eliminado.`));
}

async function verInventario() {
    if (personajes.length === 0) {
        console.log(chalk.yellow('No hay personajes creados.'));
        return;
    }

    const { index } = await inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: 'Selecciona el personaje:',
            choices: personajes.map((p, i) => ({
                name: `${p.nombre} (${p.constructor.name})`,
                value: i
            }))
        }
    ]);

    const personaje = personajes[index];
    console.log(chalk.cyanBright(`\nInventario de ${personaje.nombre}:`));
    if (!personaje.inventario || personaje.inventario.length === 0) {
        console.log(chalk.gray('Inventario vacío.\n'));
    } else {
        personaje.inventario.forEach((item, i) => {
            console.log(`${i + 1}. ${item.nombre} (${item.tipo})`);
        });
        console.log();
    }
}

function cargarPersonajes() {
    return personajes;
}

const fs = require('fs');
const path = require('path');

const PERSONAJES_FILE = path.join(__dirname, '../data/personajes.json');

function guardarPersonajes(personajes) {
    fs.writeFileSync(PERSONAJES_FILE, JSON.stringify(personajes, null, 2), 'utf-8');
}


module.exports = {
    crearPersonaje,
    listarPersonajes,
    eliminarPersonaje,
    verInventario,
    cargarPersonajes,
    guardarPersonajes
};
