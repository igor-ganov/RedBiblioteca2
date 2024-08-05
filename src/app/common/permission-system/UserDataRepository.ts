import { Injectable, inject } from '@angular/core';
import { FirestoreService } from '@common/help/services/firestore.service';
import { UserRoles } from './UserRoles';

@Injectable({ providedIn: 'root' })
export class UserDataRepository {
  private readonly table = 'users';
  private readonly firestore = inject(FirestoreService);
  getAll() {
    return this.firestore.getAll<UserData>(this.table);
  }
  get(id: string) {
    return this.firestore.get<UserData>(this.table, id);
  }
  update(book: UserData) {
    return this.firestore.update(this.table, book);
  }
  add(book: UserData) {
    return this.firestore.add(this.table, book);
  }
  delete(id: string) {
    return this.firestore.delete(this.table, id);
  }
}

export interface UserData{
  id: string;
  role: UserRoles;
  email: UserRoles;
}
