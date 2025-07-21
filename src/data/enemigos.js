const Esqueleto = require('../models/Esqueleto');
const Duende = require('../models/Duende');


const enemigos = [
    new Esqueleto(1),
    new Esqueleto(2),
    new Duende(1),
    new Duende(2),

];

module.exports = enemigos;
