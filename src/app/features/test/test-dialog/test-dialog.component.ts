import {Component} from '@angular/core';
import {ThemeSwitcher} from '@common/theming/services/ThemeSwitcher';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  standalone: true,
  styleUrl: './test-dialog.component.css'
})
export class TestDialogComponent {
  constructor(private readonly themeSwitcher: ThemeSwitcher) {
  }

  public onThemeSwitch() {
    this.themeSwitcher.isDark = !this.themeSwitcher.isDark;
  }
}
