import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, takeUntil} from "rxjs";
import {Content} from "../../models/content";
import {ContentService} from "../../services/content.service";
import {Store} from "@ngrx/store";
import {
  getCurrentPage,
  getProgram,
  isLoading,
  getPages,
  getContentForOnePage, getError
} from "../../store/selectors";
import {actions} from "../../store/actions";
import {ProgramType} from "../../types/program";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {INPUT} from "../../constants/content";
import {ClearFormService} from "../../services/clear-form.service";
@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  content$: Observable<Content[]> = this.store.select(getContentForOnePage);
  isLoading$: Observable<boolean> = this.store.select(isLoading);
  program$: Observable<ProgramType> = this.store.select(getProgram);
  page$: Observable<number> = this.store.select(getCurrentPage);
  pages$: Observable<number[]> = this.store.select(getPages);
  error$: Observable<HttpErrorResponse | null> = this.store.select(getError);

  formGroup!: FormGroup;
  protected readonly INPUT = INPUT;

  constructor(
    private contentService: ContentService,
    private clearFormService: ClearFormService,
    private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(actions.loadContent());
    this.formGroup = new FormGroup({
      input: new FormControl(''),
    });
    this.formGroup.controls[INPUT].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(search => {
        this.store.dispatch(actions.changeSearchData({search}))
      }
    );
    this.clearFormService.clearForm$.pipe(takeUntil(this.destroy$))
      .subscribe( () => this.formGroup.controls[INPUT].setValue(''))
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  changePage(page: number): void {
    this.store.dispatch(actions.changePageData({page}))
  }

  yearsHandler({start, end}: {start?: number, end?: number}): void {
    if (start) {
      this.store.dispatch(actions.changeStartDate({start}))
    } else if (end) {
      this.store.dispatch(actions.changeEndDate({end}))
    }
  }
}
