import { VaccinationGetOptionsInterface } from "./vaccinationGetOptionsInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const vaccinationGetUseCase = async (
  options: VaccinationGetOptionsInterface
) => {
  const vaccinations = await prisma.vaccination.findMany({
    select: options.select,
  });

  return {
    vaccinations,
  };
};
