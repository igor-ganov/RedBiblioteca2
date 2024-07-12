import { Injectable } from "@angular/core";
import { TranslationCsvReader } from "./TranslationCsvReader";
import { map } from "rxjs";
import { getMapValue } from "../help/help-fuctions";
// import {parse} from 'csv-parse/browser/esm';

@Injectable({providedIn: 'any'})
export class TextDictionaryServcie {
    constructor(private translationCsvReader: TranslationCsvReader){}
    getTextDictionary(lang: string){
        return this.translationCsvReader.getFile().pipe(map(f => f.get(lang) ?? getMapValue(f, 'en')));
    }
}

