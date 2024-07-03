import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './routers';
import { _createError } from './utils/create-error';

const app: express.Express = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('', router);
app.use((req: Request, res: Response, next: NextFunction) => {
    req;
    res;
    const error = new Error('400 ~ Endpoint is not exist!');
    next(error);
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    req;
    console.log(err);
    const response = _createError(err);
    return res.send(response);
    next();
});


export default app;