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
  templateUrl: './language-button.component.html',
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
