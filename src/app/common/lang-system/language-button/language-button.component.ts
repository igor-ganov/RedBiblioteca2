import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TextHost } from '../TextHost';
import { LocaleHost } from '../LocaleHost';
import { RouteService } from '../../routes/RouteService';

@Component({
  selector: 'app-language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.css'],
})
export class LanguageButtonComponent {
  @Input() public horizontal = true;
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
