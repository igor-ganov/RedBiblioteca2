import {ChangeDetectionStrategy, Component, contentChild, input, Input, TemplateRef} from '@angular/core';
import {Result} from '@common/help/services/Result';
import {Observable} from 'rxjs';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {ErrorsComponent} from '../errors/errors.component';
import {LoadingComponent} from '../../loading/loading.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [NgTemplateOutlet, ErrorsComponent, LoadingComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  public readonly templateRef = contentChild.required(TemplateRef);
  @Input()
  public readonly request$ = input<Observable<Result<unknown>>>()
}
