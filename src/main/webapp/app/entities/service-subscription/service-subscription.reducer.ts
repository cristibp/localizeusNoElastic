import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IServiceSubscription, defaultValue } from 'app/shared/model/service-subscription.model';

export const ACTION_TYPES = {
  FETCH_SERVICESUBSCRIPTION_LIST: 'serviceSubscription/FETCH_SERVICESUBSCRIPTION_LIST',
  FETCH_SERVICESUBSCRIPTION: 'serviceSubscription/FETCH_SERVICESUBSCRIPTION',
  CREATE_SERVICESUBSCRIPTION: 'serviceSubscription/CREATE_SERVICESUBSCRIPTION',
  UPDATE_SERVICESUBSCRIPTION: 'serviceSubscription/UPDATE_SERVICESUBSCRIPTION',
  DELETE_SERVICESUBSCRIPTION: 'serviceSubscription/DELETE_SERVICESUBSCRIPTION',
  RESET: 'serviceSubscription/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IServiceSubscription>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ServiceSubscriptionState = Readonly<typeof initialState>;

// Reducer

export default (state: ServiceSubscriptionState = initialState, action): ServiceSubscriptionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SERVICESUBSCRIPTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SERVICESUBSCRIPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SERVICESUBSCRIPTION):
    case REQUEST(ACTION_TYPES.UPDATE_SERVICESUBSCRIPTION):
    case REQUEST(ACTION_TYPES.DELETE_SERVICESUBSCRIPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SERVICESUBSCRIPTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SERVICESUBSCRIPTION):
    case FAILURE(ACTION_TYPES.CREATE_SERVICESUBSCRIPTION):
    case FAILURE(ACTION_TYPES.UPDATE_SERVICESUBSCRIPTION):
    case FAILURE(ACTION_TYPES.DELETE_SERVICESUBSCRIPTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERVICESUBSCRIPTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERVICESUBSCRIPTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SERVICESUBSCRIPTION):
    case SUCCESS(ACTION_TYPES.UPDATE_SERVICESUBSCRIPTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SERVICESUBSCRIPTION):
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

const apiUrl = 'api/service-subscriptions';

// Actions

export const getEntities: ICrudGetAllAction<IServiceSubscription> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SERVICESUBSCRIPTION_LIST,
    payload: axios.get<IServiceSubscription>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IServiceSubscription> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SERVICESUBSCRIPTION,
    payload: axios.get<IServiceSubscription>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IServiceSubscription> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SERVICESUBSCRIPTION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IServiceSubscription> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SERVICESUBSCRIPTION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IServiceSubscription> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SERVICESUBSCRIPTION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
