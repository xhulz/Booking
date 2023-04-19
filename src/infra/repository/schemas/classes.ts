import { Schema, model } from "mongoose";
import { default as ModelClasses } from "src/domain/model/classes";

const schema = new Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  classDate: { type: Date, required: true },
  bookings: [
    {
      _id: { type: Schema.Types.ObjectId, required: true, index: true },
      member: { type: String, required: true },
      createAt: { type: Date, required: true },
    },
  ],
  createAt: { type: Date, required: true },
});

export const Classes = model<ModelClasses>("classes", schema);
