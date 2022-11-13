import { VaccinationUpdateOptionsInterface } from "./vaccinationUpdateOptionsInterface";
import { PrismaClient } from "@prisma/client";

export const vaccinationUpdateUseCase = async (
  prisma: PrismaClient,
  options: VaccinationUpdateOptionsInterface
) => {
  const vaccinationDB = await prisma.vaccination.findUnique({
    where: { id: options.id },
  });

  if (!vaccinationDB) {
    return {
      type: "does_not_exist",
      message: `Vaccination doesn't exist, please check it`,
    };
  }

  const drugDB = await prisma.drug.findFirst({
    where: { id: options.data.drugId },
  });

  if (!drugDB) {
    return {
      type: "drugId_not_valid",
      message: `DrugId is not valid, please check it`,
    };
  }

  const updatedVaccination = await prisma.vaccination.update({
    where: { id: options.id },
    data: {
      ...options.data,
    },
  });

  return {
    message: `Vaccination updated successfully`,
    vaccination: { ...updatedVaccination },
  };
};
