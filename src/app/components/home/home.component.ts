import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ProgramType} from "../../types/program";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {actions} from "../../store/actions";
import {CONTENT} from "../../constants/content";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  protected readonly ProgramType = ProgramType;
  constructor(private router: Router, private store: Store) {
  }
  clickHandler(program: ProgramType): void {
    this.store.dispatch(actions.setProgram({program}));
    this.router.navigate([CONTENT]);
  }
}
