import moment from "moment";
import { injectable, inject, scoped, Lifecycle } from "tsyringe";

import ClassesRepository from "../../infra/repository/classesRepository";
import IClassesRepository from "../interface/repository/iClassesRepository";
import IClassesService from "../interface/service/iClassesService";
import Classes from "../model/classes";

@injectable()
@scoped(Lifecycle.ResolutionScoped)
export default class ClassesService implements IClassesService {
  constructor(
    @inject(ClassesRepository)
    private readonly _classesRepository: IClassesRepository
  ) {}

  public async create(classes: any): Promise<void> {
    try {
      const days: number = moment(classes.end_date).diff(
        moment(classes.start_date),
        "days"
      );

      const arrClasses: Classes[] = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= days; i++) {
        const classDate: Date = moment(classes.start_date)
          .add(i, "days")
          .toDate();

        const newClass: Classes = {
          name: classes.name,
          classDate,
          capacity: classes.capacity,
          createAt: new Date(),
        };

        arrClasses.push(newClass);
      }

      await this._classesRepository.create(arrClasses);

      return;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<Classes> {
    try {
      return await this._classesRepository.getById(id);
    } catch (error) {
      throw error;
    }
  }

  public async getAll(
    name: string,
    startDate: Date,
    endDate: Date
  ): Promise<Classes[]> {
    try {
      return await this._classesRepository.getAll(name, startDate, endDate);
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, classes: any): Promise<Classes> {
    try {
      const newClass: Classes = {
        _id: id,
        name: classes.name,
        classDate: new Date(classes.class_date),
        capacity: classes.capacity,
      };

      return await this._classesRepository.update(newClass);
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this._classesRepository.delete(id);
      return;
    } catch (error) {
      throw error;
    }
  }
}
