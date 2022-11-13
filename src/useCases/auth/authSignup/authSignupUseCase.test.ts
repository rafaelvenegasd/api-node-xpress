import { authSignupUseCase } from "./authSignupUseCase";

import bcrypt from "bcrypt";

describe("authSignupUseCase test", () => {
  test("should return error type 'incomplete_info' when email or password are not sent", async () => {
    const options = {
      email: "",
      password: "",
    };
    const prisma: any = {};
    const result = await authSignupUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "incomplete_info",
      message: `Email and password are required to signup`,
    });
  });

  test("should return error type 'already_exist' when the email is already registered", async () => {
    const options = {
      email: "rvenegas@test.com",
      password: "abc123",
    };

    const prisma: any = {
      user: {
        findUnique: jest.fn(() => ({})),
      },
    };

    const result = await authSignupUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "already_exist",
      message: `A user with this email is already registered`,
      data: {
        email: options.email,
      },
    });
  });

  test("should return success message", async () => {
    const options = {
      email: "rvenegas@test.com",
      password: "abc123",
    };

    const prisma: any = {
      user: {
        findUnique: jest.fn(() => null),
        create: jest.fn(() => ({})),
      },
    };

    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => true);

    const result = await authSignupUseCase(prisma, options);
    expect(result).toMatchObject({
      message: `user created successfully`,
    });
  });
});
