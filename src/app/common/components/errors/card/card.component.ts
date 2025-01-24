import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Result } from '@common/help/services/Result';
import { Observable } from 'rxjs';
import { ɵEmptyOutletComponent } from '@angular/router';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { ErrorsComponent } from '../errors/errors.component';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [ɵEmptyOutletComponent, NgTemplateOutlet, ErrorsComponent, LoadingComponent, AsyncPipe]
})
export class CardComponent {
  @ContentChild(TemplateRef) templateRef?: TemplateRef<any>;
  @Input()
  public request$: Observable<Result<any>> | undefined;
}
