import { DrugsDeleteOptionsInterface } from "./drugsDeleteOptionsInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const drugsDeleteUseCase = async (
  options: DrugsDeleteOptionsInterface
) => {
  const drugDB = await prisma.drug.findUnique({
    where: { id: options.id },
  });

  if (!drugDB) {
    return {
      type: "does_not_exist",
      message: `Drug doesn't exist, please check it`,
    };
  }

  const deletedDrug = await prisma.drug.delete({
    where: { id: options.id },
  });

  return {
    message: `Drug deleted successfully`,
    drug: { ...deletedDrug },
  };
};
