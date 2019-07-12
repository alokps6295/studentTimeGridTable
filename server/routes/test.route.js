import { Router } from 'express';
import studentController from "../controllers/student.controller";

const router = new Router();



router.post('/', studentController.addStudent);
// car can only be deleted be an authenticated user

export default router;