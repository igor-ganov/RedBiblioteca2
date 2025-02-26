import {inject, Injectable} from "@angular/core";
import {ContentService} from "@common/help/services/content.service";

@Injectable({providedIn: 'root'})
export class SingleContentService<T> {

  private readonly table = 'content';
  private readonly firestore = inject(ContentService);

  public getAll(lang: string) {
    return this.firestore.getAll<T>(lang, this.table);
  }

  public get(lang: string, id: string) {
    return this.firestore.get<T>(lang, this.table, id);
  }

  public update(lang: string, value: T, contentName: string) {
    return this.firestore.update(lang, this.table, {...value, id: contentName});
  }

  public add(lang: string, value: T, contentName: string) {
    return this.firestore.add(lang, this.table, {...value, id: contentName});
  }

  public delete(lang: string, id: string) {
    return this.firestore.delete(lang, this.table, id);
  }
}
