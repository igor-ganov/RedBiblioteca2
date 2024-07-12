import { Component } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ThemeSwitcher } from '../../../common/theming/services/ThemeSwitcher';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrl: './test-dialog.component.css'
})
export class TestDialogComponent {
  constructor(private readonly themeSwitcher: ThemeSwitcher){}
  public onThemeSwitch(){
    this.themeSwitcher.isDark = !this.themeSwitcher.isDark;
  }
}
