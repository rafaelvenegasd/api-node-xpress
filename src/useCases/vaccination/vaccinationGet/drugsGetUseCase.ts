import { DrugsGetOptionsInterface } from "./drugsGetOptionsInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const drugsGetUseCase = async (options: DrugsGetOptionsInterface) => {
  const drugs = await prisma.drug.findMany({
    select: options.select,
  });

  return {
    drugs,
  };
};
