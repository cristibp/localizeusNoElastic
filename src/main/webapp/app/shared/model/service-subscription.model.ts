import { Moment } from 'moment';
import { Periodicity } from 'app/shared/model/enumerations/periodicity.model';

export interface IServiceSubscription {
  id?: number;
  start?: string;
  end?: string;
  paymentType?: Periodicity;
  refCompanyId?: number;
  refPlanId?: number;
}

export const defaultValue: Readonly<IServiceSubscription> = {};
