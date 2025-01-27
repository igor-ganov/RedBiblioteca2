import { Component, OnInit, input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TextHost } from '../TextHost';
import { LocaleHost } from '../LocaleHost';
import { RouteService } from '../../routes/RouteService';
import { MatButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-language-button',
    templateUrl: './language-button.component.html',
    styleUrls: ['./language-button.component.css'],
    imports: [MatButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, AsyncPipe, UpperCasePipe]
})
export class LanguageButtonComponent implements OnInit {
  public readonly horizontal = input(true);
  languages = TextHost.SupportedLanguages;
  newLanguage? : string;
  fullPath: Observable<string>;
  lang?: Observable<string>;
  changeLanguage(currentLanguage: string, newLanguage: string, url: string) {
    const newUrl = url.replace(new RegExp(`\/${currentLanguage}(\/|$)`, "ig"), `/${newLanguage}/`);
    this.router.navigateByUrl(newUrl);
  }
  constructor(
    public localeHost: LocaleHost,
    private router: Router,
    routeService: RouteService){
    this.fullPath = routeService.getFullPath();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.lang = this.localeHost.getLanguageAsync();
    });
  }
}
