import { VaccinationCreateOptionsInterface } from "./vaccinationCreateOptionsInterface";
import { PrismaClient } from "@prisma/client";

export const vaccinationCreateUseCase = async (
  prisma: PrismaClient,
  options: VaccinationCreateOptionsInterface
) => {
  if (!options.name || !options.drugId || !options.dose || !options.date) {
    return {
      type: "incomplete",
      message: `All fields are required`,
    };
  }

  const vaccinationDB = await prisma.vaccination.findFirst({
    where: { name: options.name },
  });

  if (vaccinationDB) {
    return {
      type: "already_exists",
      message: `Vaccination already exists`,
    };
  }

  const drugDB = await prisma.drug.findUnique({
    where: { id: options.drugId },
  });

  if (!drugDB) {
    return {
      type: "drugId_not_valid",
      message: `DrugId is not valid, please check it`,
    };
  }

  if (options.dose > drugDB.maxDose || options.dose < drugDB.minDose) {
    return {
      type: "drug_dose_not_allowed",
      message: `Drug dosis is not allowed`,
    };
  }

  if (new Date(options.date) > drugDB.availableAt) {
    return {
      type: "date_not_allowed",
      message: `The vaccination is not allowed in this date`,
    };
  }

  const createdVaccination = await prisma.vaccination.create({
    data: {
      name: options.name,
      drug: { connect: { id: options.drugId } },
      dose: options.dose,
      date: new Date(options.date),
    },
    include: {
      drug: true,
    },
  });

  return {
    message: `Vaccination created successfully`,
    data: { ...createdVaccination },
  };
};
