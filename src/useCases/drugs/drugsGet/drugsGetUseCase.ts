import { DrugsGetOptionsInterface } from "./drugsGetOptionsInterface";
import { PrismaClient } from "@prisma/client";

export const drugsGetUseCase = async (
  prisma: PrismaClient,
  options: DrugsGetOptionsInterface
) => {
  const drugs = await prisma.drug.findMany({
    select: options.select,
  });

  return {
    drugs,
  };
};
