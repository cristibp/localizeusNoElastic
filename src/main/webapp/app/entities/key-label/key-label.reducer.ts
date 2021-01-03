import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IKeyLabel, defaultValue } from 'app/shared/model/key-label.model';

export const ACTION_TYPES = {
  FETCH_KEYLABEL_LIST: 'keyLabel/FETCH_KEYLABEL_LIST',
  FETCH_KEYLABEL: 'keyLabel/FETCH_KEYLABEL',
  CREATE_KEYLABEL: 'keyLabel/CREATE_KEYLABEL',
  UPDATE_KEYLABEL: 'keyLabel/UPDATE_KEYLABEL',
  DELETE_KEYLABEL: 'keyLabel/DELETE_KEYLABEL',
  RESET: 'keyLabel/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IKeyLabel>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type KeyLabelState = Readonly<typeof initialState>;

// Reducer

export default (state: KeyLabelState = initialState, action): KeyLabelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_KEYLABEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_KEYLABEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_KEYLABEL):
    case REQUEST(ACTION_TYPES.UPDATE_KEYLABEL):
    case REQUEST(ACTION_TYPES.DELETE_KEYLABEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_KEYLABEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_KEYLABEL):
    case FAILURE(ACTION_TYPES.CREATE_KEYLABEL):
    case FAILURE(ACTION_TYPES.UPDATE_KEYLABEL):
    case FAILURE(ACTION_TYPES.DELETE_KEYLABEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_KEYLABEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_KEYLABEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_KEYLABEL):
    case SUCCESS(ACTION_TYPES.UPDATE_KEYLABEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_KEYLABEL):
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

const apiUrl = 'api/key-labels';

// Actions

export const getEntities: ICrudGetAllAction<IKeyLabel> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_KEYLABEL_LIST,
    payload: axios.get<IKeyLabel>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IKeyLabel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_KEYLABEL,
    payload: axios.get<IKeyLabel>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IKeyLabel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_KEYLABEL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IKeyLabel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_KEYLABEL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IKeyLabel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_KEYLABEL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
