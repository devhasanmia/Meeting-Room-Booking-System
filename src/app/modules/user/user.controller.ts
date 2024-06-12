import { Request, Response } from "express";
import { UserService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await UserService.createUser(payload);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "User Created Successfully!",
        data: user
    })
}

export const UserController = {
    createUser
}