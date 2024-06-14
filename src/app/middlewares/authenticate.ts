import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload;
    }
  }
}

const authenticate = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    jwt.verify(token, config.SECRET_KEY as string, function (err, decoded) {
      if (err) {
        return next(
          new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")
        );
      }
      const userRole = (decoded as JwtPayload).role as TUserRole;
      if (roles.length && !roles.includes(userRole)) {
        return next(
          new AppError(
            httpStatus.UNAUTHORIZED,
            "You have no access to this route"
          )
        );
      }
      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default authenticate;
