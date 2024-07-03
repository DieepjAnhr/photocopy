import { CUser } from '@/controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.route('/user/:id').get(CUser.get)

export default router;