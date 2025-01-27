import {inject, Injectable} from "@angular/core";
import {Newspaper} from "../models/Newspaper";
import {ContentService} from "@common/help/services/content.service";

@Injectable({providedIn: 'root'})
export class NewspaperRepository {
  private readonly table = 'newspapers'
  private readonly firestore = inject(ContentService);

  public findByPid(pid: string) {
    return this.firestore.findByPid<Newspaper>(this.table, pid);
  }

  public getAll() {
    return this.firestore.getAll<Newspaper>(this.table);
  }

  public get(id: string) {
    return this.firestore.get<Newspaper>(this.table, id);
  }

  public update(newspaper: Newspaper) {
    return this.firestore.update(this.table, newspaper);
  }

  public add(newspaper: Newspaper) {
    return this.firestore.add(this.table, newspaper);
  }

  public delete(id: string) {
    return this.firestore.delete(this.table, id);
  }
}

