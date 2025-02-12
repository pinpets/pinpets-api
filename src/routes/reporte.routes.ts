import { Router } from 'express';
import { verifyToken } from '../middlewares/authentication';
import { encontraronMiMascotaReportada, reportarEncontreMascota, reportarEsMiMascota, reportarMiMascota, reportes } from '../controllers/reporte.controller';


const router = Router();

router.post( '/reportar-mascota', verifyToken, reportarMiMascota );
router.post( '/reportar-encontre-mascota', verifyToken, reportarEncontreMascota );
router.post( '/reportar-es-mi-mascota', verifyToken, reportarEsMiMascota );
router.post( '/reportes', verifyToken, reportes );
router.post( '/encontraron-mascota-reportada', verifyToken, encontraronMiMascotaReportada );

export default router;
