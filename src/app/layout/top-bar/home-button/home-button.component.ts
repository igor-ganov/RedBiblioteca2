import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {MatAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-button',
  template: `
<a [routerLink]="['/' + lang() + '/']" color="basic" class="home-button" mat-stroked-button>
  <!-- <h1 class="title"></h1> -->
  <img class="img-title" [src]="'assets/img/logo2.png'" alt="logo">
  <!-- <img [src]="'favicon.ico'"> -->
</a>

`,
  styleUrl: './home-button.component.css',
  imports: [MatAnchor, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeButtonComponent {
  private readonly localeHost = inject(LocaleHost);
  public readonly lang = this.localeHost.language;
}
