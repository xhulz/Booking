import { Router } from "express";

import BookingsController from "../controller/bookingsController";
import ClassesController from "../controller/classesController";

const routes = Router();

routes.use(ClassesController);
routes.use(BookingsController);

export default routes;
