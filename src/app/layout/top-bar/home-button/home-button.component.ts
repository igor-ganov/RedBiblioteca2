import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocaleHost } from '@common/lang-system/LocaleHost';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-home-button',
    templateUrl: './home-button.component.html',
    styleUrl: './home-button.component.css',
    imports: [MatAnchor, RouterLink, AsyncPipe]
})
export class HomeButtonComponent implements OnInit {
  private readonly localeHost = inject(LocaleHost);
  public lang$? : Observable<string>;

  ngOnInit(): void {
    setTimeout(() => {
      this.lang$ = this.localeHost.getLanguageAsync();
    })
  }
}
