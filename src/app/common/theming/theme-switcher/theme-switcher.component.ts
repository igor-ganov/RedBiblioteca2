import { Component, Input, inject } from '@angular/core';
import { ThemeSwitcher } from '../services/ThemeSwitcher';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css'
})
export class ThemeSwitcherComponent {
  @Input() public horizontal = true;
  private readonly themeSwitcher = inject(ThemeSwitcher);
  public onClick(){
    this.themeSwitcher.isDark = !this.themeSwitcher.isDark;
  }
}
