import { CUser } from '@/controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.route('/user/:id').get(CUser.get)
router.route('/user/create').post(CUser.create)

export default router;