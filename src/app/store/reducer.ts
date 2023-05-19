import {createReducer, on} from "@ngrx/store";
import {AppState} from "./state";
import {actions} from "./actions";
import {ProgramType} from "../types/program";

export const initialState: AppState = {
  content: [],
  isLoadContent: false,
  program: ProgramType.MOVIES,
  error: null,
  filterData: {
    search: '',
    start: 1950,
    end: new Date().getFullYear(),
    page: 1
  }
}

export const reducer = createReducer<AppState>(
  initialState,
  on(actions.setProgram, (state: AppState, {program}) => ({
    ...state,
    content: [],
    program,
    isLoadContent: true
  })),
  on(actions.loadContent, (state: AppState) => ({
    ...state,
    content: [],
    filterData: initialState.filterData,
    isLoadContent: true
  })),
  on(actions.loadedContentSuccess, (state, {content})  => ({
    ...state,
    content,
    isLoadContent: false
  })),
  on(actions.loadedContentError, (state, {error})  => ({
    ...state,
    error,
    isLoadContent: false
  })),
  on(actions.changeSearchData, (state, {search})  => ({
    ...state,
    filterData: {
      ...state.filterData,
      page: initialState.filterData.page,
      search
    },
  })),
  on(actions.changePageData, (state, {page})  => ({
    ...state,
    filterData: {
      ...state.filterData,
      page
    },
  })),
  on(actions.changeStartDate, (state, {start})  => ({
    ...state,
    filterData: {
      ...state.filterData,
      page: initialState.filterData.page,
      start
    },
  })),
  on(actions.changeEndDate, (state, {end})  => ({
    ...state,
    filterData: {
      ...state.filterData,
      page: initialState.filterData.page,
      end
    },
  })),
  on(actions.resetFilters, (state)  => ({
    ...state,
    filterData: initialState.filterData
  })),
);
