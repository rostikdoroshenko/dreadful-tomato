import {Component} from '@angular/core';
import {ProgramType} from "../../types/program";
import {Store} from "@ngrx/store";
import {actions} from "../../store/actions";
import {Router} from "@angular/router";
import {CONTENT} from "../../constants/content";
import {Observable} from "rxjs";
import {getProgram, isAppliedFilters} from "../../store/selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  protected readonly ProgramType = ProgramType;
  program$: Observable<ProgramType> = this.store.select(getProgram);
  isAppliedFilters$: Observable<boolean> = this.store.select(isAppliedFilters);

  get isContentPage(): boolean {
    return this.router.url.includes(CONTENT);
  }

  constructor(private store: Store, private router: Router) {
  }

  clickHandler(program: ProgramType): void {
    this.store.dispatch(actions.setProgram({program}));
    this.store.dispatch(actions.loadContent());
  }

  clearFilters(): void {
    this.store.dispatch(actions.resetFilters());
  }
}
