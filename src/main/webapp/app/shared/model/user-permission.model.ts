import { PermissionType } from 'app/shared/model/enumerations/permission-type.model';

export interface IUserPermission {
  id?: number;
  type?: PermissionType;
  refUserId?: number;
  refProjectId?: number;
}

export const defaultValue: Readonly<IUserPermission> = {};
