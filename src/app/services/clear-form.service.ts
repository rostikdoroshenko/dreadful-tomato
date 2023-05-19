import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ClearFormService {
  private clearFormSource = new Subject<boolean>();
  clearForm$ = this.clearFormSource.asObservable();
  clearForm(): void {
    this.clearFormSource.next(true);
  }
}
