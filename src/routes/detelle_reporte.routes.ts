import { Router } from 'express';
import { verifyToken } from '../middlewares/authentication';
import { crear, detalleReporte, reportesDetalle } from '../controllers/detalle_reporte.controller';

const router = Router();

router.post( '/crear', verifyToken, crear );
router.post( '/reporte', verifyToken, detalleReporte );
router.post( '/reportes-detalle', verifyToken, reportesDetalle );

export default router;
