const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const contactos = require('../sample.json');

router.get('/', (req, res) => {
    res.json(contactos);
});

router.post('/', (req, res) => {
    const id = contactos.length + 1;
    const { nombre, apellido, telefono} = req.body;
    const newcont = { ...req.body, id };
    if (id && nombre && apellido && telefono ) {
        contactos.push(newcont);
        res.json(contactos);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono } = req.body;
    if (id && nombre && apellido && telefono ) {
        _.each(contactos, (cont, i) => {
            if (cont.id === id) {
                cont.nombre = nombre;
                cont.apellido = apellido;
                cont.telefono = telefono;
                
            }
        });
        res.json(contactos);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(contactos, (cont, i) => {
            if (cont.id == id) {
                contactos.splice(i, 1);
            }
        });
        res.json(contactos);
    }
});

module.exports = router;