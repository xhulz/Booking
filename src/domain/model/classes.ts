import Bookings from "./bookings";

export default class Classes {
  public _id?: string = null;
  public name: string = null;
  public capacity: number = null;
  public classDate: Date = null;
  public bookings?: Bookings[] = null;
  public createAt?: Date = null;
}
