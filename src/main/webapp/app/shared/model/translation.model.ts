export interface ITranslation {
  id?: number;
  value?: string;
  refTranslationKeyId?: number;
  refLanguageId?: number;
}

export const defaultValue: Readonly<ITranslation> = {};
