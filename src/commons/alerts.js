import swal from 'sweetalert';

const typeAlert = {
    'FAILURE': 'Ha ocurrido un fallo, contáctate con el proveedor!',
    // login
    'WENOTFOUNDYOU': 'No te hemos encontrado.',
    'PASSWORDDONOTMATCH': 'Has que coincidan las contraseñas.'
}


const alertsByType = (type) => {
    swal(typeAlert[type]);
}

export default alertsByType;