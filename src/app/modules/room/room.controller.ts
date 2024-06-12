import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { RoomService } from "./room.service";

const createRoom: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;
  const room = await RoomService.createRoom(payload);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Room added successfully",
    data: room,
  });
});

const getSingleRoom: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const room = await RoomService.getSingleRoom(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Room retrieved successfully",
    data: room,
  });
});

const GetAllRooms: RequestHandler = catchAsync(async (req, res) => {
    const rooms = await RoomService.getAllRooms();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Rooms retrieved successfully",
      data: rooms,
    });
  });


  const UpdateRoom: RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    const room = await RoomService.updateRoom(id, payload);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room updated successfully",
      data: room,
    });
  });


  const DeleteRoom: RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const room = await RoomService.deletedRoom(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room deleted successfully",
      data: room,
    });
  })


export const RoomController = {
  createRoom,
  getSingleRoom,
  GetAllRooms,
  UpdateRoom,
  DeleteRoom
};
