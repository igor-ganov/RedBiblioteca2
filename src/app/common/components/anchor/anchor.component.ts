import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatIconAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {ScrollToDirective} from '../scroll-to.directive';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-anchor',
  template: `
<a mat-icon-button [routerLink]='"."' [fragment]="id()" [attr.id]="id()" [scrollTo]="id()">
    <mat-icon>link</mat-icon>
</a>
`,
  styleUrl: './anchor.component.css',
  imports: [MatIconAnchor, RouterLink, ScrollToDirective, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorComponent {
  public readonly id = input.required<string>();
}
