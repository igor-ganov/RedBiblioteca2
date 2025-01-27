import { Component, inject, OnInit, OnDestroy, input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventMessageQueue } from '../../help/services/EventMassageQueue';
import { SubscriptionManager } from '../../help/services/SubscriptionManager';
import { LocaleHost } from '../../lang-system/LocaleHost';
import { UserService } from '../UserService';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-sign-io-button',
    templateUrl: './sign-io-button.component.html',
    styleUrl: './sign-io-button.component.css',
    providers: [SubscriptionManager],
    imports: [NgIf, MatIconButton, MatIcon, MatButton, AsyncPipe]
})
export class SignIoButtonComponent implements OnInit, OnDestroy {
  public readonly horizontal = input(true);

  private readonly router = inject(Router);
  private readonly localeHost = inject(LocaleHost);
  public lang$? : Observable<string>;
  public readonly userService = inject(UserService);

  public onSignIn(lang: string){
    const path = `/${lang}/login`;
    const url = path;

    const navigationExtras: NavigationExtras = {
      queryParams: { redirectInfo: this.router.url, redirectLang: lang },
    };
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`], navigationExtras);
    })
  }
  public onSignOut(lang: string){
    this.subscribe(this.userService.singOut(), () => {
      const path = `/${lang}/login`;
      const url = path;//this.router.url;

      const navigationExtras: NavigationExtras = {
        queryParams: { redirectInfo: this.router.url, redirectLang: lang },
      };
      this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
        this.router.navigate([`/${url}`], navigationExtras);
      })
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.lang$ = this.localeHost.getLanguageAsync();
    })
  }

  //Common
  private readonly subscriptionManager = inject(SubscriptionManager);
  private readonly eventMessageQueue = inject(EventMessageQueue);
  private subscribe<T>(observable : Observable<T>, handler: ((value: T) => void) | undefined = undefined){
    this.subscriptionManager.createSubscriptionFor(observable, handler, (e) => this.alertError(e));
  }
  
  private alertError(error: string | Error){
    this.eventMessageQueue.pushError(error);
  }
  ngOnDestroy(): void {
    this.subscriptionManager.clearSubscriptions();
  }
}
