import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utilities";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.Action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesAndDocument, "catetgories");
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
