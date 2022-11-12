import { VaccinationDeleteOptionsInterface } from "./vaccinationDeleteOptionsInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const vaccinationDeleteUseCase = async (
  options: VaccinationDeleteOptionsInterface
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

  const deletedVaccination = await prisma.vaccination.delete({
    where: { id: options.id },
  });

  return {
    message: `Vaccination deleted successfully`,
    vaccination: { ...deletedVaccination },
  };
};
