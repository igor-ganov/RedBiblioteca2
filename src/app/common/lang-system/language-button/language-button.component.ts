import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import {TextHost} from '../TextHost';
import {LocaleHost} from '../LocaleHost';
import {RouteService} from '../../routes/RouteService';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-language-button',
  template: `
@if (lang(); as currentLang) {
  <div class="container">
    @if (horizontal()) {
      <button class="panel-button horizontal" mat-stroked-button extended color="basic" [matMenuTriggerFor]="menu">
        <mat-icon>language</mat-icon>
        <span class="main-text">{{ currentLang | uppercase }}</span>
      </button>
    } @else {
      <button class="panel-button vartical" mat-stroked-button extended color="basic" [matMenuTriggerFor]="menu">
        <mat-icon>language</mat-icon>
        <span class="main-text">{{ currentLang | uppercase }}</span>
      </button>
    }
    <mat-menu #menu="matMenu">
      @if (fullPath(); as currentUrl) {
        <div>
          @for (lang of languages; track lang) {
            <div>
              <button color="basic" mat-menu-item (click)="changeLanguage(currentLang, lang, currentUrl)">
                <mat-icon>language</mat-icon>
                <span>{{ lang | uppercase }}</span>
              </button>
            </div>
          }
        </div>
      }
    </mat-menu>
  </div>
}

`,
  styleUrls: ['./language-button.component.css'],
  imports: [MatButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageButtonComponent {
  public readonly horizontal = input(true);
  public readonly languages = TextHost.SupportedLanguages;
  private readonly routeService = inject(RouteService);
  public readonly fullPath = this.routeService.fullPath;
  public readonly lang = this.localeHost.language;

  public changeLanguage(currentLanguage: string, newLanguage: string, url: string) {
    console.log(currentLanguage, newLanguage);
    const newUrl = url.replace(new RegExp(`/${currentLanguage}(/|$)`, "ig"), `/${newLanguage}/`);
    console.log(url, newUrl);
    return this.router.navigateByUrl(newUrl);
  }

  public constructor(
    private readonly localeHost: LocaleHost,
    private readonly router: Router) {
  }
}
