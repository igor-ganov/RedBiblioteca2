import {inject, Injectable} from "@angular/core";
import {Newspaper} from "../models/Newspaper";
import {ContentService} from "@common/help/services/content.service";

@Injectable({providedIn: 'root'})
export class NewspaperRepository {
  private readonly table = 'newspapers'
  private readonly firestore = inject(ContentService);

  public findByPid(lang: string, pid: string) {
    return this.firestore.findByPid<Newspaper>(lang, this.table, pid);
  }

  public getAll(lang: string) {
    return this.firestore.getAll<Newspaper>(lang, this.table);
  }

  public get(lang: string, id: string) {
    return this.firestore.get<Newspaper>(lang, this.table, id);
  }

  public update(lang: string, newspaper: Newspaper) {
    return this.firestore.update(lang, this.table, newspaper);
  }

  public add(lang: string, newspaper: Newspaper) {
    return this.firestore.add(lang, this.table, newspaper);
  }

  public delete(lang: string, id: string) {
    return this.firestore.delete(lang, this.table, id);
  }
}

