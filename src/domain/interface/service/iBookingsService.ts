import Bookings from "../../model/bookings";
import Classes from "../../model/classes";

export default interface IBookingsService {
  create(bookings: any): Promise<Classes>;
  getById(id: string): Promise<Classes>;
  getAll(member: string): Promise<Classes[]>;
  update(id: string, bookings: Bookings): Promise<Classes>;
  delete(id: string): Promise<void>;
}
