import {ChangeDetectionStrategy, Component, contentChild, input, Input, TemplateRef} from '@angular/core';
import {Result} from '@common/help/services/Result';
import {Observable} from 'rxjs';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {ErrorsComponent} from '../errors/errors.component';
import {LoadingComponent} from '../../loading/loading.component';

@Component({
  selector: 'app-card',
  template: `
@if (templateRef) {
  @if (request$() | async; as request) {
    <ng-container class="card">
      @if (request.successeful) {
        <ng-container [ngTemplateOutlet]="templateRef()" [ngTemplateOutletContext]="request.result"/>
      }
      @if (!request.successeful) {
        <app-errors [result]="request"/>
      }
    </ng-container>
  } @else {
    <app-loading/>
  }
}

`,
  styleUrl: './card.component.css',
  imports: [NgTemplateOutlet, ErrorsComponent, LoadingComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  public readonly templateRef = contentChild.required(TemplateRef);
  @Input()
  public readonly request$ = input<Observable<Result<unknown>>>()
}
