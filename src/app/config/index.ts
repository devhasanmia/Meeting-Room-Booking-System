import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 4000,
  databaseURL: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/meeting-room-booking-system",
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY,
};