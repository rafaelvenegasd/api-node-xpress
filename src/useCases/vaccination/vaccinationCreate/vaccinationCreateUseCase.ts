import { VaccinationCreateOptionsInterface } from "./vaccinationCreateOptionsInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const vaccinationCreateUseCase = async (
  options: VaccinationCreateOptionsInterface
) => {
  const dbVaccination = await prisma.vaccination.findFirst({
    where: { name: options.name },
  });

  if (!options.name || !options.drugId || !options.dose || !options.date) {
    return {
      type: "incomplete",
      message: `All fields are required`,
    };
  }

  if (dbVaccination) {
    return {
      type: "already_exists",
      message: `Vaccination already exists`,
    };
  }

  const dbDrug = await prisma.drug.findUnique({
    where: { id: options.drugId },
  });

  if (!dbDrug) {
    return {
      type: "drug_not_found",
      message: `Drug not found`,
    };
  }

  if (options.dose > dbDrug.maxDose || options.dose < dbDrug.minDose) {
    return {
      type: "drug_dose_not_allowed",
      message: `Drug dosis is not allowed`,
    };
  }

  if (new Date(options.date) > dbDrug.availableAt) {
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
