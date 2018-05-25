import * as types from './actionTypes';
import BucketlistService from '../api/bucketlistApi';
import * as apiCallActions from './apiCallActions';

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const loadBucketlistsSuccess = ({ data, screen }) => ({
  type: types.LOAD_BUCKETLISTS_SUCCESS,
  data,
  screen,
  message: '',
});

export const loadAllBucketlistsSuccess = ({ data, screen }) => ({
  type: types.LOAD_ALL_BUCKETLISTS_SUCCESS,
  data,
  screen,
  message: '',
});

export const createBucketlistSuccess = (bucketlist, screen) => ({
  type: types.CREATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
});

export const updateBucketlistSuccess = (bucketlist, screen) => ({
  type: types.UPDATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
});

export const deleteBucketlistSuccess = ({ bucketlist, screen }) => ({
  type: types.DELETE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
});

export const createItemSuccess = (bucketlist, item) => ({
  type: types.CREATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists',
});

export const updateItemSuccess = ({ bucketlist, item }) => ({
  type: types.UPDATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: 'Success',
  screen: 'myBucketlists',
});

export const deleteItemSuccess = ({ bucketlist, item }) => ({
  type: types.DELETE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: 'Success',
  screen: 'myBucketlists',
});

export const resetMessage = dispatch => dispatch({
  type: types.RESET_MESSAGE,
});

export const resetError = dispatch => dispatch({
  type: types.RESET_ERROR,
});

export const addNewBucketlist = bucketlist => ({
  type: types.ADD_NEW_BUCKETLIST,
  bucketlist,
});

export const loadMore = data => ({
  type: types.LOAD_MORE_BUCKETLISTS,
  data,
  message: '',
  screen: 'loader',
});

export const loadMoreAll = data => ({
  type: types.LOAD_MORE_ALL_BUCKETLISTS,
  data,
  message: '',
  screen: 'loader',
});

export const loadMoreBucketlists = (type, offset = 0, limit = 10, search = '') => async (dispatch) => {
  const action = type === 'allBucketlists' ? BucketlistService.getAllBucketlists : BucketlistService.getBucketlists;
  const actionCreator = type === 'allBucketlists' ? loadMoreAll : loadMore;
  dispatch(apiCallActions.beginApiCall({ screen: 'loader' }));
  const response = await action(offset, limit, search);
  if (!response.error) {
    dispatch(actionCreator(response));
  } else {
    dispatch(apiCallActions.apiCallError({ screen: 'loader', error: '' }));
  }
};

export const loadBucketlists = (offset = 0, limit = 10, search = '') => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));
  const response = await BucketlistService.getBucketlists(offset, limit, search);
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ screen: 'myBucketlists', error: response.error }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(loadBucketlistsSuccess({ data: response, screen: 'myBucketlists' }));
    dispatch(apiCallActions.resetMessage());
  }
};

export const loadAllBucketlists = (offset = 0, limit = 10, search = '') => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'allBucketlists' }));
  const response = await BucketlistService.getAllBucketlists(offset, limit, search);
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ screen: 'allBucketlists', error: response.error }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(loadAllBucketlistsSuccess({ data: response, screen: 'allBucketlists' }));
  }
  dispatch(apiCallActions.resetMessage());
};

export const saveBucketlist = (bucketlist, screen) => async (dispatch) => {
  const response = await BucketlistService.saveBucketlist(bucketlist);
  dispatch(apiCallActions.beginApiCall({ screen }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(createBucketlistSuccess(response, screen));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};

export const updateBucketlist = (bucketlist, screen) => async (dispatch) => {
  const response = await BucketlistService.updateBucketlist(bucketlist);
  dispatch(apiCallActions.beginApiCall({ screen }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateBucketlistSuccess(response, screen));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};

export const deleteBucketlist = (bucketlist, screen) => async (dispatch) => {
  const response = await BucketlistService.deleteBucketlist(bucketlist);
  dispatch(apiCallActions.beginApiCall({ screen }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError(...response, screen));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteBucketlistSuccess({ bucketlist, ...response, screen }));
    dispatch(apiCallActions.resetMessage());
  }
};

export const saveItem = (bucketlist, item) => async (dispatch) => {
  const response = await BucketlistService.addItem(bucketlist, item);
  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'myBucketlists' }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(createItemSuccess(bucketlist, response));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};

export const updateItem = (bucketlist, item) => async (dispatch) => {
  const response = await BucketlistService.updateItem(bucketlist, item);
  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'myBucketlists' }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateItemSuccess({ bucketlist, item, ...response }));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};

export const deleteItem = (bucketlist, item) => async (dispatch) => {
  const response = await BucketlistService.deleteItem(bucketlist, item);
  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'myBucketlists' }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteItemSuccess({ bucketlist, item, ...response }));
    dispatch(apiCallActions.resetMessage());
  }
};
