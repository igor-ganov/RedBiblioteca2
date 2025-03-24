import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-test-dialog',
  template: `
    <p>test-dialog</p>

  `,
  standalone: true,
  styleUrl: './test-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialogComponent {
}
