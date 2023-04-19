import "reflect-metadata";
import { scoped, Lifecycle } from "tsyringe";

import IClassesRepository from "../../domain/interface/repository/iClassesRepository";
import Classes from "../../domain/model/classes";
import { Classes as ClassesEntity } from "./schemas/classes";

@scoped(Lifecycle.ResolutionScoped)
export default class ClassesRepository implements IClassesRepository {
  public async create(classes: Classes[]): Promise<void> {
    try {
      const classesEntity = new ClassesEntity(classes);
      await classesEntity.collection.insertMany(classes);
      return;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<Classes> {
    try {
      return await ClassesEntity.findOne({
        _id: id,
      });
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
      const filter: any = {};

      if (name != null) filter.name = name;

      if (startDate != null && endDate != null) {
        filter.classDate = {
          $gte: startDate,
          $lte: endDate,
        };
      }

      return await ClassesEntity.find(filter).sort({ classDate: -1 });
    } catch (error) {
      throw error;
    }
  }

  public async update(classes: Classes): Promise<Classes> {
    try {
      const filter: any = { _id: classes._id };

      return await ClassesEntity.findOneAndUpdate(filter, classes, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const filter: any = { _id: id };

      await ClassesEntity.findByIdAndDelete(filter);
      return;
    } catch (error) {
      throw error;
    }
  }
}
