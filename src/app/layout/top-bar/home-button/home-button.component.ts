import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocaleHost } from '../../../common/lang-system/LocaleHost';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent {
  private readonly localeHost = inject(LocaleHost);
  public lang$? : Observable<string>;

  ngOnInit(): void {
    setTimeout(() => {
      this.lang$ = this.localeHost.getLanguageAsync();
    })
  }
}
