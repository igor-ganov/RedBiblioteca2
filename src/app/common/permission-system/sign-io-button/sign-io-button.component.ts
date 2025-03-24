import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {LocaleHost} from '../../lang-system/LocaleHost';
import {UserService} from '../UserService';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {createSubscriptionService} from "@common/help/services/subscription.service";

@Component({
  selector: 'app-sign-io-button',
  template: `
    @if (lang(); as lang) {
      @if (horizontal()) {
        @if (userService.currentUser() === undefined) {
          <button color="basic" class="theme-button icon-button"
                  (click)="onSignIn(lang)" mat-icon-button>
            <mat-icon>login</mat-icon>
          </button>
        } @else {
          <button color="basic" class="theme-button icon-button" (click)="onSignOut(lang)" mat-icon-button>
            <mat-icon>logout</mat-icon>
          </button>
        }
      } @else {
        @if (userService.currentUser() === undefined) {
          <button color="basic" class="theme-button vertical"
                  (click)="onSignIn(lang)" mat-stroked-button extended>
            <span>Log In</span>
            <mat-icon>login</mat-icon>
          </button>
        } @else {
          <button color="basic" class="theme-button vertical" (click)="onSignOut(lang)" mat-stroked-button extended>
            <span>Log Out</span>
            <mat-icon>logout</mat-icon>
          </button>
        }
      }
    }

  `,
  styleUrl: './sign-io-button.component.css',
  imports: [MatIconButton, MatIcon, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignIoButtonComponent {
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
}
