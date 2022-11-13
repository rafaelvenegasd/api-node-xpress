import { vaccinationGetUseCase } from "./vaccinationGetUseCase";

describe("vaccinationGetUseCase test", () => {
  test("should get all vaccinations successfully", async () => {
    const prisma: any = {
      vaccination: {
        findMany: jest.fn(() => ({})),
      },
    };
    const options = {
      select: {
        id: true,
        name: true,
        drugId: true,
        dose: true,
        date: true,
      },
    };
    const result = await vaccinationGetUseCase(prisma, options);
    expect(result).toMatchObject({ vaccinations: {} });
  });
});
