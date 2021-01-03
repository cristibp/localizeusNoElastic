import { ProjectActions } from 'app/shared/model/enumerations/project-actions.model';

export interface IProjectHistory {
  id?: number;
  action?: ProjectActions;
  oldValue?: string;
  newValue?: string;
  refUserId?: number;
  refTranslationKeyId?: number;
  refTranslationId?: number;
}

export const defaultValue: Readonly<IProjectHistory> = {};
