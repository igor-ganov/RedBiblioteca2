import { Component, Input } from '@angular/core';
import { Observable, last, map, merge, tap, zip } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TextHost } from '../TextHost';
import { LocaleHost } from '../LocaleHost';
import { RouteService } from '../../routes/RouteService';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

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
