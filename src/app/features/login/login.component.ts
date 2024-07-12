import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseModule } from '../../modules/firebase.module';
import { Auth, AuthProvider } from '@angular/fire/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { TextHost } from '../../common/lang-system/TextHost';
import {} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { LocaleHost } from '../../common/lang-system/LocaleHost';
import { SubscriptionManager } from '../../common/help/services/SubscriptionManager';
import { EventMessageQueue } from '../../common/help/services/EventMassageQueue';
import { ActivatedRoute, Router } from '@angular/router';
import { ISignInData } from "../../common/permission-system/ISignInData";
import { UserService } from '../../common/permission-system/UserService';
import { LoginText } from './locale/LoginText';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [SubscriptionManager]
})
export class LoginComponent {
  // private readonly userService: inject(UserService),
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly localeHost = inject(LocaleHost);

  public readonly text$ = inject(TextHost).getText<LoginText>(LoginComponent);
  private auth: Auth = inject(Auth);
  public hidePassword = true;
  private _userService = inject(UserService);
  public readonly user : ISignInData = {email: '', password: ''};
  public onLogin(){
    const routParams = this.route.snapshot.queryParamMap;
    let redirectInfo = routParams.get('redirectInfo');
    const redirectLang = routParams.get('redirectLang');
    this.subscribe(this._userService.singIn(this.user), () => {
      if(redirectInfo) {
        const currentLanguage = this.localeHost.getLanguage();
        if(redirectLang && currentLanguage !== redirectLang)
          redirectInfo = redirectInfo.replace(new RegExp(`\/${redirectLang}(\/|$)`, "ig"), `/${currentLanguage}/`);
        this.router.navigateByUrl(redirectInfo);}
      else this.router.navigate(['']);
    });

    // if(redirectInfo) this.router.navigateByUrl(redirectInfo);
    // else this.router.navigate(['']);
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
