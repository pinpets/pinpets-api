import { Router } from 'express';
import expressFileUpload from 'express-fileupload';
import { verifyToken } from '../middlewares/authentication';
import { 
    crear,
    actualizar,
    actualizarQR,
    borrar,
    obtener,
    lista,
    subirFotoMascota,
} from '../controllers/mascota.controller';

const router = Router();
router.use( expressFileUpload() );

router.post( '/crear', verifyToken, crear );
router.put( '/actualizar', verifyToken, actualizar );
router.put( '/actualizar-qr', verifyToken, actualizarQR );
router.delete( '/borrar', verifyToken, borrar );
router.post( '/obtener', verifyToken, obtener );
router.get( '/lista', verifyToken, lista );
router.put( '/subir-foto', verifyToken, subirFotoMascota );

export default router;
