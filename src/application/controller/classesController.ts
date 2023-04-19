import { celebrate, Segments } from "celebrate";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import ClassesService from "../../domain/service/classesService";
import { getAll, post, put } from "../middleware/validation/classesValidation";

const ClassesController = Router();
const classesService = container.resolve(ClassesService);

ClassesController.get(
  "/classes",
  celebrate({ [Segments.QUERY]: getAll }),
  async (req: Request, res: Response) => {
    try {
      const name: string =
        req.query.name != null ? req.query.name.toString() : null;

      const start_date: Date =
        req.query.start_date != null
          ? new Date(req.query.start_date.toString())
          : null;

      const end_date: Date =
        req.query.end_date != null
          ? new Date(req.query.end_date.toString())
          : null;

      const response = await classesService.getAll(name, start_date, end_date);
      const status = response.length === 0 ? 204 : 200;

      res.status(status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

ClassesController.get("/classes/:id", async (req: Request, res: Response) => {
  try {
    const response = await classesService.getById(req.params.id);
    const status = response == null ? 204 : 200;

    res.status(status).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

ClassesController.post(
  "/classes",
  celebrate({ [Segments.BODY]: post }),
  async (req: Request, res: Response) => {
    try {
      await classesService.create(req.body);

      res.status(201).json();
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

ClassesController.put(
  "/classes/:id",
  celebrate({ [Segments.BODY]: put }),
  async (req: Request, res: Response) => {
    try {
      const response = await classesService.update(req.params.id, req.body);
      const status = response == null ? 204 : 200;

      res.status(status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

ClassesController.delete(
  "/classes/:id",
  async (req: Request, res: Response) => {
    try {
      await classesService.delete(req.params.id);

      res.status(200).json();
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default ClassesController;
