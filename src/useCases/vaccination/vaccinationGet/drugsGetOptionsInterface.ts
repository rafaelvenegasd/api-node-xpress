export interface DrugsGetOptionsInterface {
  select: {
    id?: boolean;
    name?: boolean;
    approved?: boolean;
    minDose?: boolean;
    maxDose?: boolean;
    availableAt?: boolean;
  };
}
