import {inject, Injectable} from '@angular/core';
import {FirestoreService} from '@common/help/services/firestore.service';
import {UserRoles} from './UserRoles';

@Injectable({providedIn: 'root'})
export class UserDataRepository {
  private readonly table = 'users';
  private readonly firestore = inject(FirestoreService);

  public getAll() {
    return this.firestore.getAll<UserData>(this.table);
  }

  public get(id: string) {
    return this.firestore.get<UserData>(this.table, id);
  }

  public update(book: UserData) {
    return this.firestore.update(this.table, book);
  }

  public add(book: UserData) {
    return this.firestore.add(this.table, book);
  }

  public delete(id: string) {
    return this.firestore.delete(this.table, id);
  }
}

export interface UserData {
  id: string;
  role: UserRoles;
  email: UserRoles;
}
