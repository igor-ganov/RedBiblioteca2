import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-anchor',
    templateUrl: './anchor.component.html',
    styleUrl: './anchor.component.css',
    standalone: false
})
export class AnchorComponent {
  @Input({required: true}) public id!: string;
}
