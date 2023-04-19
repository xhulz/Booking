import "reflect-metadata";
import mongoose from "mongoose";
import IBookingsRepository from "src/domain/interface/repository/iBookingsRepository";
import Bookings from "src/domain/model/bookings";
import { scoped, Lifecycle } from "tsyringe";

import Classes from "../../domain/model/classes";
import { Classes as ClassesEntity } from "./schemas/classes";

@scoped(Lifecycle.ResolutionScoped)
export default class BookingsRepository implements IBookingsRepository {
  public async create(idClasses: string, bookings: Bookings): Promise<Classes> {
    try {
      const filter: any = { _id: idClasses };

      const data: any = {
        _id: new mongoose.Types.ObjectId(),
        member: bookings.member,
        createAt: bookings.createAt,
      };

      return await ClassesEntity.findOneAndUpdate(
        filter,
        { $push: { bookings: data } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<Classes> {
    try {
      return await ClassesEntity.findOne({
        bookings: { $elemMatch: { _id: id } },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getAll(member: string): Promise<Classes[]> {
    try {
      return await ClassesEntity.find({
        bookings: { $elemMatch: { member } },
      }).sort({ classDate: -1 });
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, bookings: Bookings): Promise<Classes> {
    try {
      const filter: any = { "bookings._id": id };

      return await ClassesEntity.findOneAndUpdate(
        filter,
        { $set: { "bookings.$.member": bookings.member } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const filter: any = { "bookings._id": id };

      await ClassesEntity.findOneAndUpdate(
        filter,
        { $pull: { bookings: { _id: id } } },
        { new: true }
      );

      return;
    } catch (error) {
      throw error;
    }
  }
}
