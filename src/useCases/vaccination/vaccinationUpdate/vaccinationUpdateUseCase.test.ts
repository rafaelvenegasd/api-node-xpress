import { vaccinationUpdateUseCase } from "./vaccinationUpdateUseCase";

describe("vaccinationUpdateUseCase test", () => {
  test("should return error type 'does_not_exist' when the vaccination id is not found", async () => {
    const prisma: any = {
      vaccination: {
        findUnique: jest.fn(() => null),
      },
    };
    const options = {
      id: 1,
      data: {
        name: "COVID-19",
        drugId: 1,
        dose: 1,
        date: "12/11/2022",
      },
    };
    const result = await vaccinationUpdateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "does_not_exist",
      message: `Vaccination doesn't exist, please check it`,
    });
  });

  test("should return error type 'drugId_not_valid' when try to set an invalid drugId", async () => {
    const prisma: any = {
      vaccination: {
        findUnique: jest.fn(() => ({})),
      },
      drug: {
        findFirst: jest.fn(() => null),
      },
    };
    const options = {
      id: 1,
      data: {
        name: "COVID-19",
        drugId: 1,
        dose: 1,
        date: "12/11/2022",
      },
    };
    const result = await vaccinationUpdateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "drugId_not_valid",
      message: `DrugId is not valid, please check it`,
    });
  });

  test("should update the vaccination successfully", async () => {
    const prisma: any = {
      vaccination: {
        findUnique: jest.fn(() => ({})),
        update: jest.fn(() => ({})),
      },
      drug: {
        findFirst: jest.fn(() => ({})),
      },
    };
    const options = {
      id: 1,
      data: {
        name: "COVID-19",
        drugId: 1,
        dose: 1,
        date: "12/11/2022",
      },
    };
    const result = await vaccinationUpdateUseCase(prisma, options);
    expect(result).toMatchObject({
      message: `Vaccination updated successfully`,
    });
  });
});
