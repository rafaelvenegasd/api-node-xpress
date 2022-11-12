export interface DrugsGetOptionsInterface {
  select: {
    name?: boolean;
    approved?: boolean;
    minDose?: boolean;
    maxDose?: boolean;
    availableAt?: boolean;
  };
}
