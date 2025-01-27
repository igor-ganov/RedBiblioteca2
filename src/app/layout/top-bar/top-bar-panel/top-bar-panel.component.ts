import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {SliderComponent} from '@common/components/slider/slider.component';
import {LanguageButtonComponent} from '@common/lang-system/language-button/language-button.component';
import {SignIoButtonComponent} from '@common/permission-system/sign-io-button/sign-io-button.component';
import {ThemeSwitcherComponent} from '@common/theming/components/theme-switcher.component';

@Component({
  selector: 'app-top-bar-panel',
  templateUrl: './top-bar-panel.component.html',
  styleUrl: './top-bar-panel.component.css',
  imports: [NgTemplateOutlet, MatIconButton, MatIcon, SliderComponent, LanguageButtonComponent, SignIoButtonComponent, ThemeSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarPanelComponent {
  public readonly opened = signal(false);

  public onOpenSlider() {
    this.opened.set(!this.opened());
  }
}
