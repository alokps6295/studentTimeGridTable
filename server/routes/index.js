import { Router } from 'express'
import testRouter from "./test.route";
const router = new Router();

router.use('/student', testRouter);

export default router;