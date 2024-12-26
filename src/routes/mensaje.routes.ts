import { Router } from 'express';
import { verifyToken } from '../middlewares/authentication';
import { 
    chat,
    chatDetalle,
    encontraronMascota, 
    enviarMensaje, 
    listaChats, 
    mensajesChat, 
    mensajesChatUsuario, 
    numeroChatsPendientesLeer, 
    totalMensajes 
} from '../controllers/mensaje.controller';

const router = Router();

router.post( '/enviar', verifyToken, enviarMensaje );
router.post( '/encontraron-mascota', verifyToken, encontraronMascota );
router.get( '/total', verifyToken, totalMensajes );
router.get( '/chats', verifyToken, mensajesChat );
router.post( '/chat-usuario', verifyToken, mensajesChatUsuario );
router.post( '/chat-detalle', verifyToken, chatDetalle );
router.get( '/chat', verifyToken, chat );
router.get( '/chats-pendientes-leer', verifyToken, numeroChatsPendientesLeer );
router.get( '/lista-chats', verifyToken, listaChats );

export default router;
