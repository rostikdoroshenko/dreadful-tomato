import {createFeatureSelector, createSelector} from "@ngrx/store";
import {APP_KEY, AppState} from "./state";
import {initialState} from "./reducer";

export const featureSelector
  = createFeatureSelector<AppState>(APP_KEY);

export const getContent = createSelector(
  featureSelector,
  state => state.content
);

export const getFilterData = createSelector(
  featureSelector,
  state => state.filterData
);

export const getCurrentPage = createSelector(
  getFilterData,
  (filterData) => filterData.page
);

export const getFilteredContent = createSelector(
  getContent,
  getFilterData,
  (content, {search, start, end}) => content
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter(searchedItem => searchedItem.releaseYear >= start && searchedItem.releaseYear <= end)
);

export const getContentForOnePage = createSelector(
  getFilteredContent,
  getFilterData,
  (content, {page}) => content
    .filter((_,n) => (n+1) > (page*10-10) && (n+1) <= (page*10))
);

export const getPages = createSelector(
  getFilteredContent,
  (filteredContent) => {
    const pages = Math.ceil(filteredContent.length / 10);
    const arr = [];
    for (let i = 1; i <=pages; i++) {
      arr.push(i);
    }
    return arr;
  }
);

export const getError = createSelector(
  featureSelector,
  state => state.error
);

export const getProgram = createSelector(
  featureSelector,
  state => state.program
);

export const isLoading = createSelector(
  featureSelector,
  state => state.isLoadContent
);

export const isAppliedFilters = createSelector(
  getFilterData,
  filterData =>
    filterData.search !== initialState.filterData.search
    || filterData.start !== initialState.filterData.start
    || filterData.end !== initialState.filterData.end
);
