import AppError from "../../errors/AppError";
import { Tslot } from "./slot.interface";
import Slot from "./slot.model";

const createSlot = async (payload: Tslot) => {
    const slot = await Slot.create(payload);
    if (!slot) {
        throw new AppError(400, "Slot creation failed");
    }
    return slot;
}



export const SlotService = {
    createSlot,
}