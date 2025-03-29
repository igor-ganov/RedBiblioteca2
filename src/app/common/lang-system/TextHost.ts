import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class TextHost {
  public static readonly SupportedLanguages = ['en', 'it', 'ru', 'fr'];
  public static readonly DefaultLanguage = 'en';
}
