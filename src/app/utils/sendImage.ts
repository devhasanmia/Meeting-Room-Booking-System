import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
cloudinary.config({
  cloud_name: "ddoacwzvp",
  api_key: "419125535281198",
  api_secret: "axbmHawHvhN9xqvI5bfDvBQXOb8",
});

interface CloudinaryUploadResult {
  secure_url: string;
}

export const sendImage = (
  path: string,
  imageName: string
): Promise<CloudinaryUploadResult> => {
  console.log(path, imageName);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result as CloudinaryUploadResult);
    });
  });
};

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
