import { Router } from 'express';
import { verifyToken } from '../middlewares/authentication';
import { 
    aplicarFiltros, 
    limpiarFiltros, 
    listaRazaColor, 
    listaTipoGeneroTamano, 
    verFiltros 
} from '../controllers/filtros.controller';

const router = Router();

router.get( '/lista-tipo-genero-tamano', verifyToken, listaTipoGeneroTamano );
router.post( '/lista-raza-color', verifyToken, listaRazaColor );
router.post( '/aplicar', verifyToken, aplicarFiltros );
router.get( '/ver', verifyToken, verFiltros );
router.get( '/limpiar', verifyToken, limpiarFiltros );

export default router;
