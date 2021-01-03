export interface IComment {
  id?: number;
  value?: string;
  refTranslationKeyId?: number;
}

export const defaultValue: Readonly<IComment> = {};
