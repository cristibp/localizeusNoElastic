import { Moment } from 'moment';

export interface IApiKey {
  id?: number;
  value?: string;
  startDate?: string;
  endDate?: string;
  refUserId?: number;
}

export const defaultValue: Readonly<IApiKey> = {};
