import catchAsync from "../../utils/catchAsync";
import { SlotService } from "./slot.service";

const createSlot = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const slot = await SlotService.createSlot(payload);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Slots created successfully",
        data: slot,
    });
});


export const SlotController = {
    createSlot,
}