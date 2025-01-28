import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
<div class="container">

</div>

`,
  styleUrl: './test.component.css',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {

}
