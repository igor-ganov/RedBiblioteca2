import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {

}
