import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserProjectPermission, defaultValue } from 'app/shared/model/user-project-permission.model';

export const ACTION_TYPES = {
  FETCH_USERPROJECTPERMISSION_LIST: 'userProjectPermission/FETCH_USERPROJECTPERMISSION_LIST',
  FETCH_USERPROJECTPERMISSION: 'userProjectPermission/FETCH_USERPROJECTPERMISSION',
  CREATE_USERPROJECTPERMISSION: 'userProjectPermission/CREATE_USERPROJECTPERMISSION',
  UPDATE_USERPROJECTPERMISSION: 'userProjectPermission/UPDATE_USERPROJECTPERMISSION',
  DELETE_USERPROJECTPERMISSION: 'userProjectPermission/DELETE_USERPROJECTPERMISSION',
  RESET: 'userProjectPermission/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserProjectPermission>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UserProjectPermissionState = Readonly<typeof initialState>;

// Reducer

export default (state: UserProjectPermissionState = initialState, action): UserProjectPermissionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERPROJECTPERMISSION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERPROJECTPERMISSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USERPROJECTPERMISSION):
    case REQUEST(ACTION_TYPES.UPDATE_USERPROJECTPERMISSION):
    case REQUEST(ACTION_TYPES.DELETE_USERPROJECTPERMISSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USERPROJECTPERMISSION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERPROJECTPERMISSION):
    case FAILURE(ACTION_TYPES.CREATE_USERPROJECTPERMISSION):
    case FAILURE(ACTION_TYPES.UPDATE_USERPROJECTPERMISSION):
    case FAILURE(ACTION_TYPES.DELETE_USERPROJECTPERMISSION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROJECTPERMISSION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROJECTPERMISSION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERPROJECTPERMISSION):
    case SUCCESS(ACTION_TYPES.UPDATE_USERPROJECTPERMISSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERPROJECTPERMISSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/user-project-permissions';

// Actions

export const getEntities: ICrudGetAllAction<IUserProjectPermission> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERPROJECTPERMISSION_LIST,
  payload: axios.get<IUserProjectPermission>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUserProjectPermission> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERPROJECTPERMISSION,
    payload: axios.get<IUserProjectPermission>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUserProjectPermission> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERPROJECTPERMISSION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserProjectPermission> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERPROJECTPERMISSION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserProjectPermission> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERPROJECTPERMISSION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
