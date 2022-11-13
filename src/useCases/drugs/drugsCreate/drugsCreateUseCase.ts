import { DrugsCreateOptionsInterface } from "./drugsCreateOptionsInterface";
import { PrismaClient } from "@prisma/client";

export const drugsCreateUseCase = async (
  prisma: PrismaClient,
  options: DrugsCreateOptionsInterface
) => {
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

  const dbDrug = await prisma.drug.findFirst({
    where: { name: options.name },
  });

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
