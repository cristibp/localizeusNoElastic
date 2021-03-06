import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITranslationKey, defaultValue } from 'app/shared/model/translation-key.model';

export const ACTION_TYPES = {
  FETCH_TRANSLATIONKEY_LIST: 'translationKey/FETCH_TRANSLATIONKEY_LIST',
  FETCH_TRANSLATIONKEY: 'translationKey/FETCH_TRANSLATIONKEY',
  CREATE_TRANSLATIONKEY: 'translationKey/CREATE_TRANSLATIONKEY',
  UPDATE_TRANSLATIONKEY: 'translationKey/UPDATE_TRANSLATIONKEY',
  DELETE_TRANSLATIONKEY: 'translationKey/DELETE_TRANSLATIONKEY',
  RESET: 'translationKey/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITranslationKey>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type TranslationKeyState = Readonly<typeof initialState>;

// Reducer

export default (state: TranslationKeyState = initialState, action): TranslationKeyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRANSLATIONKEY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRANSLATIONKEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TRANSLATIONKEY):
    case REQUEST(ACTION_TYPES.UPDATE_TRANSLATIONKEY):
    case REQUEST(ACTION_TYPES.DELETE_TRANSLATIONKEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRANSLATIONKEY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRANSLATIONKEY):
    case FAILURE(ACTION_TYPES.CREATE_TRANSLATIONKEY):
    case FAILURE(ACTION_TYPES.UPDATE_TRANSLATIONKEY):
    case FAILURE(ACTION_TYPES.DELETE_TRANSLATIONKEY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSLATIONKEY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSLATIONKEY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRANSLATIONKEY):
    case SUCCESS(ACTION_TYPES.UPDATE_TRANSLATIONKEY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRANSLATIONKEY):
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

const apiUrl = 'api/translation-keys';

// Actions

export const getEntities: ICrudGetAllAction<ITranslationKey> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSLATIONKEY_LIST,
    payload: axios.get<ITranslationKey>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ITranslationKey> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSLATIONKEY,
    payload: axios.get<ITranslationKey>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITranslationKey> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRANSLATIONKEY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITranslationKey> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRANSLATIONKEY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITranslationKey> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRANSLATIONKEY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
