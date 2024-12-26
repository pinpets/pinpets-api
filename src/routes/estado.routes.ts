import { Router } from 'express';
import { lista } from '../controllers/estado.controller';

const router = Router();

router.get( '/lista', lista );

export default router;
