import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-events',
  template: `
<p>events works!</p>

`,
  styleUrl: './events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {

}
