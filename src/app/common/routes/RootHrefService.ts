import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class RootHrefService {
  private baseRoot = '/';
  private readonly observable;

  constructor() {
    this.observable = this.baseRootChanged.asObservable();
  }

  setBaseRoot(path: string) {
    this.baseRoot = `/${path}/`;
    this.baseRootChanged.emit(this.baseRoot);
  }

  getBaseRoot() {
    return this.baseRoot;
  }

  public baseRootChanged = new EventEmitter<string>();

  getBaseRootAsync() {
    return this.observable;
  }
}
