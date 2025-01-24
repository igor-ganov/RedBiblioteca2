import {inject, Injectable} from "@angular/core";
import {ContentService} from "@common/help/services/content.service";

@Injectable({providedIn: 'root'})
export class ArticleRepository {

  private readonly table = 'articles'
  private readonly firestore = inject(ContentService);

  public findByPid(pid: string) {
    return this.firestore.findByPid<Article>(this.table, pid);
  }

  public getAll() {
    return this.firestore.getAll<Article>(this.table);
  }

  public get(id: string) {
    return this.firestore.get<Article>(this.table, id);
  }

  public update(value: Article) {
    return this.firestore.update(this.table, value);
  }

  public add(value: Article) {
    return this.firestore.add(this.table, value);
  }

  public delete(id: string) {
    return this.firestore.delete(this.table, id);
  }
}

export interface Article {
  id: string;
  title: string;
  description: string;
  pid: string;
}
