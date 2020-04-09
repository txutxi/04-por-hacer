const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

//console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        //console.log('Crear por hacer');
        let tarea = porHacer.crear(argv.descripcion);
        //porHacer.guardarDB();
        //console.log(tarea);
        break;
    case 'listar':
        //console.log('Mostrar todas las tareas');
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('=========================='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado == true ?
                `${tarea.completado}`.green : `${tarea.completado}`.red);
            console.log('=========================='.green);
        }

        break;
    case 'actualizar':
        //console.log('Actualizar una tarea por por hacer');
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado)
        console.log(actualizado == true ? `${actualizado}`.green : `${actualizado}`.red);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado == true ? `${borrado}`.green : `${borrado}`.red);
        break;

    default:
        console.log('Comando no reconocido');
        break;
}