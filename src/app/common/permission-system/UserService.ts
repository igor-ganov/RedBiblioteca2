import {inject, Injectable} from "@angular/core";
import {User} from "./User";
import {getAuth, signInWithEmailAndPassword, UserInfo} from "firebase/auth";
import {BehaviorSubject, from, map, of, switchMap, tap} from "rxjs";
import {ISignInData} from "./ISignInData";
import {UserRoles} from "./UserRoles";
import {UserData, UserDataRepository} from "./UserDataRepository";
import {FirebaseAppService} from "@common/help/services/firebase-app.service";

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly afAuth;
  private readonly user$;
  private userSubscription;

  constructor(firebase: FirebaseAppService) {
    const app = firebase.appValue;
    this.afAuth = getAuth(app);


    this.user$ = new BehaviorSubject(this.afAuth.currentUser);
    this.afAuth.onAuthStateChanged(u => this.user$.next(u));

    this.userSubscription = this.user$.pipe(
      switchMap(u => u ? this.userData.get(u.uid).pipe(
        map(d => {
          return {user: u, data: d}
        })) : of(undefined)
      )).subscribe(u => this.currentUser = toUser(u));
  }

  private userData = inject(UserDataRepository);

  singIn(signIndata: ISignInData) {
    return from(signInWithEmailAndPassword(this.afAuth, signIndata.email, signIndata.password)).pipe(
      map(u => u.user),
      switchMap(u => u ? this.userData.get(u.uid).pipe(
        map(d => {
          return {user: u, data: d}
        })) : of(undefined)
      ),
      tap(u => this.currentUser = toUser(u)));
  }

  singOut() {
    return from(this.afAuth.signOut()).pipe(tap(() => this.currentUser = undefined));
  }

  private _currentUser?: User;
  // private readonly _currentUser$ = new ReplaySubject<User | undefined>(1);
  private readonly _currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  public currentUser$ = this._currentUser$.asObservable();

  public get currentUser() {
    return this._currentUser;
  }

  private set currentUser(value) {
    this._currentUser = value;
    this._currentUser$?.next(value);
  }
}

@Injectable({providedIn: 'root'})
export class PermissionService {
  private readonly userService = inject(UserService);

  public isPermit(requiredRole: UserRoles) {
    return this.userService.currentUser$.pipe(
      map(u => u?.roles ?? UserRoles.GUEST),
      map(r => {
        return {isPermited: r >= requiredRole}
      }));
  }

  public blockUntilDeveloping() {
    return this.isPermit(UserRoles.USER);
  }
}

function toUser(u: { user: UserInfo, data: UserData } | undefined): User | undefined {
  if (u === undefined) return undefined;
  return {id: u.user.uid, userName: u.user.email!, description: '', password: '', roles: u.data.role};
}
