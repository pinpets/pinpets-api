import { Router } from 'express';
import expressFileUpload from 'express-fileupload';
import { verifyToken } from '../middlewares/authentication';
import {
    nuevoReporteSinQR, 
    reportarEncontreMascotaSinQR, 
    subirFotoMascotaSinQR,
    reportarMascotaSinQREsMia
} from '../controllers/reporte_sinqr.controller';

const router = Router();
router.use( expressFileUpload() );

router.put( '/subir-foto', verifyToken, subirFotoMascotaSinQR );
router.post( '/crear', verifyToken, nuevoReporteSinQR );
router.post( '/encontre-mascota', verifyToken, reportarEncontreMascotaSinQR );
router.post( '/mascota-mia', verifyToken, reportarMascotaSinQREsMia );

export default router;
