import "reflect-metadata";

import { container } from "tsyringe";

import BookingsService from "../../domain/service/bookingsService";
import ClassesService from "../../domain/service/classesService";
import BookingsRepository from "../repository/bookingsRepository";
import ClassesRepository from "../repository/classesRepository";

export default class Ioc {
  public configureServices(): void {
    container.register<ClassesRepository>(ClassesRepository, {
      useClass: ClassesRepository,
    });
    container.register<BookingsRepository>(BookingsRepository, {
      useClass: BookingsRepository,
    });
    container.register<ClassesService>(ClassesService, {
      useClass: ClassesService,
    });
    container.register<BookingsService>(BookingsService, {
      useClass: BookingsService,
    });
  }
}
