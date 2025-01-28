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
  template: `
<div class="container">
  <div class="buttons">
    <ng-container *ngTemplateOutlet="buttons; context: { $implicit: true }"/>
  </div>
</div>
<div class="container-mobile">
  <div class="menu-vert-container">
    <button mat-icon-button (click)="onOpenSlider()">
      <mat-icon>more_vert</mat-icon>
    </button>
    <app-slider [direction]="'top'" [opened]="opened()">
      <div class="menu">
        <ng-container *ngTemplateOutlet="buttons; context: { $implicit: false }"/>
      </div>
    </app-slider>
  </div>
</div>

<ng-template let-horizontal #buttons>
  <app-language-button [horizontal]="horizontal"/>
  <app-sign-io-button [horizontal]="horizontal"/>
  <app-theme-switcher [horizontal]="horizontal"/>
</ng-template>

`,
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
