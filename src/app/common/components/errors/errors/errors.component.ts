import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ErrorResult} from '@common/help/services/Result';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent {
  public readonly result = input.required<ErrorResult>();
}
