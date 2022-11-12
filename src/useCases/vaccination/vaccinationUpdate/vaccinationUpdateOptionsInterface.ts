export interface VaccinationUpdateOptionsInterface {
  id: number;
  data: {
    name?: string;
    drugId?: number;
    dose?: number;
    date?: string;
  };
}
