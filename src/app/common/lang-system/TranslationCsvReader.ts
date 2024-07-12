import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, shareReplay } from "rxjs";
import { TextDictionary } from "./TextDictionary";
import { NgxCsvParser } from "ngx-csv-parser";


@Injectable({ providedIn: 'root' })
export class TranslationCsvReader {
    private file$;
    constructor(
        private readonly httpClient: HttpClient,
        private readonly ngxCsvParser: NgxCsvParser,
        ) { 
        // this.sanitizer.bypassSecurityTrustResourceUrl(`assets/img/material/${name}_${color}_${size}dp.svg`));
        this.file$ = this.httpClient.get('assets/locale/translations.csv', { responseType: 'text' }).pipe(
            map(f => this.ngxCsvParser.csvStringToArray(f, ',') as string[][]),
            map(a => this.fillDictionaries(a[0], a.slice(1))),
            shareReplay(1),
        );
    }
    getFile() {
        return this.file$
    }
    fillDictionaries(headers: string[], values: string[][]): Map<string, TextDictionary> {
        const langs = headers.slice(1);
        const langsCount = langs.length;
        const dictionaries = langs.map(() => Object.create({}));
        values.forEach(row => {
            const key = row[0];
            for (let i = 0; i < langsCount; i++) {
                dictionaries[i][key] = row[i + 1] ?? row[1] ?? row[0];
            }
        })
        return new Map(dictionaries.map((d, i) => [langs[i], d as TextDictionary]));
    }
}
