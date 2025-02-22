import { Router } from 'express';
import { verifyToken } from '../middlewares/authentication';
import { 
    listaRazaColor, 
    listaTipoGeneroTamano, 
} from '../controllers/combo.controller';

const router = Router();

router.get( '/lista-tipo-genero-tamano', verifyToken, listaTipoGeneroTamano );
router.post( '/lista-raza-color', verifyToken, listaRazaColor );

export default router;
