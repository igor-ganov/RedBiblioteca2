import {ChangeDetectionStrategy, Component, inject, input, OnDestroy} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {EventMessageQueue} from '../../help/services/EventMassageQueue';
import {SubscriptionManager} from '../../help/services/SubscriptionManager';
import {LocaleHost} from '../../lang-system/LocaleHost';
import {UserService} from '../UserService';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {createSubscriptionService} from "@common/help/services/subscription.service";

@Component({
  selector: 'app-sign-io-button',
  templateUrl: './sign-io-button.component.html',
  styleUrl: './sign-io-button.component.css',
  providers: [SubscriptionManager],
  imports: [MatIconButton, MatIcon, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignIoButtonComponent implements OnDestroy {
  public readonly horizontal = input(true);

  private readonly router = inject(Router);
  private readonly localeHost = inject(LocaleHost);
  public readonly lang = this.localeHost.language;
  public readonly userService = inject(UserService);
  private readonly subscriptionService = createSubscriptionService();

  public async onSignIn(lang: string) {
    const url = `/${lang}/login`;

    const navigationExtras: NavigationExtras = {
      queryParams: {redirectInfo: this.router.url, redirectLang: lang},
    };
    await this.router.navigateByUrl('/', {skipLocationChange: true});
    await this.router.navigate([`/${url}`], navigationExtras);
  }

  public async onSignOut(lang: string) {
    await this.subscriptionService.runAsync(this.userService.singOut());
    const url = `/${lang}/login`;//this.router.url;
    const navigationExtras: NavigationExtras = {
      queryParams: {redirectInfo: this.router.url, redirectLang: lang},
    };
    await this.router.navigateByUrl('/', {skipLocationChange: true});
    await this.router.navigate([`/${url}`], navigationExtras);
  }

  //Common
  private readonly subscriptionManager = inject(SubscriptionManager);
  private readonly eventMessageQueue = inject(EventMessageQueue);

  private subscribe<T>(observable: Observable<T>, handler: ((value: T) => void) | undefined = undefined) {
    this.subscriptionManager.createSubscriptionFor(observable, handler, (e) => this.alertError(e));
  }

  private alertError(error: string | Error) {
    this.eventMessageQueue.pushError(error);
  }

  public ngOnDestroy(): void {
    this.subscriptionManager.clearSubscriptions();
  }
}
