import { drugsDeleteUseCase } from "./drugsDeleteUseCase";

describe("drugsDeleteUseCase test", () => {
  test("should return error type 'does_not_exist' when the drugId is not found", async () => {
    const prisma: any = {
      drug: {
        findUnique: jest.fn(() => null),
      },
    };
    const options = {
      id: 1,
    };
    const result = await drugsDeleteUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "does_not_exist",
      message: `Drug doesn't exist, please check it`,
    });
  });

  test("should return error type 'does_not_exist' when the drugId is not found", async () => {
    const prisma: any = {
      drug: {
        findUnique: jest.fn(() => ({})),
        delete: jest.fn(() => ({})),
      },
    };
    const options = {
      id: 1,
    };
    const result = await drugsDeleteUseCase(prisma, options);
    expect(result).toMatchObject({
      message: `Drug deleted successfully`,
    });
  });
});
