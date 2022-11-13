import { authLoginUseCase } from "./authLoginUseCase";

import bcrypt from "bcrypt";

describe("authLoginUseCase test", () => {
  test("should return error type 'incomplete_info' when email or password are not sent", async () => {
    const options = {
      email: "",
      password: "",
    };
    const prisma: any = {};
    const result = await authLoginUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "incomplete_info",
      message: `Email and password are required to login`,
    });
  });

  test("should return error type 'not_found' when user email is not found in DB", async () => {
    const options = {
      email: "rvenegas@test.com",
      password: "abc123",
    };

    const prisma: any = {
      user: {
        findUnique: jest.fn(() => null),
      },
    };

    const result = await authLoginUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "not_found",
      message: `User not found, please signup`,
    });
  });

  test("should return error type 'not_matched_pass' when password is not matched", async () => {
    const options = {
      email: "rvenegas@test.com",
      password: "abc123",
    };

    const prisma: any = {
      user: {
        findUnique: jest.fn(() => ({})),
      },
    };

    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {});

    const result = await authLoginUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "not_matched_pass",
      message: `Invalid credentials`,
    });
  });

  test("should return success message", async () => {
    const options = {
      email: "rvenegas@test.com",
      password: "abc123",
    };

    const prisma: any = {
      user: {
        findUnique: jest.fn(() => ({})),
      },
    };

    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => true);

    const result = await authLoginUseCase(prisma, options);

    expect(result).toMatchObject({
      message: `Login success`,
    });
  });
});
