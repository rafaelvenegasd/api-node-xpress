import { vaccinationRouter, drugsRouter, authRouter } from "./routers";
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", authRouter);
app.use("/drugs", drugsRouter);
app.use("/vaccination", vaccinationRouter);

app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
