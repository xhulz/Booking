import Classes from "src/domain/model/classes";

export default interface IClassesService {
  create(classes: any): Promise<void>;
  getById(id: string): Promise<Classes>;
  getAll(name: string, startDate: Date, endDate: Date): Promise<Classes[]>;
  update(id: string, classes: any): Promise<Classes>;
  delete(id: string): Promise<void>;
}
