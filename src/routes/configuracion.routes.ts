import { Router } from 'express';
import { 
    contacto,
    faqs,
    quienesSomos,
    sitioWeb,
    terminosYCondiciones,
} from '../controllers/configuracion.controller';

const router = Router();

router.get( '/faqs', faqs );
router.get( '/sitio', sitioWeb );
router.get( '/terminos', terminosYCondiciones );
router.get( '/contacto', contacto );
router.post( '/quienes-somos', quienesSomos );

export default router;
