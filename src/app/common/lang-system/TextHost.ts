import {computed, Injectable, Signal, Type} from "@angular/core";
import {map, Observable} from "rxjs";
import {translationMap} from "@common/lang-system/TranslationMap";
import {PickKeyByType} from "@common/help/types";
import {TextDictionaryService} from "@common/lang-system/TextDictionaryService";
import {getKeys} from "@common/help/help-fuctions";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";

@Injectable({providedIn: 'root'})
export class TextHost {
  public static readonly SupportedLanguages = ['en', 'it', 'ru', 'fr'];
  public static readonly DefaultLanguage = 'en';

  public constructor(private readonly dictionaryService: TextDictionaryService) {
  }


  private getMenuInstanceAsync<TKey extends TKeyOfFactory<ITitleFactory>>(key: TKey): Observable<ReturnType<TFactoryType<TKey>['getTitle']>> {
    const textFactory = getTitleFactory(key);
    const factory = textFactory.getTitle;

    if (factory === undefined) return undefined!;//runtime check

    return this.dictionaryService.textDictionary$.pipe(map(d => factory(d) as ReturnType<TFactoryType<TKey>['getTitle']>));
  }

  private getTextInstanceAsync<TKey extends TKeyOfFactory<ITextFactory>>(key: TKey): Observable<ReturnType<TFactoryType<TKey>['getText']>> {
    const textFactory = getTextFactory(key);
    const factory = textFactory.getText;

    if (factory === undefined) return undefined!;//runtime check

    return this.dictionaryService.textDictionary$.pipe(map(d => factory(d) as ReturnType<TFactoryType<TKey>['getText']>));
  }

  private getTextInstance<TKey extends TKeyOfFactory<ITextFactory>>(key: TKey): Signal<ReturnType<TFactoryType<TKey>['getText']> | undefined> {
    const textFactory = getTextFactory(key);
    const factory = textFactory.getText;

    if (factory === undefined) return undefined!;//runtime check
    const dictionary = this.dictionaryService.textDictionary;
    return computed(() => dictionary() ? factory(dictionary()!) as ReturnType<TFactoryType<TKey>['getText']> : undefined);
  }


  public getMenuItem<K extends TKeyOfFactory<ITitleFactory>>(key: K) {
    return this.getMenuInstanceAsync(key);
  }

  public getMenuItemByType<T>(type: Type<T>) {
    const key = getKeys(translationMap).find(k => 'component' in translationMap[k] && translationMap[k].component === type) as TKeyOfFactory<ITitleFactory>;
    if (key === undefined) return;
    return this.getMenuItem(key);
  }

  public getText<K extends TKeyOfFactory<ITextFactory>>(key: K) {
    return this.getTextInstanceAsync(key);
  }

  public getTextSignal<K extends TKeyOfFactory<ITextFactory>>(key: K) {
    return this.getTextInstance(key);
  }
}

export type TKeyOfFactory<TFactory> = PickKeyByType<TranslationMap, { factory: TFactory }>;
type TFactoryType<TKey extends keyof TranslationMap> = TranslationMap[TKey]['factory'];

function getTextFactory<TKey extends TKeyOfFactory<ITextFactory>>(key: TKey): TFactoryType<TKey> {
  return translationMap[key].factory;
}

function getTitleFactory<TKey extends TKeyOfFactory<ITitleFactory>>(key: TKey): TFactoryType<TKey> {
  return translationMap[key].factory;
}

type TranslationMap = typeof translationMap;
