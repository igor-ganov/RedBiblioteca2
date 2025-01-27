import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatIconAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {ScrollToDirective} from '../scroll-to.directive';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-anchor',
  templateUrl: './anchor.component.html',
  styleUrl: './anchor.component.css',
  imports: [MatIconAnchor, RouterLink, ScrollToDirective, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorComponent {
  public readonly id = input.required<string>();
}
