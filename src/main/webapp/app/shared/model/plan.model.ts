import { Periodicity } from 'app/shared/model/enumerations/periodicity.model';

export interface IPlan {
  id?: number;
  name?: string;
  costInCents?: number;
  keyLimit?: number;
  callsLimit?: number;
  type?: Periodicity;
}

export const defaultValue: Readonly<IPlan> = {};
