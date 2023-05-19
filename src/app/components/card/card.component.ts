import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Content} from "../../models/content";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() card!: Content;
}
