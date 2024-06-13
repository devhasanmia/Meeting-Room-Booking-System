import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();

// Parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is up and running!",
    version: "1.0.0",
    author: {
      name: "Md. Hasan Mia",
      email: "hasanmiadev@gmail.com",
      mobile: "+8801740398196",
    },
    dateTime: new Date().toLocaleString(),
  });
});
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Server is up and running!",
  });
});
app.use(globalErrorHandler);
app.use(notFound);




export default app;
