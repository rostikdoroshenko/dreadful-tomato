import {createAction, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {ProgramType} from "../types/program";
import {Content} from "../models/content";

export const actions = {
  setProgram: createAction('[CONTENT] set program', props<{ program: ProgramType }>()),
  loadContent: createAction('[CONTENT] load content'),
  changeSearchData: createAction('[CONTENT] change search data', props<{ search: string }>()),
  changePageData: createAction('[CONTENT] change page data', props<{ page: number }>()),
  changeStartDate: createAction('[CONTENT] change start date', props<{ start: number }>()),
  changeEndDate: createAction('[CONTENT] change end date', props<{ end: number }>()),
  loadedContentSuccess: createAction('[CONTENT] load content success', props<{ content: Content[] }>()),
  loadedContentError: createAction('[CONTENT] load content error', props<{ error: HttpErrorResponse }>()),
  getSearchedContent: createAction('[CONTENT] get searched content', props<{ search: string }>()),
  resetFilters: createAction('[CONTENT] reset filters'),
}
