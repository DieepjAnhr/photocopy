import { CUser } from '@/controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.route('/users').get((req, res, next) => {
    const controller = new CUser(req, res, next);
    controller.get();
});

export default router;
