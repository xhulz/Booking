import mongoose from "mongoose";

import Logger from "./logger";

export default class Database {
  public async startService(): Promise<any> {
    try {
      await mongoose.connect(`${process.env.MONGOOSE_CONNECTION_STRING}`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      Logger.info("database connected");
    } catch (error) {
      Logger.error(error);
    }
  }
}
