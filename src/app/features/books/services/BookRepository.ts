import {inject, Injectable} from "@angular/core";
import {Book} from "../models/Book";
import {ContentService} from "@common/help/services/content.service";

@Injectable({providedIn: 'root'})
export class BookRepository {

  private readonly table = 'books'
  private readonly firestore = inject(ContentService);

  public findByPid(lang: string, pid: string) {
    return this.firestore.findByPid<Book>(lang, this.table, pid);
  }

  public getAll(lang: string) {
    return this.firestore.getAll<Book>(lang, this.table);
  }

  public get(lang: string, id: string) {
    return this.firestore.get<Book>(lang, this.table, id);
  }

  public update(lang: string, book: Book) {
    return this.firestore.update(lang, this.table, book);
  }

  public add(lang: string, book: Book) {
    return this.firestore.add(lang, this.table, book);
  }

  public delete(lang: string, id: string) {
    return this.firestore.delete(lang, this.table, id);
  }
}

