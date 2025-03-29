import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-new-event',
  template: `
<p>new-event works!</p>

`,
  styleUrl: './new-event.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventComponent {

}
