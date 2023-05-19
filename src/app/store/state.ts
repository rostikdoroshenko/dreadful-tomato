import {Content, FilterData} from "../models/content";
import {HttpErrorResponse} from "@angular/common/http";
import {ActionReducerMap} from "@ngrx/store";
import {ProgramType} from "../types/program";
import {reducer} from "./reducer";

export const APP_KEY = 'app';

export interface AppState {
  content: Content[];
  isLoadContent: boolean;
  program: ProgramType;
  error: HttpErrorResponse | null;
  filterData: FilterData;
}

export interface State {
  [APP_KEY]: AppState;
}

export const reducers: ActionReducerMap<State> = {
  [APP_KEY]: reducer,
};
