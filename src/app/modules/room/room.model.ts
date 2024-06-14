import { model, Schema } from "mongoose";
import { Troom } from "./room.interface";

const roomSchema = new Schema<Troom>(
  {
    name: {
      type: String,
      required: true,
    },
    roomNo: {
      type: Number,
      unique: true,
      required: true,
    },
    floorNo: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    pricePerSlot: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

roomSchema.pre("find", function () {
  this.where({ isDeleted: { $ne: true } });
});

roomSchema.pre("findOne", function () {
  this.where({ isDeleted: { $ne: true } });
});

roomSchema.pre("findOneAndUpdate", function () {
  this.where({ isDeleted: { $ne: true } });
});

const Room = model<Troom>("Room", roomSchema);

export default Room;
