import {inject, Injectable} from "@angular/core";
import {ContentService} from "@common/help/services/content.service";

@Injectable({providedIn: 'root'})
export class ArticleRepository {

  private readonly table = 'articles'
  private readonly firestore = inject(ContentService);

  public findByPid(lang: string, pid: string) {
    return this.firestore.findByPid<Article>(lang, this.table, pid);
  }

  public getAll(lang: string) {
    return this.firestore.getAll<Article>(lang, this.table);
  }

  public get(lang: string, id: string) {
    return this.firestore.get<Article>(lang, this.table, id);
  }

  public update(lang: string, value: Article) {
    return this.firestore.update(lang, this.table, value);
  }

  public add(lang: string, value: Article) {
    return this.firestore.add(lang, this.table, value);
  }

  public delete(lang: string, id: string) {
    return this.firestore.delete(lang, this.table, id);
  }
}

export interface Article {
  id: string;
  title: string;
  description: string;
  pid: string;
}
