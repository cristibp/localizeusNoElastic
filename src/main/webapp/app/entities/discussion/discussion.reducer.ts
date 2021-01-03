import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDiscussion, defaultValue } from 'app/shared/model/discussion.model';

export const ACTION_TYPES = {
  FETCH_DISCUSSION_LIST: 'discussion/FETCH_DISCUSSION_LIST',
  FETCH_DISCUSSION: 'discussion/FETCH_DISCUSSION',
  CREATE_DISCUSSION: 'discussion/CREATE_DISCUSSION',
  UPDATE_DISCUSSION: 'discussion/UPDATE_DISCUSSION',
  DELETE_DISCUSSION: 'discussion/DELETE_DISCUSSION',
  RESET: 'discussion/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDiscussion>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type DiscussionState = Readonly<typeof initialState>;

// Reducer

export default (state: DiscussionState = initialState, action): DiscussionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DISCUSSION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DISCUSSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DISCUSSION):
    case REQUEST(ACTION_TYPES.UPDATE_DISCUSSION):
    case REQUEST(ACTION_TYPES.DELETE_DISCUSSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DISCUSSION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DISCUSSION):
    case FAILURE(ACTION_TYPES.CREATE_DISCUSSION):
    case FAILURE(ACTION_TYPES.UPDATE_DISCUSSION):
    case FAILURE(ACTION_TYPES.DELETE_DISCUSSION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DISCUSSION_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_DISCUSSION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DISCUSSION):
    case SUCCESS(ACTION_TYPES.UPDATE_DISCUSSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DISCUSSION):
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

const apiUrl = 'api/discussions';

// Actions

export const getEntities: ICrudGetAllAction<IDiscussion> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DISCUSSION_LIST,
    payload: axios.get<IDiscussion>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IDiscussion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DISCUSSION,
    payload: axios.get<IDiscussion>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDiscussion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DISCUSSION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IDiscussion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DISCUSSION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDiscussion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DISCUSSION,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
