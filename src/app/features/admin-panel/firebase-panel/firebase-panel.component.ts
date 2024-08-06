import { Component, inject } from '@angular/core';
import { SubscriptionHandler, SubscriptionHandlerProvider } from '@common/help/services/SubscriptionHandler';
import { from, switchMap } from 'rxjs';
import { CloneService, StoreRoot } from './CloneService';

@Component({
  selector: 'app-firebase-panel',
  templateUrl: './firebase-panel.component.html',
  styleUrl: './firebase-panel.component.css',
  providers: [SubscriptionHandlerProvider]
})
export class FirebasePanelComponent {
  private readonly cloneService = inject(CloneService);
  private readonly subscriptionHandler = inject(SubscriptionHandler);
  public langFrom = 'it';
  public langTo = 'en';
  public readonly langList = ['it', 'en', 'ru', 'fr', 'de'];


  public cloneData(){
    this.subscriptionHandler.subscribe(
      from(this.cloneService.export(`content/${this.langFrom}`, StoreRoot))
      .pipe(switchMap(r => this.cloneService.import(r, `content/${this.langTo}`)))
    );
  }
}

