import { VaccinationGetOptionsInterface } from "./vaccinationGetOptionsInterface";
import { PrismaClient } from "@prisma/client";

export const vaccinationGetUseCase = async (
  prisma: PrismaClient,
  options: VaccinationGetOptionsInterface
) => {
  const vaccinations = await prisma.vaccination.findMany({
    select: options.select,
  });

  return {
    vaccinations,
  };
};
