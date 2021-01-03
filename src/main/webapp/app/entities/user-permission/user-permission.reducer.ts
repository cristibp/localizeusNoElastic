import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserPermission, defaultValue } from 'app/shared/model/user-permission.model';

export const ACTION_TYPES = {
  FETCH_USERPERMISSION_LIST: 'userPermission/FETCH_USERPERMISSION_LIST',
  FETCH_USERPERMISSION: 'userPermission/FETCH_USERPERMISSION',
  CREATE_USERPERMISSION: 'userPermission/CREATE_USERPERMISSION',
  UPDATE_USERPERMISSION: 'userPermission/UPDATE_USERPERMISSION',
  DELETE_USERPERMISSION: 'userPermission/DELETE_USERPERMISSION',
  RESET: 'userPermission/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserPermission>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UserPermissionState = Readonly<typeof initialState>;

// Reducer

export default (state: UserPermissionState = initialState, action): UserPermissionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERPERMISSION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERPERMISSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USERPERMISSION):
    case REQUEST(ACTION_TYPES.UPDATE_USERPERMISSION):
    case REQUEST(ACTION_TYPES.DELETE_USERPERMISSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USERPERMISSION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERPERMISSION):
    case FAILURE(ACTION_TYPES.CREATE_USERPERMISSION):
    case FAILURE(ACTION_TYPES.UPDATE_USERPERMISSION):
    case FAILURE(ACTION_TYPES.DELETE_USERPERMISSION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPERMISSION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPERMISSION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERPERMISSION):
    case SUCCESS(ACTION_TYPES.UPDATE_USERPERMISSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERPERMISSION):
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

const apiUrl = 'api/user-permissions';

// Actions

export const getEntities: ICrudGetAllAction<IUserPermission> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERPERMISSION_LIST,
  payload: axios.get<IUserPermission>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUserPermission> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERPERMISSION,
    payload: axios.get<IUserPermission>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUserPermission> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERPERMISSION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserPermission> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERPERMISSION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserPermission> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERPERMISSION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
