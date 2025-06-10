import {computed, inject, Injectable, linkedSignal, PLATFORM_ID, resource} from "@angular/core";
import {User} from "./User";
import {getAuth, signInWithEmailAndPassword, UserInfo} from "firebase/auth";
import {filter, map} from "rxjs";
import {ISignInData} from "./ISignInData";
import {UserRoles} from "./UserRoles";
import {UserData, UserDataRepository} from "./UserDataRepository";
import {FirebaseAppService} from "@common/help/services/firebase-app.service";
import {toObservable} from "@angular/core/rxjs-interop";
import {isPlatformBrowser} from "@angular/common";
import {EventMessageQueue} from "@common/event-message-queue/EventMassageQueue";

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly firebase = inject(FirebaseAppService);
  private readonly afAuth = getAuth(this.firebase.appValue);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly firebaseUserResource = resource({
    loader: async () => {
      await this.afAuth.authStateReady();

      return isPlatformBrowser(this.platformId) ? this.afAuth.currentUser : undefined;
    }
  })
  private readonly firebaseUser = linkedSignal(() => this.firebaseUserResource.value());
  private userData = inject(UserDataRepository);
  private readonly eventMessageQueue = inject(EventMessageQueue);
  private readonly currentUserResource = resource({
    params: () => ({user: this.firebaseUser()}),
    loader: async ({params: {user}}) => {
      // console.log(user);
      if (user === null) return null;
      if (user === undefined) return undefined;
      const d = await this.userData.get(user.uid);
      if (d.successeful) {
        return toUser({user: user, data: d.result});
      } else {
        this.eventMessageQueue.pushError(d.errorMessage);
        return null;
      }
    }
  })
  public readonly currentUser = computed(() => this.currentUserResource.value());
  public readonly isLoading = computed(() => this.firebaseUserResource.isLoading() || this.currentUserResource.isLoading());


  public async singIn(signInData: ISignInData) {
    await signInWithEmailAndPassword(this.afAuth, signInData.email, signInData.password);
    this.firebaseUser.set(this.afAuth.currentUser);
  }

  public async singOut() {
    await this.afAuth.signOut();
    this.firebaseUser.set(null);
  }

  public readonly currentUser$ = toObservable(this.currentUser);
}

@Injectable({providedIn: 'root'})
export class PermissionService {
  private readonly userService = inject(UserService);

  public readonly isLoading = computed(() => this.userService.isLoading());

  public isPermit(requiredRole: UserRoles) {
    return this.userService.currentUser$.pipe(
      filter(u => u !== undefined),
      map(u => u?.roles ?? UserRoles.GUEST),
      map(r => r >= requiredRole),
      map(r => ({isPermited: r})),
    );
  }

  public blockUntilDeveloping() {
    return this.isPermit(UserRoles.USER);
  }
}

function toUser(u: { user: UserInfo, data: UserData }): User {
  return {id: u.user.uid, userName: u.user.email!, description: '', password: '', roles: u.data.role};
}
