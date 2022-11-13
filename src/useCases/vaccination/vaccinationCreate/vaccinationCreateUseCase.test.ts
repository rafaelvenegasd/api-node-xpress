import { vaccinationCreateUseCase } from "./vaccinationCreateUseCase";

describe("vaccinationCreateUseCase test", () => {
  test("should return error type 'incomplete' when one or more required fields are not sent", async () => {
    const prisma: any = {};
    const options = {
      name: "",
      drugId: 1,
      dose: 1,
      date: "",
    };
    const result = await vaccinationCreateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "incomplete",
      message: `All fields are required`,
    });
  });

  test("should return error type 'already_exists' when the vaccination to create is already created", async () => {
    const prisma: any = {
      vaccination: {
        findFirst: jest.fn(() => ({})),
      },
    };
    const options = {
      name: "paracetamol",
      drugId: 1,
      dose: 1,
      date: "12/11/2022",
    };
    const result = await vaccinationCreateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "already_exists",
      message: `Vaccination already exists`,
    });
  });

  test("should return error type 'drugId_not_valid' when try to create a vaccination with an invalid drugId", async () => {
    const prisma: any = {
      vaccination: {
        findFirst: jest.fn(() => null),
      },
      drug: {
        findUnique: jest.fn(() => null),
      },
    };
    const options = {
      name: "paracetamol",
      drugId: 1,
      dose: 1,
      date: "12/11/2022",
    };
    const result = await vaccinationCreateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "drugId_not_valid",
      message: `DrugId is not valid, please check it`,
    });
  });

  test("should return error type 'drug_dose_not_allowed' when the dose to create is incorrect", async () => {
    const prisma: any = {
      vaccination: {
        findFirst: jest.fn(() => null),
      },
      drug: {
        findUnique: jest.fn(() => ({
          minDose: 2,
        })),
      },
    };
    const options = {
      name: "paracetamol",
      drugId: 1,
      dose: 1,
      date: "12/11/2022",
    };
    const result = await vaccinationCreateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "drug_dose_not_allowed",
      message: `Drug dosis is not allowed`,
    });
  });

  test("should return error type 'date_not_allowed' when the date to create is later of availableAt  drug field", async () => {
    const prisma: any = {
      vaccination: {
        findFirst: jest.fn(() => null),
      },
      drug: {
        findUnique: jest.fn(() => ({
          availableAt: new Date("11/11/2022"),
        })),
      },
    };
    const options = {
      name: "paracetamol",
      drugId: 1,
      dose: 1,
      date: "12/11/2022",
    };
    const result = await vaccinationCreateUseCase(prisma, options);
    expect(result).toMatchObject({
      type: "date_not_allowed",
      message: `The vaccination is not allowed in this date`,
    });
  });
  test("should create the vaccination succesfully", async () => {
    const prisma: any = {
      vaccination: {
        findFirst: jest.fn(() => null),
        create: jest.fn(() => ({})),
      },
      drug: {
        findUnique: jest.fn(() => ({
          availableAt: new Date("13/11/2022"),
          minDose: 1,
        })),
      },
    };
    const options = {
      name: "paracetamol",
      drugId: 1,
      dose: 1,
      date: "12/11/2022",
    };
    const result = await vaccinationCreateUseCase(prisma, options);
    expect(result).toMatchObject({
      message: `Vaccination created successfully`,
    });
  });
});
