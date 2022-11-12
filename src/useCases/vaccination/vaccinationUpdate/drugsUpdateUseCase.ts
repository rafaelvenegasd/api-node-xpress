import { DrugsUpdateOptionsInterface } from "./drugsUpdateOptionsInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const drugsUpdateUseCase = async (
  options: DrugsUpdateOptionsInterface
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

  const updatedDrug = await prisma.drug.update({
    where: { id: options.id },
    data: {
      ...options.data,
    },
  });

  return {
    message: `Drug updated successfully`,
    drug: { ...updatedDrug },
  };
};
