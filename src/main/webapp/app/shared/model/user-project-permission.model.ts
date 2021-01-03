export interface IUserProjectPermission {
  id?: number;
  refUserId?: number;
  refProjectId?: number;
  refUserPermissionId?: number;
}

export const defaultValue: Readonly<IUserProjectPermission> = {};
