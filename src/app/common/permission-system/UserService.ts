import { Injectable, inject } from "@angular/core";
import { User } from "./User";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject, ReplaySubject, from, map, of, skip, switchMap, tap } from "rxjs";
import { ISignInData } from "./ISignInData";
import { UserRoles } from "./UserRoles";
import { UserCredential, UserInfo, user } from "@angular/fire/auth";
import { UserData, UserDataRepository } from "./UserDataRepository";

@Injectable({ providedIn: 'root' })
export class UserService{
    private afAuth = inject(AngularFireAuth);
    private userData = inject(UserDataRepository);
    private userSubscription = this.afAuth.user.pipe(
        switchMap(u => u? this.userData.get(u.uid).pipe(
            map(d => {return {user: u, data: d}})) : of(undefined)
        )).subscribe(u => this.currentUser = toUser(u));
    singIn(signIndata: ISignInData){
        return from(this.afAuth.signInWithEmailAndPassword(signIndata.email, signIndata.password)).pipe(
            map(u => u.user),
            switchMap(u => u? this.userData.get(u.uid).pipe(
                map(d => {return {user: u, data: d}})) : of(undefined)
            ),
            tap(u => this.currentUser = toUser(u)));
    }
    singOut(){
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

@Injectable({ providedIn: 'root' })
export class PermissionService
{
    private readonly userService = inject(UserService); 
    public isPermit(requiredRole: UserRoles){
        return this.userService.currentUser$.pipe(
            map(u => u?.roles ?? UserRoles.GUEST),
            map(r => { return {isPermited: r >= requiredRole}}));
    }
    public blockUntilDeveloping(){
        return this.isPermit(UserRoles.USER);
    }
}

function toUser(u: {user: UserInfo, data: UserData} | undefined): User | undefined {
    if(u === undefined) return undefined;
    return { id: u.user.uid, userName: u.user.email!, description: '', password: '', roles:  u.data.role };
}