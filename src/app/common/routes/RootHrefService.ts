import {Injectable, signal} from "@angular/core";

@Injectable({providedIn: 'root'})
export class RootHrefService {
  public setBaseRoot(path: string) {
    this._baseRoot.set(`/${path}/`);
  }

  private readonly _baseRoot = signal('/');
  public readonly baseRoot = this._baseRoot.asReadonly();
}
