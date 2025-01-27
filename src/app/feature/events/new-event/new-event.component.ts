import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventComponent {

}
