import { Router } from 'express';
import expressFileUpload from 'express-fileupload';
import { verifyToken } from '../middlewares/authentication';
import { 
    login,
    registro,
    actualizar,
    activar,
    cambiarPass,
    obtener,
    image,
    token,
    subirFotoPerfil,
    recuperarPassMail,
    codigoMail,
} from '../controllers/auth.controller';

const router = Router();
router.use( expressFileUpload() );

router.post( '/login', login );
router.post( '/registro', registro );
router.post( '/recuperar-pass-mail', recuperarPassMail );
router.post( '/activar', verifyToken, activar );
router.get( '/codigo-mail', verifyToken, codigoMail );
router.post( '/cambiar-pass', verifyToken, cambiarPass );
router.put( '/actualizar', verifyToken, actualizar );
router.get( '/obtener', verifyToken, obtener );
router.get( '/token', verifyToken, token );
router.get( '/image', image);
router.put( '/subir-foto', verifyToken, subirFotoPerfil );

export default router;