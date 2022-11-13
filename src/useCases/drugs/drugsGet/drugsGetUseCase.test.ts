import { drugsGetUseCase } from "./drugsGetUseCase";

describe("drugsGetUseCase test", () => {
  test("should get all drugs successfully", async () => {
    const prisma: any = {
      drug: {
        findMany: jest.fn(() => ({})),
      },
    };
    const options = {
      select: {
        id: true,
        name: true,
        approved: true,
        minDose: true,
        maxDose: true,
        availableAt: true,
      },
    };
    const result = await drugsGetUseCase(prisma, options);
    expect(result).toMatchObject({ drugs: {} });
  });
});
