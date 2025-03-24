import {Injectable} from "@angular/core";
import {FirebaseApp, initializeApp} from "firebase/app";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class FirebaseAppService {
  public readonly appValue: FirebaseApp;

  public constructor() {
    this.appValue = initializeApp(environment.firebase);
  }
}
