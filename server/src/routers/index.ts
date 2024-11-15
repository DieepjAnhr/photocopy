import { CUser } from '@/controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.route('/users').get(CUser.test);

export default router;
