import {inject, Injectable} from "@angular/core";
import {FirestoreService} from "@common/help/services/firestore.service";

@Injectable({providedIn: 'root'})
export class ContentService {
  private readonly firestore = inject(FirestoreService);

  public findByPid<T>(lang: string, table: string, pid: string) {
    const path = createPath(lang);
    return this.firestore.findByPid<T>(`${path}/${table}`, pid);
  }

  public getAll<T>(lang: string, table: string) {
    const path = createPath(lang);
    return this.firestore.getAll<T>(`${path}/${table}`);
  }

  public get<T>(lang: string, table: string, id: string) {
    const path = createPath(lang);
    return this.firestore.get<T>(`${path}/${table}`, id);
  }

  public update<T extends { id: string; }>(lang: string, table: string, book: T) {
    const path = createPath(lang);
    return this.firestore.update<T>(`${path}/${table}`, book);
  }

  public add<T extends { id: string; }>(lang: string, table: string, book: T) {
    const path = createPath(lang);
    return this.firestore.add<T>(`${path}/${table}`, book);
  }

  public delete<T>(lang: string, table: string, id: string) {
    const path = createPath(lang);
    return this.firestore.delete<T>(`${path}/${table}`, id);
  }
}

function createPath(lang: string) {
  return `content/${lang}`;
}
