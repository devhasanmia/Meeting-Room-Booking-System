import AppError from "../errors/AppError";
import { Tcredential } from "../interface/credential";
import User from "../modules/user/user.model";

const credentialValidator = async (user: Tcredential) => {
  if (!user || !user.userId) {
    throw new AppError(400, "User ID is required");
  }
  let userExist = await User.findById(user.userId);
  if (!userExist) {
    throw new AppError(404, "Invalid credentials");
  }
};

export default credentialValidator;
