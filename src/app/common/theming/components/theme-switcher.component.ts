import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {Theme} from "@common/theming/models/Theme";
import {ThemeSwitcher} from "@common/theming/services/ThemeSwitcher";

@Component({
    selector: 'app-theme-switcher',
    template: `
    <div class="container">
      @if (horizontal()) {
        <button color="basic" mat-mini-fab [matMenuTriggerFor]="themeMenu">
          <mat-icon>{{ themeIcon() }}</mat-icon>
        </button>
      } @else {
        <button class="vertical" color="basic" mat-stroked-button extended [matMenuTriggerFor]="themeMenu">
          <span>Theme</span>
          <mat-icon>{{ themeIcon() }}</mat-icon>
        </button>
      }

      <mat-menu #themeMenu="matMenu">
        <button mat-menu-item (click)="switchTheme('light')">
          <mat-icon>light_mode</mat-icon>
          <span>Light</span>
        </button>
        <button mat-menu-item (click)="switchTheme('dark')">
          <mat-icon>dark_mode</mat-icon>
          <span>Dark</span>
        </button>
        <button mat-menu-item (click)="switchTheme('system')">
          <mat-icon>brightness_4</mat-icon>
          <span>System</span>
        </button>
      </mat-menu>
    </div>
  `,
    styles: `
    .vertical {
      width: 100%;

      & > span {
        white-space: nowrap;
      }
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatMiniFabButton, MatIcon, MatFormFieldModule, MatSelectModule, MatMenuModule, MatButton]
})
export class ThemeSwitcherComponent {
  private readonly themeService = inject(ThemeSwitcher);

  public get selectedTheme() {
    return this.themeService.theme;
  }

  public set selectedTheme(theme) {
    this.themeService.theme = theme;
  }

  public readonly themeIcon = computed(() => getThemeIcon(this.selectedTheme));
  public readonly horizontal = input(true);

  public switchTheme(theme: Theme) {
    this.selectedTheme = theme;
  }
}

function getThemeIcon(theme: Theme) {
  switch (theme) {
    case 'dark':
      return 'dark_mode';
    case 'light':
      return 'light_mode';
    default:
      return 'brightness_4';
  }
}
