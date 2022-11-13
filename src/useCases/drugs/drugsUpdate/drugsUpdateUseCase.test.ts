import { drugsUpdateUseCase } from "./drugsUpdateUseCase";

describe("drugsUpdateUseCase test", () => {
  test("should return error type 'does_not_exist' when the drugId is not found", async () => {
    const prisma: any = {
      drug: {
        findUnique: jest.fn(() => null),
      },
    };
    const options = {
      id: 1,
      data: {
        name: "paracetamol",
        approved: true,
        minDose: 1,
        maxDose: 2,
        availableAt: "12/11/2022",
      },
    };

    const result = await drugsUpdateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "does_not_exist",
      message: `Drug doesn't exist, please check it`,
    });
  });

  test("should update drug successfully", async () => {
    const prisma: any = {
      drug: {
        findUnique: jest.fn(() => ({})),
        update: jest.fn(() => ({})),
      },
    };
    const options = {
      id: 1,
      data: {
        name: "paracetamol",
        approved: true,
        minDose: 1,
        maxDose: 2,
        availableAt: "12/11/2022",
      },
    };

    const result = await drugsUpdateUseCase(prisma, options);
    expect(result).toMatchObject({
      message: `Drug updated successfully`,
    });
  });
});
