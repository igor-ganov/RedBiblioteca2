import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-loading',
  template: `
<div class="container">
    <mat-spinner/>
</div>
`,
  styleUrl: './loading.component.css',
  imports: [MatProgressSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {

}
