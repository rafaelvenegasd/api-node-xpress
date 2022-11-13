import { AuthLoginUseCaseOptionsInterface } from "./authLoginUseCaseOptionsInterface";
import { PrismaClient } from "@prisma/client";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

export const authLoginUseCase = async (
  prisma: PrismaClient,
  options: AuthLoginUseCaseOptionsInterface
) => {
  if (!options.email || !options.password) {
    return {
      type: "incomplete_info",
      message: `Email and password are required to login`,
    };
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: options.email },
  });

  if (!dbUser) {
    return {
      type: "not_found",
      message: `User not found, please signup`,
    };
  }

  const passwordMatch = await bcrypt.compare(options.password, dbUser.password);

  if (!passwordMatch) {
    return {
      type: "not_matched_pass",
      message: `Invalid credentials`,
    };
  }

  const token = jwt.sign(
    { user_id: dbUser.id },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: process.env.JWT_EXPIRATION_TIME || "1H",
    }
  );

  const { password, ...user } = dbUser;

  return {
    message: `Login success`,
    data: { user, token },
  };
};
