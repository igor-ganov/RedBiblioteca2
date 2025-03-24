import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {TextHost} from '@common/lang-system/TextHost';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {ActivatedRoute, Router} from '@angular/router';
import {ISignInData} from "@common/permission-system/ISignInData";
import {UserService} from '@common/permission-system/UserService';
import {LoginText} from './locale/LoginText';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {createSubscriptionService} from "@common/help/services/subscription.service";

@Component({
  selector: 'app-login',
  template: `
    @if (text$ | async; as text) {
      <div class="container">
        <form #loginForm="ngForm" class="form">
          <mat-form-field>
            <mat-label>{{ text.email }}</mat-label>
            <input type="text" matInput [(ngModel)]="user.email" autocomplete="username" name="email" required/>
          </mat-form-field>
          <mat-form-field>
            <mat-label>{{ text.password }}</mat-label>
            <input [type]="hidePassword() ? 'password' : 'text'" matInput [(ngModel)]="user.password"
                   autocomplete="current-password" name="passwrod" required/>
            <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())"
                    [attr.aria-pressed]="hidePassword()">
              <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>
          <button [disabled]="!loginForm.form.valid" color="primary" mat-raised-button
                  (click)="onLogin()">{{ text.signIn }}
          </button>
        </form>
      </div>
    }

  `,
  styles: `
    .container {
      height: 100%;
      display: grid;
      justify-content: center;
      align-items: center;
    }

    .form {
      display: grid;
      grid-auto-flow: row;
      grid-template-rows: max-content;
    }`,
  imports: [FormsModule, MatFormField, MatLabel, MatInput, MatIconButton, MatSuffix, MatIcon, MatButton, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  // private readonly userService: inject(UserService),
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly localeHost = inject(LocaleHost);

  public readonly text$: Observable<LoginText> = inject(TextHost).getText('login');
  public readonly hidePassword = signal(true);
  private readonly _userService = inject(UserService);
  public readonly user: ISignInData = {email: '', password: ''};

  private readonly subscriptionService = createSubscriptionService();

  public async onLogin() {
    const routParams = this.route.snapshot.queryParamMap;
    let redirectInfo = routParams.get('redirectInfo');
    const redirectLang = routParams.get('redirectLang');
    await this.subscriptionService.runAsync(this._userService.singIn(this.user));
    if (redirectInfo) {
      const currentLanguage = this.localeHost.language;
      if (redirectLang && currentLanguage() !== redirectLang)
        redirectInfo = redirectInfo.replace(new RegExp(`/${redirectLang}(/|$)`, "ig"), `/${currentLanguage}/`);
      return this.router.navigateByUrl(redirectInfo);
    } else return this.router.navigate(['']);

    // if(redirectInfo) this.router.navigateByUrl(redirectInfo);
    // else this.router.navigate(['']);
  }
}
