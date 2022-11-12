import { DrugsCreateOptionsInterface } from "./drugsCreateOptionsInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const drugsCreateUseCase = async (
  options: DrugsCreateOptionsInterface
) => {
  const dbDrug = await prisma.drug.findFirst({
    where: { name: options.name },
  });

  if (
    options.approved === null ||
    !options.availableAt ||
    !options.maxDose ||
    !options.minDose ||
    !options.name
  ) {
    return {
      type: "incomplete",
      message: `All fields are required`,
    };
  }

  if (dbDrug) {
    return {
      type: "already_exists",
      message: `Drug already exists`,
    };
  }

  const createdDrug = await prisma.drug.create({
    data: {
      name: options.name,
      approved: options.approved,
      minDose: options.minDose,
      maxDose: options.maxDose,
      availableAt: new Date(options.availableAt),
    },
  });

  return {
    message: `Drug created successfully`,
    data: { ...createdDrug },
  };
};
