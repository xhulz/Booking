import Classes from "../../model/classes";

export default interface IClassesRepository {
  create(classes: Classes[]): Promise<void>;
  getById(id: string): Promise<Classes>;
  getAll(name: string, startDate: Date, endDate: Date): Promise<Classes[]>;
  update(classes: Classes): Promise<Classes>;
  delete(id: string): Promise<void>;
}
