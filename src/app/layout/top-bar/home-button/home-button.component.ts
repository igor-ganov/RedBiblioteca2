import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {MatAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css',
  imports: [MatAnchor, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeButtonComponent {
  private readonly localeHost = inject(LocaleHost);
  public readonly lang = this.localeHost.language;
}
