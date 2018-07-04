import * as cors from 'cors';
import * as express from 'express';
import {
  getAllCategories,
  getUsers,
  getUserById,
  getUsersByCategory,
  getTargets,
  getTargetById
  // updateTargetMatches
} from './db-auction';

export const router = express.Router();

router.use(cors());

router.get('/users', async (req: express.Request, res: express.Response) => {
  res.json(await getUsers(req.query));
});

router.get('/users/:userId', async (req: express.Request, res: express.Response) => {
  const userId = parseInt(req.params.userId, 10) || -1;
  res.json(await getUserById(userId));
});

router.get('/targets', async (req: express.Request, res: express.Response) => {
  res.json(await getTargets(req.query));
});

router.get('/targets/:targetId', async (req: express.Request, res: express.Response) => {
  const targetId = parseInt(req.params.targetId, 10) || -1;
  res.json(await getTargetById(targetId));
});

router.get('/categories', async (_, res: express.Response) => {
  res.json(await getAllCategories());
});

router.get('/categories/:category', async (req: express.Request, res: express.Response) => {
  res.json(await getUsersByCategory(req.params.category));
});
