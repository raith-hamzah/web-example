import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './actions';

export function* fetchCountry(action) {
  const requestURL = `https://api.carerev.com/api/v1/countries/${action.payload.id}`;
  try {
    const res = yield call(request, requestURL);
    const { id, currency_code, name } = res;
    if (id?.length > 0) {
      yield put(
        actions.fetchCountrySuccess({ id, name, currencyCode: currency_code }),
      );
    } else {
      yield put(actions.fetchCountryError('No country found.'));
    }
  } catch (err: any) {
    yield put(actions.fetchCountryError(err.toString()));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* saga() {
  yield takeLatest(actions.fetchCountry.type, fetchCountry);
}
