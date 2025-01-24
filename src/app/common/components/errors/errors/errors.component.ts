import { Component, Input } from '@angular/core';
import { ErrorResult } from '@common/help/services/Result';

@Component({
    selector: 'app-errors',
    templateUrl: './errors.component.html',
    styleUrl: './errors.component.css'
})
export class ErrorsComponent {
  @Input({required: true})
  public result!: ErrorResult
}
