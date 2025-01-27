import {Injectable, Type} from "@angular/core";
import {map, switchMap} from "rxjs";
import {LocaleHost} from "./LocaleHost";
import {TextDictionaryServcie} from "./TextDictionaryService";
import {TextDictionary} from "./TextDictionary";
import {ITextFactory, ITitleFactory} from "../menu-system/IHasTitle";
import {HomeComponent} from "app/features/home/home.component";
import {HomeTextFactory} from "app/features/home/locale/HomeText";
import {LoginTextFactory} from "app/features/login/locale/LoginText";
import {LoginComponent} from "app/features/login/login.component";
import {BookComponent} from "@app/features/books/book/book.component";
import {BookTextFactory} from "@app/features/books/book/locale/BookText";
import {BooksComponent} from "@app/features/books/books.component";
import {BooksTextFactory} from "@app/features/books/locale/BooksText";
import {NewBookTextFactory} from "@app/features/books/new-book/locale/NewBookText";
import {IMenuItem} from "@common/menu-system/IMenuItem";
import {bugComponents} from "@common/routes/routes";
import {NewspaperComponent} from "@app/features/newspapers/newspapers/newspaper.component";
import {NewspaperTextFactory} from "@app/features/newspapers/newspapers/locale";
import {NewspapersComponent} from "@app/features/newspapers/newspapers.component";
import {NewspapersTextFactory} from "@app/features/newspapers/locale";
import {NewNewspaperComponent} from "@app/features/newspapers/new-newspaper/new-newspaper.component";
import {NewNewspaperTextFactory} from "@app/features/newspapers/new-newspaper/locale";
import {AboutComponent} from "@app/feature/about/about.component";
import {AboutTextFactory} from "@app/feature/about/locale";
import {AdminPanelComponent} from "@app/features/admin-panel/admin-panel.component";
import {AdminTextFactory} from "@app/features/admin-panel/locale";

export const translationMap = new Map<Type<any>, ITitleFactory | ITextFactory<any>>([
  [LoginComponent, new LoginTextFactory()],
  [HomeComponent, new HomeTextFactory()],
  [BookComponent, new BookTextFactory()],
  [BooksComponent, new BooksTextFactory()],
  [bugComponents.newBook, new NewBookTextFactory()],
  [NewspaperComponent, new NewspaperTextFactory()],
  [NewspapersComponent, new NewspapersTextFactory()],
  [NewNewspaperComponent, new NewNewspaperTextFactory()],
  [AboutComponent, new AboutTextFactory()],
  [AdminPanelComponent, new AdminTextFactory()],
]);

@Injectable({providedIn: 'root'})
export class TextHost {
  public static readonly SupportedLanguages = ['en', 'it', 'ru', 'fr'];
  public static readonly DefaultLanguage = 'en';

  public constructor(private localeHost: LocaleHost, private dictionaryService: TextDictionaryServcie) {
  }


  private requestTextInstance<T>(langLable: string, fuctory: (dictionary: TextDictionary) => T) {
    return this.dictionaryService.getTextDictionary(langLable).pipe(map(d => fuctory(d)));
  }

  private requestMenuInstance(langLable: string, fuctory: (dictionary: TextDictionary) => IMenuItem) {
    return this.dictionaryService.getTextDictionary(langLable).pipe(map(d => fuctory(d)));
  }

  private getTextInstanceAsync<T>(type: Type<any>) {
    const factory = (translationMap.get(type) as ITextFactory<T>)?.getText;
    if (!factory) return;
    return this.localeHost.language$
      .pipe(switchMap(lable => this.requestTextInstance<T>(lable, factory)));
  }

  private getMenuInstanceAsync(type: Type<any>) {
    const factory = (translationMap.get(type) as ITitleFactory)?.getTitle;
    if (!factory) return;
    return this.localeHost.language$
      .pipe(switchMap(lable => this.requestMenuInstance(lable, factory)));
  }

  public getMenuItem(tag: Type<any>) {
    return this.getMenuInstanceAsync(tag);
  }

  public getText<T>(tag: Type<any>) {
    return this.getTextInstanceAsync<T>(tag);
  };
}
