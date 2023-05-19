import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {ContentService} from "../services/content.service";
import {catchError, delay, map, of, switchMap, tap} from "rxjs";
import {actions} from "./actions";
import {getProgram} from "./selectors";
import {ClearFormService} from "../services/clear-form.service";

@Injectable()
export class Effects {
  constructor(private actions$: Actions,
              private store: Store,
              private contentService: ContentService,
              private clearFormService: ClearFormService
  ) {
  }

  loadContent$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.loadContent),
        concatLatestFrom(() => this.store.select(getProgram)),
        switchMap(([, program]) => this.contentService.fetchContent()
          .pipe(
            delay(1000),
            map(({entries}) => {
              const content = entries.filter(item => item.programType === program);
                return actions.loadedContentSuccess({content});
              }),
            catchError((error) => of(actions.loadedContentError({error})))
          )),
      )
  );

  resetFilters$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.resetFilters),
        tap(() => this.clearFormService.clearForm())
      ),
    {dispatch: false}
  )
}
