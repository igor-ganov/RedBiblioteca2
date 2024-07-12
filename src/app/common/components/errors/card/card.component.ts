import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Result } from '@common/help/services/Result';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @ContentChild(TemplateRef) templateRef?: TemplateRef<any>;
  @Input()
  public request$: Observable<Result<any>> | undefined;
}
