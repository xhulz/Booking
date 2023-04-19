import moment from "moment";
import { injectable, inject, scoped, Lifecycle } from "tsyringe";

import BookingsRepository from "../../infra/repository/bookingsRepository";
import IBookingsRepository from "../interface/repository/iBookingsRepository";
import IBookingsService from "../interface/service/iBookingsService";
import Bookings from "../model/bookings";
import Classes from "../model/classes";

@injectable()
@scoped(Lifecycle.ResolutionScoped)
export default class BookingsService implements IBookingsService {
  constructor(
    @inject(BookingsRepository)
    private readonly _bookingsRepository: IBookingsRepository
  ) {}

  public async create(bookings: any): Promise<Classes> {
    try {
      const newBooking: Bookings = {
        member: bookings.member,
        createAt: new Date(),
      };

      return await this._bookingsRepository.create(
        bookings.id_classes,
        newBooking
      );
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<Classes> {
    try {
      return await this._bookingsRepository.getById(id);
    } catch (error) {
      throw error;
    }
  }

  public async getAll(member: string): Promise<Classes[]> {
    try {
      return await this._bookingsRepository.getAll(member);
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, bookings: Bookings): Promise<Classes> {
    try {
      return await this._bookingsRepository.update(id, bookings);
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this._bookingsRepository.delete(id);
      return;
    } catch (error) {
      throw error;
    }
  }
}
