import express from "express";
import { vaccinationRouter, drugsRouter, authRouter } from "./routers";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", authRouter);
app.use("/drugs", drugsRouter);
app.use("/vaccination", vaccinationRouter);

app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
