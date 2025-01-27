import {inject, Injectable} from "@angular/core";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {map, shareReplay, switchMap, take} from "rxjs";
import {FirestoreService} from "@common/help/services/firestore.service";

@Injectable({providedIn: 'root'})
export class ContentService {
  private readonly firestore = inject(FirestoreService);
  private readonly localeHost = inject(LocaleHost);
  private readonly contentPath = this.localeHost.language$.pipe(map(lang => `content/${lang}`), shareReplay(1));

  public findByPid<T>(table: string, pid: string) {
    return this.contentPath.pipe(switchMap(path => this.firestore.findByPid<T>(`${path}/${table}`, pid)));
  }

  public getAll<T>(table: string) {
    return this.contentPath.pipe(switchMap(path => this.firestore.getAll<T>(`${path}/${table}`)));
  }

  public get<T>(table: string, id: string) {
    return this.contentPath.pipe(switchMap(path => this.firestore.get<T>(`${path}/${table}`, id)));
  }

  public update<T extends { id: string; }>(table: string, book: T) {
    return this.contentPath.pipe(take(1), switchMap(path => this.firestore.update<T>(`${path}/${table}`, book)));
  }

  public add<T extends { id: string; }>(table: string, book: T) {
    return this.contentPath.pipe(take(1), switchMap(path => this.firestore.add<T>(`${path}/${table}`, book)));
  }

  public delete<T>(table: string, id: string) {
    return this.contentPath.pipe(take(1), switchMap(path => this.firestore.delete<T>(`${path}/${table}`, id)));
  }
}
