import { Component, Input, OnDestroy, inject } from '@angular/core';
import { Newspaper } from '../models/Newspaper';
import { map } from 'rxjs';
import { UserService } from '@common/permission-system/UserService';
import { NewspaperRepository } from '../services/NewspaperRepository';
import { SubscriptionHandler, SubscriptionHandlerProvider } from '@common/help/services/SubscriptionHandler';

@Component({
  selector: 'app-newspaper-preview',
  templateUrl: './newspaper-preview.component.html',
  styleUrl: './newspaper-preview.component.css',
  providers: [SubscriptionHandlerProvider]
})
export class NewspaperPreviewComponent implements OnDestroy {
  @Input({ required: true }) public newspaper!: Newspaper;
  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  public readonly newspapersRepository = inject(NewspaperRepository);
  private readonly subscriptionHandler = inject(SubscriptionHandler);
  public onDelete(newspaper: Newspaper){
    this.subscriptionHandler.subscribe(this.newspapersRepository.delete(newspaper.id));
  }
  ngOnDestroy(): void {
    this.subscriptionHandler.destroy();
  }
}
