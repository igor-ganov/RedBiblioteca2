import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
<div class="container">
    <span class="text">404 Not found</span>
</div>
`,
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {

}
