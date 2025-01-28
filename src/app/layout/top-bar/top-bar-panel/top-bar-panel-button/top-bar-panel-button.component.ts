import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-top-bar-panel-button',
  template: `
@if (horizontal) {
  <button color="basic" class="container horizontal" (click)="onClick($event)" mat-icon-button>
    <mat-icon>{{icon}}</mat-icon>
    <span class="main-text">{{text}}</span>
  </button>
} @else {
  <button color="basic" class="container vertical icon-button" (click)="onClick($event)" mat-stroked-button extended>
    <mat-icon>{{icon}}</mat-icon>
    <span class="main-text">{{text}}</span>
  </button>
}
<ng-template #vertical>
  <button color="basic" class="container vertical icon-button" (click)="onClick($event)" mat-stroked-button extended>
    <mat-icon>{{icon}}</mat-icon>
    <span class="main-text">{{text}}</span>
  </button>
</ng-template>
`,
  styleUrl: './top-bar-panel-button.component.css',
  imports: [MatIconButton, MatIcon, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarPanelButtonComponent {

  @Input() public horizontal = true;
  @Input({required: true}) public icon = '';
  @Input({required: true}) public text = '';
  @Output() public buttonClick = new EventEmitter<MouseEvent>();

  public onClick(event: MouseEvent) {
    this.buttonClick.emit(event);
  }

}
