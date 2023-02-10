import {Router} from 'express'

export const playerRouter = Router();
import * as service from '../sevices/playerService';

/* GET player listing. */
playerRouter.get('/', async function (req, res, next) {
    res.json(await service.list());
});
