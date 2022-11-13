import { drugsCreateUseCase } from "./drugsCreateUseCase";

describe("drugsCreateUseCase test", () => {
  test("should return error type 'incomplete' when one or more fields are not sended", async () => {
    const options = {
      name: "",
      approved: false,
      minDose: 0,
      maxDose: 0,
      availableAt: "",
    };
    const prisma: any = {};
    const result = await drugsCreateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "incomplete",
      message: `All fields are required`,
    });
  });

  test("should return error type 'already_exists' when the drug is already registered", async () => {
    const options = {
      name: "paracetamol",
      approved: false,
      minDose: 1,
      maxDose: 2,
      availableAt: "12/11/2022",
    };
    const prisma: any = {
      drug: {
        findFirst: jest.fn(() => ({})),
      },
    };
    const result = await drugsCreateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "already_exists",
      message: `Drug already exists`,
    });
  });

  test("should return error type 'already_exists' when the drug is already registered", async () => {
    const options = {
      name: "paracetamol",
      approved: false,
      minDose: 1,
      maxDose: 2,
      availableAt: "12/11/2022",
    };
    const prisma: any = {
      drug: {
        findFirst: jest.fn(() => null),
        create: jest.fn(() => ({})),
      },
    };
    const result = await drugsCreateUseCase(prisma, options);
    expect(result).toMatchObject({
      message: `Drug created successfully`,
    });
  });
});
