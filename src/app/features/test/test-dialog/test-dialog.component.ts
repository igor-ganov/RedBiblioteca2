import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeSwitcher} from '@common/theming/services/ThemeSwitcher';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  standalone: true,
  styleUrl: './test-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialogComponent {
  public constructor(private readonly themeSwitcher: ThemeSwitcher) {
  }
}
