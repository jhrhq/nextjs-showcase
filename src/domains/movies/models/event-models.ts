import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IEvent extends Document {
  name: string;
  details: string;
  location: string;
  imageUrl: string;
  interested_ids?: string[];
  going_ids?: string[];
  swgs?: string[];
}

const schema = new Schema<IEvent>({
  name: {
    required: true,
    type: String,
  },
  details: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  imageUrl: {
    required: true,
    type: String,
  },
  interested_ids: {
    required: false,
    type: [String],
  },
  going_ids: {
    required: false,
    type: [String],
  },
  swgs: {
    required: false,
    type: [String],
  },
});

export const eventModel: Model<IEvent> = mongoose.models.events ?? mongoose.model<IEvent>("events", schema);
