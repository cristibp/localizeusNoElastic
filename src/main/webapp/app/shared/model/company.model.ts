export interface ICompany {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
}

export const defaultValue: Readonly<ICompany> = {};
