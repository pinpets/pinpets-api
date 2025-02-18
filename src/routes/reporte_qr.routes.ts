import { Router } from 'express';
import { verifyToken } from '../middlewares/authentication';
import { 
    avisarEncontreQR,
    nuevoReporteQR,
    reportarEncontradoQR,
    reportarEncontreMascotaQR,
    reportarPerdidoQR 
} from '../controllers/reporte_qr.controller';

const router = Router();

router.post( '/crear', verifyToken, nuevoReporteQR );
router.post( '/perdido', verifyToken, reportarPerdidoQR );
router.post( '/encontrado', verifyToken, reportarEncontradoQR );
router.post( '/encontre-mascota', verifyToken, reportarEncontreMascotaQR );
router.post( '/avisar', verifyToken, avisarEncontreQR );

export default router;
