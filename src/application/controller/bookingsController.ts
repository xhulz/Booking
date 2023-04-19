import { celebrate, Segments } from "celebrate";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import BookingsService from "../../domain/service/bookingsService";
import { getAll, post, put } from "../middleware/validation/bookingsValidation";

const BookingsController = Router();
const bookingsService = container.resolve(BookingsService);

BookingsController.get(
  "/bookings",
  celebrate({ [Segments.QUERY]: getAll }),
  async (req: Request, res: Response) => {
    try {
      const member: string =
        req.query.member != null ? req.query.member.toString() : null;

      const response = await bookingsService.getAll(member);
      const status = response.length === 0 ? 204 : 200;

      res.status(status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

BookingsController.get("/bookings/:id", async (req: Request, res: Response) => {
  try {
    const response = await bookingsService.getById(req.params.id);
    const status = response == null ? 204 : 200;

    res.status(status).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

BookingsController.post(
  "/bookings",
  celebrate({ [Segments.BODY]: post }),
  async (req: Request, res: Response) => {
    try {
      const response = await bookingsService.create(req.body);
      const status = response == null ? 204 : 201;

      res.status(status).json();
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

BookingsController.put(
  "/bookings/:id",
  celebrate({ [Segments.BODY]: put }),
  async (req: Request, res: Response) => {
    try {
      const response = await bookingsService.update(req.params.id, req.body);
      const status = response == null ? 204 : 200;

      res.status(status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

BookingsController.delete(
  "/bookings/:id",
  async (req: Request, res: Response) => {
    try {
      await bookingsService.delete(req.params.id);

      res.status(200).json();
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default BookingsController;
