import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApiKey, defaultValue } from 'app/shared/model/api-key.model';

export const ACTION_TYPES = {
  FETCH_APIKEY_LIST: 'apiKey/FETCH_APIKEY_LIST',
  FETCH_APIKEY: 'apiKey/FETCH_APIKEY',
  CREATE_APIKEY: 'apiKey/CREATE_APIKEY',
  UPDATE_APIKEY: 'apiKey/UPDATE_APIKEY',
  DELETE_APIKEY: 'apiKey/DELETE_APIKEY',
  RESET: 'apiKey/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApiKey>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ApiKeyState = Readonly<typeof initialState>;

// Reducer

export default (state: ApiKeyState = initialState, action): ApiKeyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APIKEY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APIKEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_APIKEY):
    case REQUEST(ACTION_TYPES.UPDATE_APIKEY):
    case REQUEST(ACTION_TYPES.DELETE_APIKEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_APIKEY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APIKEY):
    case FAILURE(ACTION_TYPES.CREATE_APIKEY):
    case FAILURE(ACTION_TYPES.UPDATE_APIKEY):
    case FAILURE(ACTION_TYPES.DELETE_APIKEY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIKEY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIKEY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_APIKEY):
    case SUCCESS(ACTION_TYPES.UPDATE_APIKEY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_APIKEY):
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

const apiUrl = 'api/api-keys';

// Actions

export const getEntities: ICrudGetAllAction<IApiKey> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_APIKEY_LIST,
    payload: axios.get<IApiKey>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IApiKey> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APIKEY,
    payload: axios.get<IApiKey>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IApiKey> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APIKEY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApiKey> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APIKEY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApiKey> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APIKEY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
