import { Component, Input } from '@angular/core';
import { MatIconAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ScrollToDirective } from '../scroll-to.directive';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-anchor',
    templateUrl: './anchor.component.html',
    styleUrl: './anchor.component.css',
    imports: [MatIconAnchor, RouterLink, ScrollToDirective, MatIcon]
})
export class AnchorComponent {
  @Input({required: true}) public id!: string;
}
