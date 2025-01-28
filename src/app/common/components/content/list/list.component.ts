import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
<p>list works!</p>

`,
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {

}
