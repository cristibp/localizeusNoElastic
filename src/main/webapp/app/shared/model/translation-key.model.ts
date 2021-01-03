export interface ITranslationKey {
  id?: number;
  name?: string;
  fallbackValue?: string;
  refProjectId?: number;
}

export const defaultValue: Readonly<ITranslationKey> = {};
