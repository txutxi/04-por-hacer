const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error("Error guardando datos".red, err);
        //else console.log(`OK. Tarea guardada `.green);
    });

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        //descripcion: descripcion,
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}



const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


    //  fs.readFile('db/data.json', 'utf8', (err, data) => {
    //     if (err) throw new Error('No se pudo recuperar datos');
    //     console.log(JSON.stringify(data));
    // });

    //console.log(listadoPorHacer);
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }


}



const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}










module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}