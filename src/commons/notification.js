import { toast } from 'react-toastify';

const typeNotifycation = {
    'WORKING': 'Estamos consultando la acción',
}

const notification = (type) => toast.info(typeNotifycation[type]);

export default notification;