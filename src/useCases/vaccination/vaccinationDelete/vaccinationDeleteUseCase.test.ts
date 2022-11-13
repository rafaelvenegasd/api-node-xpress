import { vaccinationDeleteUseCase } from "./vaccinationDeleteUseCase";

describe("vaccinationDeleteUseCase test", () => {
  test("should return error type 'does_not_exist' when the vaccination is not found ", async () => {
    const prisma: any = {
      vaccination: {
        findUnique: jest.fn(() => null),
      },
    };
    const options = {
      id: 1,
    };
    const result = await vaccinationDeleteUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "does_not_exist",
      message: `Vaccination doesn't exist, please check it`,
    });
  });
  test("should delete the vaccination successfully", async () => {
    const prisma: any = {
      vaccination: {
        findUnique: jest.fn(() => ({})),
        delete: jest.fn(() => ({})),
      },
    };
    const options = {
      id: 1,
    };
    const result = await vaccinationDeleteUseCase(prisma, options);
    expect(result).toMatchObject({
      message: `Vaccination deleted successfully`,
    });
  });
});
