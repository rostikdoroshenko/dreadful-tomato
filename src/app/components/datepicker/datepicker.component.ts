import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {FormControl} from "@angular/forms";
import * as _moment from 'moment';
import {  Moment } from 'moment';
import {ClearFormService} from "../../services/clear-form.service";
import {Subject, takeUntil} from "rxjs";

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatepickerComponent implements OnInit, OnDestroy {
  @Output() yearsRangeSelected = new EventEmitter<{start?: number, end?: number}>();

  destroy$: Subject<boolean> = new Subject();

  minDate: Date = new Date(1950, 0, 1);
  maxDate: Date = new Date();
  minForEndDate: Date = this.minDate;
  maxForStartDate: Date = this.maxDate;
  start = new FormControl(moment());
  end = new FormControl(moment());

  constructor(private clearFormService: ClearFormService) {
    this.start.setValue(moment(this.minDate));
  }

  ngOnInit(): void {
    this.clearFormService.clearForm$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.minDate = new Date(1950, 0, 1);
      this.minForEndDate = this.minDate;
      this.start.setValue(moment(this.minDate));
      this.maxDate = new Date();
      this.end.setValue(moment(this.maxDate));
      this.maxForStartDate = this.maxDate;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  chosenStartHandler(normalizedYear: Moment, dp: any): void {
    const ctrlValue = this.start.value;
    ctrlValue?.year(normalizedYear.year());
    this.start.setValue(ctrlValue);

    if (ctrlValue) {
      this.minForEndDate = ctrlValue?.toDate();
    }

    dp.close();
    this.yearsRangeSelected.emit({start: ctrlValue?.year()})
  }

  chosenEndHandler(normalizedYear: Moment, dp: any): void {
    const ctrlValue = this.end.value;
    ctrlValue?.year(normalizedYear.year());
    this.end.setValue(ctrlValue);

    if (ctrlValue) {
      this.maxForStartDate = ctrlValue?.toDate();
    }

    dp.close();
    this.yearsRangeSelected.emit({end: ctrlValue?.year()})
  }
}
