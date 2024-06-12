import AppError from "../../errors/AppError";
import { Troom } from "./room.interface";
import Room from "./room.model";

const createRoom = async (payload: Troom) => {
  const room = await Room.create(payload);
  if (!room) {
    throw new AppError(400, "Room creation failed");
  }
  return room;
};

const getSingleRoom = async (id: string) => {
  const room = await Room.findById(id);
  if (room?.isDeleted) {
    throw new AppError(404, "Room not found");
  }
  if (!room) {
    throw new AppError(404, "Room not found");
  }
  return room;
};

const getAllRooms = async () => {
  const rooms = await Room.find();
  const s = rooms.filter((room) => room.isDeleted === false);
  if (s.length === 0) {
    throw new AppError(404, "Room Not Found");
  }
  if (rooms.length === 0) {
    throw new AppError(404, "There are currently no rooms");
  }
  if (!rooms) {
    throw new AppError(404, "Rooms not found");
  }
  return rooms;
};

const updateRoom = async (id: string, payload: Troom) => {
  const room = await Room.findByIdAndUpdate(id, payload, { new: true });
  if (!room) {
    throw new AppError(404, "Room not found");
  }
  return room;
};

const deletedRoom = async (id: string) => {
    const room = await Room.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!room) {
      throw new AppError(404, "Room not found");
    }
    return room;
}
export const RoomService = {
  createRoom,
  getSingleRoom,
  getAllRooms,
  updateRoom,
  deletedRoom
};
