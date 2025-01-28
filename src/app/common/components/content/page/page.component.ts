import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-page',
  template: `
<p>page works!</p>

`,
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {

}
