import { AuthSignupUseCaseOptionsInterface } from "./authSignupUseCaseOptionsInterface";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

export const authSignupUseCase = async (
  prisma: PrismaClient,
  options: AuthSignupUseCaseOptionsInterface
) => {
  if (!options.email || !options.password) {
    return {
      type: "incomplete_info",
      message: `Email and password are required to signup`,
    };
  }

  let dbUser = await prisma.user.findUnique({
    where: { email: options.email },
  });

  if (dbUser) {
    return {
      type: "already_exist",
      message: `A user with this email is already registered`,
      data: {
        email: options.email,
      },
    };
  }

  const encryptedPassword = await bcrypt.hash(options.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      name: options.name,
      email: options.email,
      password: encryptedPassword,
    },
  });

  return {
    message: `user created successfully`,
    data: {
      name: createdUser.name,
      email: createdUser.email,
    },
  };
};
