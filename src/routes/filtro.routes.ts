import { Router } from 'express';
import { verifyToken } from '../middlewares/authentication';
import { listaRazaColor, listaTipoGeneroTamano } from '../controllers/filtros.controller';

const router = Router();

router.get( '/lista-tipo-genero-tamano', verifyToken, listaTipoGeneroTamano );
router.get( '/lista-raza-color', verifyToken, listaRazaColor );

export default router;
