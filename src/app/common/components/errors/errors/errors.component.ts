import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ErrorResult} from '@common/help/services/Result';

@Component({
  selector: 'app-errors',
  template: `
<div class="container">
  @switch(result().resultCode){
    @case (404) {
      <span class="text">404 Not found</span>
    }
    @case (500) {
      <span class="text">Internal Server Error</span>
    }
    @default {
      <span class="text">Unknown Error</span>
    }
  }
</div>
`,
  styleUrl: './errors.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent {
  public readonly result = input.required<ErrorResult>();
}
