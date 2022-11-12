export interface DrugsUpdateOptionsInterface {
  id: number;
  data: {
    name?: string;
    approved?: boolean;
    minDose?: number;
    maxDose?: number;
    availableAt?: string;
  };
}
