import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITranslation, defaultValue } from 'app/shared/model/translation.model';

export const ACTION_TYPES = {
  FETCH_TRANSLATION_LIST: 'translation/FETCH_TRANSLATION_LIST',
  FETCH_TRANSLATION: 'translation/FETCH_TRANSLATION',
  CREATE_TRANSLATION: 'translation/CREATE_TRANSLATION',
  UPDATE_TRANSLATION: 'translation/UPDATE_TRANSLATION',
  DELETE_TRANSLATION: 'translation/DELETE_TRANSLATION',
  RESET: 'translation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITranslation>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type TranslationState = Readonly<typeof initialState>;

// Reducer

export default (state: TranslationState = initialState, action): TranslationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRANSLATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRANSLATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TRANSLATION):
    case REQUEST(ACTION_TYPES.UPDATE_TRANSLATION):
    case REQUEST(ACTION_TYPES.DELETE_TRANSLATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRANSLATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRANSLATION):
    case FAILURE(ACTION_TYPES.CREATE_TRANSLATION):
    case FAILURE(ACTION_TYPES.UPDATE_TRANSLATION):
    case FAILURE(ACTION_TYPES.DELETE_TRANSLATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSLATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSLATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRANSLATION):
    case SUCCESS(ACTION_TYPES.UPDATE_TRANSLATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRANSLATION):
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

const apiUrl = 'api/translations';

// Actions

export const getEntities: ICrudGetAllAction<ITranslation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSLATION_LIST,
    payload: axios.get<ITranslation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ITranslation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSLATION,
    payload: axios.get<ITranslation>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITranslation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRANSLATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITranslation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRANSLATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITranslation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRANSLATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
